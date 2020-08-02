<?php
/**
 * Color Wings Link Control.
 *
 * @package ColorWings
 */

namespace ColorWings;

if ( ! class_exists( 'ColorWings\Control_Link' ) && class_exists( 'WP_Customize_Control' ) ) {
	/**
	 * Color Wings Link custom control.
	 *
	 * @since  1.0.0
	 * @access public
	 */
	class Control_Link extends \WP_Customize_Control {

		/**
		 * The type of customize control being rendered.
		 *
		 * @since  1.0.0
		 * @access public
		 * @var    string
		 */
		public $type = 'cw-link';

		/**
		 * Allow options parameter.
		 *
		 * @since  1.0.0
		 * @access public
		 * @var    array
		 */
		public $options = array();

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

			$this->json['options'] = $this->options;
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
			<div class="cw-link-wrap">
				<# if ( data.label ) { #><div class="cw-link">{{{ data.label }}}</div><# } #>
				<div class="cw-link-text">Link</div>
			</div>
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
