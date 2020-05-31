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
			wp_enqueue_script( 'wp-color-picker' );
			wp_enqueue_script( 'codemirror-format', COLORWINGS_URL . '/js/formatting' . $min . '.js', array( 'wp-codemirror' ), COLORWINGS_VERSION, true );
			wp_enqueue_script( 'color-wings-controls', COLORWINGS_URL . '/js/color-wings' . $min . '.js', array( 'jquery', 'react-dom' ), COLORWINGS_VERSION, true );
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
