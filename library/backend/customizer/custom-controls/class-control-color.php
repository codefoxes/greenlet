<?php
/**
 * Greenlet Color Control.
 *
 * @package greenlet\library\admin\customizer
 */

namespace Greenlet;

if ( ! class_exists( 'Control_Color' ) && class_exists( 'WP_Customize_Control' ) ) {
	/**
	 * Color custom control.
	 *
	 * @since  1.1.0
	 * @access public
	 */
	class Control_Color extends \WP_Customize_Control {

		/**
		 * The type of customize control being rendered.
		 *
		 * @since  1.1.0
		 * @access public
		 * @var    string
		 */
		public $type = 'gl-color';

		/**
		 * Allow palettes parameter.
		 *
		 * @since  1.1.0
		 * @access public
		 * @var    array
		 */
		public $palettes = array();

		/**
		 * Enqueue scripts/styles.
		 *
		 * @since  1.1.0
		 * @access public
		 * @return void
		 */
		public function enqueue() {
			$min = ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ) ? '' : '.min';
			wp_enqueue_script( 'color-picker-alpha', GREENLET_LIBRARY_URL . '/backend/assets/js/wp-color-picker-alpha' . $min . '.js', array( 'jquery', 'wp-color-picker' ), GREENLET_VERSION, true );
			greenlet_add_script_dependencies( 'greenlet-controls', array( 'color-picker-alpha' ) );
			wp_enqueue_style( 'wp-color-picker' );
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

			// Choices.
			$this->json['palettes'] = $this->palettes;
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

			<div class="gl-color">
				<input class="color-picker" name="{{ data.id }}" type="text" data-alpha="true" value="{{ data.value }}" />
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
