<?php
/**
 * Multicheck Control.
 *
 * @package greenlet\library\admin\customizer
 */

namespace Greenlet;

if ( ! class_exists( 'Control_Multicheck' ) && class_exists( 'WP_Customize_Control' ) ) {
	/**
	 * Customizer multicheck custom control.
	 *
	 * @since  1.0.0
	 * @access public
	 */
	class Control_Multicheck extends \WP_Customize_Control {

		/**
		 * The type of customize control being rendered.
		 *
		 * @since  1.0.0
		 * @access public
		 * @var    string
		 */
		public $type = 'multicheck';

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

			// Choices.
			$this->json['choices'] = $this->choices;

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
			<# if ( ! data.choices ) { return; } #>

			<# if ( data.label ) { #><span class="customize-control-title">{{{ data.label }}}</span><# } #>
			<# if ( data.description ) { #><span class="description customize-control-description">{{{ data.description }}}</span><# } #>

			<ul>
				<# for ( key in data.choices ) { #>
				<li>
					<label<# if ( _.contains( data.value, key ) ) { #> class="checked"<# } #>>
					<input type="checkbox" value="{{ key }}"<# if ( _.contains( data.value, key ) ) { #> checked<# } #> />{{ data.choices[ key ] }}
					</label>
				</li>
				<# } #>
			</ul>
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
