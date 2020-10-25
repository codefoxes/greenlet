<?php
/**
 * Border Control.
 *
 * @package greenlet\library\admin\customizer
 */

namespace Greenlet;

if ( ! class_exists( 'Control_Border' ) && class_exists( 'WP_Customize_Control' ) ) {
	/**
	 * Border custom control.
	 *
	 * @since  1.1.0
	 * @access public
	 */
	class Control_Border extends \WP_Customize_Control {

		/**
		 * The type of customize control being rendered.
		 *
		 * @since  1.1.0
		 * @access public
		 * @var    string
		 */
		public $type = 'border';

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

			<div class="gl-border">
				<div class="width-wrap">
					<input id="border-width-{{ data.id }}" type="range" />
				</div>
				<select id="border-style-{{ data.id }}"></select>
				<input id="border-color-{{ data.id }}" class="color-picker" type="text" data-alpha="true" />
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
