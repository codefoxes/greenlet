<?php
/**
 * Preset Control.
 *
 * @package greenlet\library\admin\customizer
 */

namespace Greenlet;

if ( ! class_exists( 'Control_Preset' ) && class_exists( 'Greenlet\Control_Radio_Image' ) ) {
	/**
	 * Preset custom control.
	 *
	 * @since  1.2.0
	 * @access public
	 */
	class Control_Preset extends Control_Radio_Image {

		/**
		 * The type of customize control being rendered.
		 *
		 * @since  1.2.0
		 * @access public
		 * @var    string
		 */
		public $type = 'preset';

		/**
		 * Refresh the parameters passed to the JavaScript via JSON.
		 *
		 * @since  1.2.0
		 * @see Control_Radio_Image::to_json()
		 */
		public function to_json() {
			// Get the basics from the parent class.
			parent::to_json();

			// All presets.
			$this->json['presets'] = greenlet_get_presets();
		}

		/**
		 * Displays the control content.
		 *
		 * @since  1.2.0
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
						<div class="preset-name">{{ key }}</div>
					</label>
				</div>
				<# } #>
			</div>
			<?php
		}
	}
}
