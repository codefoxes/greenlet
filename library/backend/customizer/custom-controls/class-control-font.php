<?php
/**
 * Font Control.
 *
 * @package greenlet\library\admin\customizer
 */

namespace Greenlet;

if ( ! class_exists( 'Control_Font' ) && class_exists( 'WP_Customize_Control' ) ) {
	/**
	 * Font custom control.
	 *
	 * @since  1.1.0
	 * @access public
	 */
	class Control_Font extends \WP_Customize_Control {

		/**
		 * The type of customize control being rendered.
		 *
		 * @since  1.1.0
		 * @access public
		 * @var    string
		 */
		public $type = 'font';

		/**
		 * Allow choices parameter.
		 *
		 * @since  1.1.0
		 * @access public
		 * @var    array
		 */
		public $choices = array();

		/**
		 * Control_Font constructor.
		 * Add default array to default if keys do not exist.
		 *
		 * @since 1.1.0
		 * @param \WP_Customize_Manager $manager Customizer bootstrap instance.
		 * @param string                $id      Control ID.
		 * @param array                 $args    As per parent.
		 */
		public function __construct( $manager, $id, $args = array() ) {
			parent::__construct( $manager, $id, $args );

			$default = array(
				'family' => 'Default',
				'size'   => '1.6rem',
				'style'  => 'normal',
				'weight' => '400',
			);

			if ( property_exists( $this->setting, 'default' ) ) {
				$this->setting->default = array_replace_recursive( $default, (array) $this->setting->default );
			}
		}

		/**
		 * Enqueue scripts/styles.
		 *
		 * @since  1.1.0
		 * @access public
		 * @return void
		 */
		public function enqueue() {
			$min = ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ) ? '' : '.min';
			wp_enqueue_script( 'choices', GREENLET_LIBRARY_URL . '/backend/assets/js/choices.min.js', array( 'jquery' ), GREENLET_VERSION, true );
			wp_enqueue_style( 'choices', GREENLET_LIBRARY_URL . '/backend/assets/css/choices.css', array(), GREENLET_VERSION );
			wp_enqueue_script( 'greenlet-controls', GREENLET_LIBRARY_URL . '/backend/assets/js/greenlet-controls' . $min . '.js', array( 'choices' ), GREENLET_VERSION, true );
			wp_enqueue_style( 'greenlet-controls', GREENLET_LIBRARY_URL . '/backend/assets/css/greenlet-controls.css', array(), GREENLET_VERSION );
			wp_localize_script( 'greenlet-controls', 'greenletAllFonts', $this->get_all_fonts() );

			$color_wings_fonts = array(
				'allFonts' => $this->get_all_fonts(),
				'defaults' => greenlet_font_defaults(),
			);
			wp_localize_script( 'greenlet-controls', 'colorWingsFonts', $color_wings_fonts );
		}

		/**
		 * Refresh the parameters passed to the JavaScript via JSON.
		 *
		 * @since  1.1.0
		 * @see WP_Customize_Control::to_json()
		 */
		public function to_json() {
			// Get the basics from the parent class.
			parent::to_json();

			// Default value.
			$this->json['default'] = $this->setting->default;
			if ( isset( $this->default ) ) {
				$this->json['default'] = $this->default;
			}

			// Value.
			$this->json['value'] = $this->value();

			// Setting ID.
			$this->json['id'] = $this->id;

			// Control Type.
			$this->json['type'] = $this->type;

			// Choices.
			$this->json['choices'] = $this->choices;

			$this->json['fontDefaults'] = greenlet_font_defaults();
		}

		/**
		 * Get all fonts.
		 *
		 * @since  1.1.0
		 * @return array All fonts.
		 */
		public function get_all_fonts() {
			return array(
				'system' => array(
					'Default'   => array( 'category' => 'default' ),
					'Helvetica' => array( 'category' => 'sans-serif' ),
					'Verdana'   => array( 'category' => 'sans-serif' ),
					'Arial'     => array( 'category' => 'sans-serif' ),
					'Times'     => array( 'category' => 'serif' ),
					'Georgia'   => array( 'category' => 'serif' ),
					'Courier'   => array( 'category' => 'monospace' ),
				),
				'google' => $this->get_google_fonts(),
			);
		}

		/**
		 * Get Google Fonts.
		 *
		 * @since  1.1.0
		 * @return array Google fonts array.
		 */
		public function get_google_fonts() {
			$fonts_file   = GREENLET_LIBRARY_DIR . '/backend/assets/fonts/google-fonts.json';
			$font_content = greenlet_get_file_contents( $fonts_file );
			return json_decode( $font_content, true );
		}

		/**
		 * Displays the control content.
		 *
		 * @since  1.1.0
		 * @access public
		 * @return void
		 */
		protected function content_template() {
			?>
			<# if ( data.label ) { #><span class="customize-control-title">{{{ data.label }}}</span><# } #>
			<# if ( data.description ) { #><span class="description customize-control-description">{{{ data.description }}}</span><# } #>

			<div class="gl-font">
				<select id="font-family-{{ data.id }}" class="selectize"></select>
				<div class="gl-row">
					<select id="font-style-{{ data.id }}" class="col-6"></select>
					<select id="font-weight-{{ data.id }}" class="col-6"></select>
				</div>
				<div class="size-wrap gl-row">
					<div class="col-7 range-wrap">
						<input id="font-size-{{ data.id }}" type="range" step="0.01" min="0" max="100" />
					</div>
					<div class="col-3">
						<input id="font-size-ip-{{ data.id }}" type="number" step="0.01" min="0" max="100" />
					</div>
					<select id="font-size-unit-{{ data.id }}" class="col-2 font-unit">
						<option value="px">px</option>
						<option value="pt">pt</option>
						<option value="pc">pc</option>
						<option value="cm">cm</option>
						<option value="mm">mm</option>
						<option value="in">in</option>
						<option value="rem">rem</option>
						<option value="em">em</option>
						<option value="ex">ex</option>
						<option value="ch">ch</option>
						<option value="vh">vh</option>
						<option value="vw">vw</option>
						<option value="%">%</option>
					</select>
				</div>
			</div>
			<?php
		}

		/**
		 * Render Content.
		 *
		 * @since 1.1.0
		 */
		protected function render_content() {}
	}
}
