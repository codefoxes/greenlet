<?php
/**
 * Color Wings Control.
 *
 * @package ColorWings
 */

namespace ColorWings;

if ( ! class_exists( 'ColorWings\Control_ColorWings' ) && class_exists( 'WP_Customize_Control' ) ) {
	/**
	 * Color Wings custom control.
	 *
	 * @since  1.0.0
	 * @access public
	 */
	class Control_ColorWings extends \WP_Customize_Control {

		/**
		 * The type of customize control being rendered.
		 *
		 * @since  1.0.0
		 * @access public
		 * @var    string
		 */
		public $type = 'color-wings';

		/**
		 * Enqueue scripts/styles.
		 *
		 * @since  1.0.0
		 * @access public
		 * @return void
		 */
		public function enqueue() {
			$min = ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ) ? '' : '.min';
			wp_enqueue_style( 'wp-color-picker' );
			wp_enqueue_script( 'color-picker-alpha', COLORWINGS_URL . '/js/wp-color-picker-alpha.min' . $min . '.js', array( 'jquery', 'wp-color-picker' ), COLORWINGS_VERSION, true );
			wp_enqueue_script( 'codemirror-format', COLORWINGS_URL . '/js/formatting' . $min . '.js', array( 'wp-codemirror' ), COLORWINGS_VERSION, true );
			wp_enqueue_script( 'color-wings-controls', COLORWINGS_URL . '/js/color-wings' . $min . '.js', array( 'jquery', 'react-dom', 'wp-media-utils', 'codemirror-format', 'color-picker-alpha' ), COLORWINGS_VERSION, true );

			$color_wings_control = array(
				'fonts' => array(
					'allFonts' => $this->get_all_fonts(),
					'defaults' => $this->get_font_defaults(),
				),
				'theme' => get_stylesheet(),
			);
			wp_localize_script( 'color-wings-controls', 'cwControlObject', $color_wings_control );
		}

		/**
		 * Refresh the parameters passed to the JavaScript via JSON.
		 *
		 * @since  1.0.0
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
		}

		/**
		 * Get font default fallbacks and variants.
		 *
		 * @since  1.1.0
		 * @return array Font defaults.
		 */
		public function get_font_defaults() {
			return array(
				'fallback' => array(
					'default'     => array( '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji' ),
					'sans-serif'  => array( 'Helvetica', 'Verdana', 'Arial', 'sans-serif' ),
					'serif'       => array( 'Times', 'Georgia', 'serif' ),
					'monospace'   => array( 'Courier', 'monospace' ),
					'display'     => array( 'Helvetica', 'Verdana', 'Arial', 'sans-serif' ),
					'handwriting' => array( 'Comic Sans MS', 'cursive', 'sans-serif' ),
				),
				'variants' => array(
					'normal' => array( '100', '200', '300', '400', '500', '600', '700', '800', '900' ),
					'italic' => array( '100', '200', '300', '400', '500', '600', '700', '800', '900' ),
				),
			);
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
			ob_start();
			include COLORWINGS_DIR . '/fonts/google-fonts.json';
			$font_content = ob_get_contents();
			ob_end_clean();
			return json_decode( $font_content, true );
		}

		/**
		 * Displays the control content.
		 *
		 * @since  1.0.0
		 * @access public
		 * @return void
		 */
		protected function content_template() {
			?>
			<div id="color-wings"></div>
			<?php
		}

		/**
		 * Render Content.
		 *
		 * @since 1.0.0
		 */
		protected function render_content() {}
	}
}
