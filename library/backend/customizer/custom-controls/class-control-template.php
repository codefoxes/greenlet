<?php
/**
 * Template Control.
 *
 * @package greenlet\library\admin\customizer
 */

namespace Greenlet;

if ( ! class_exists( 'Control_Template' ) && class_exists( 'WP_Customize_Control' ) ) {
	/**
	 * Template custom control.
	 *
	 * @since  1.1.0
	 * @access public
	 */
	class Control_Template extends \WP_Customize_Control {

		/**
		 * The type of customize control being rendered.
		 *
		 * @since  1.1.0
		 * @access public
		 * @var    string
		 */
		public $type = 'template';

		/**
		 * Allow choices parameter.
		 *
		 * @since  1.1.0
		 * @access public
		 * @var    array
		 */
		public $choices = array();

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
			$this->json['choices'] = $this->choices;
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
			<# if ( ! data.choices ) { return; } #>

			<# if ( data.label ) { #><span class="customize-control-title">{{{ data.label }}}</span><# } #>
			<# if ( data.description ) { #><span class="description customize-control-description">{{{ data.description }}}</span><# } #>

			<div class="gl-radio-images">
				<# for ( key in data.choices ) { #>
				<div class="gl-radio-image">
					<label<# if ( data.value === key ) { #> class="checked"<# } #>>
						<input type="radio" name="{{ data.id }}" value="{{ key }}" <# if ( data.value === key ) { #> checked<# } #> />
						<img src="{{ data.choices[ key ] }}">
						<span class="template-name">{{ key }}</span>
					</label>
				</div>
				<# } #>
			</div>
			<div class="more-wrap">
				<input type="checkbox" />
				<div class="more-content">
					<label for="{{ data.id }}-text" class="description customize-control-description">
						<?php echo esc_html__( 'Enter column numbers separated by hyphen.', 'greenlet' ) . '<br>' . esc_html__( 'Eg: 4-8 or 9-3', 'greenlet' ) . '<br>' . esc_html__( 'Sum should be 12', 'greenlet' ); ?></label>
					<input type="text" id="{{ data.id }}-text" value="{{ data.value }}">
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
