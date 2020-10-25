<?php
/**
 * Radio Image Control.
 *
 * @package greenlet\library\admin\customizer
 */

namespace Greenlet;

if ( ! class_exists( 'Control_Radio_Image' ) && class_exists( 'WP_Customize_Control' ) ) {
	/**
	 * Radio Image custom control.
	 *
	 * @since  1.0.0
	 * @access public
	 */
	class Control_Radio_Image extends \WP_Customize_Control {

		/**
		 * The type of customize control being rendered.
		 *
		 * @since  1.0.0
		 * @access public
		 * @var    string
		 */
		public $type = 'radio-image';

		/**
		 * Allow choices parameter.
		 *
		 * @since  1.0.0
		 * @access public
		 * @var    array
		 */
		public $choices = array();

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

			$this->json['link'] = $this->get_link();

			// Setting ID.
			$this->json['id'] = $this->id;

			// Control Type.
			$this->json['type'] = $this->type;

			// Choices.
			$this->json['choices'] = $this->choices;
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
			<# if ( ! data.choices ) { return; } #>

			<# if ( data.label ) { #><span class="customize-control-title">{{{ data.label }}}</span><# } #>
			<# if ( data.description ) { #><span class="description customize-control-description">{{{ data.description }}}</span><# } #>

			<div class="gl-radio-images">
				<# for ( key in data.choices ) { #>
				<div class="gl-radio-image">
					<label<# if ( data.value === key ) { #> class="checked"<# } #>>
						<input type="radio" name="{{ data.id }}" value="{{ key }}" <# if ( data.value === key ) { #> checked<# } #> />
						<img src="{{ data.choices[ key ] }}">
					</label>
				</div>
				<# } #>
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
