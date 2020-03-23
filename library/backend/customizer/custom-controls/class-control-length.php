<?php
/**
 * Length Control.
 *
 * @package greenlet\library\admin\customizer
 */

namespace Greenlet;

if ( ! class_exists( 'Control_Length' ) && class_exists( 'WP_Customize_Control' ) ) {
	/**
	 * Length custom control.
	 *
	 * @since  1.1.0
	 * @access public
	 */
	class Control_Length extends \WP_Customize_Control {

		/**
		 * The type of customize control being rendered.
		 *
		 * @since  1.1.0
		 * @access public
		 * @var    string
		 */
		public $type = 'length';

		/**
		 * Enqueue scripts/styles.
		 *
		 * @since  1.1.0
		 * @access public
		 * @return void
		 */
		public function enqueue() {
			$min = ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ) ? '' : '.min';
			wp_enqueue_script( 'greenlet-controls', LIBRARY_URL . '/backend/assets/js/greenlet-controls' . $min . '.js', array( 'jquery', 'react-dom' ), GREENLET_VERSION, true );
			wp_enqueue_style( 'greenlet-controls', LIBRARY_URL . '/backend/assets/css/greenlet-controls.css', array(), GREENLET_VERSION );
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

			$this->json['link'] = $this->get_link();

			// Setting ID.
			$this->json['id'] = $this->id;

			// Control Type.
			$this->json['type'] = $this->type;
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

			<div class="gl-length gl-row">
				<div class="col-7 range-wrap">
					<input id="length-size-{{ data.id }}" type="range" step="0.1" min="0" max="2000" />
				</div>
				<div class="col-3">
					<input id="length-size-ip-{{ data.id }}" type="number" step="0.1" min="0" max="4000" />
				</div>
				<select id="length-unit-{{ data.id }}" class="col-2 length-unit">
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
				<span class="reset dashicons dashicons-undo"></span>
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
