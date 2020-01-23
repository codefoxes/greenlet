<?php
/**
 * Divider Control.
 *
 * @package greenlet\library\admin\customizer
 */

namespace Greenlet;

if ( ! class_exists( 'Control_Divider' ) && class_exists( 'WP_Customize_Control' ) ) {
	/**
	 * Customizer divider custom control.
	 *
	 * @since  1.0.0
	 * @access public
	 */
	class Control_Divider extends \WP_Customize_Control {

		/**
		 * The type of customize control being rendered.
		 *
		 * @since  1.0.0
		 * @access public
		 * @var    string
		 */
		public $type = 'divider';

		/**
		 * Refresh the parameters passed to the JavaScript via JSON.
		 *
		 * @since  1.0.0
		 * @see WP_Customize_Control::to_json()
		 */
		public function to_json() {
			parent::to_json();
			$this->json['label']       = esc_html( $this->label );
			$this->json['description'] = $this->description;
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

			<div class="greenlet-divider"></div>

			<label class="customizer-text">
				<# if ( data.label ) { #>
				<span class="customize-control-title">{{{ data.label }}}</span>
				<# } #>
				<# if ( data.description ) { #>
				<span class="description customize-control-description">{{{ data.description }}}</span>
				<# } #>
			</label>
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
