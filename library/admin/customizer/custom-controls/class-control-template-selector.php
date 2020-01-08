<?php
/**
 * Template Selector Control.
 *
 * @package greenlet\library\admin\customizer
 */

namespace Greenlet;

if ( ! class_exists( 'Control_Template_Selector' ) && class_exists( 'WP_Customize_Control' ) ) {
	/**
	 * Template Selector custom control.
	 *
	 * @since  1.0.0
	 * @access public
	 */
	class Control_Template_Selector extends Control_Radio_Image {

		/**
		 * The type of customize control being rendered.
		 *
		 * @since  1.0.0
		 * @access public
		 * @var    string
		 */
		public $type = 'template-selector';

		/**
		 * Allow choices parameter.
		 *
		 * @var array
		 */
		public $choices = array();

		public $options = array();

		public $selections = array();

		/**
		 * Enqueue scripts/styles.
		 *
		 * @since  1.0.0
		 * @access public
		 * @return void
		 */
		public function enqueue() {
			wp_enqueue_script( 'greenlet-controls', ADMIN_URL . '/assets/js/greenlet-controls.js', array( 'jquery' ), GREENLET_VERSION, true );
			wp_enqueue_style( 'greenlet-controls', ADMIN_URL . '/assets/css/greenlet-controls.css', array(), GREENLET_VERSION );
		}

		/**
		 * Refresh the parameters passed to the JavaScript via JSON.
		 *
		 * @see WP_Customize_Control::to_json()
		 */
		public function to_json() {

			// Get the basics from the parent class.
			parent::to_json();

			$this->json['options']    = $this->options;
			$this->json['selections'] = $this->selections;
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
			<#
			console.log( data );
			#>
			<# if ( ! data.choices ) { return; } #>

			<# if ( data.label ) { #><span class="customize-control-title">{{{ data.label }}}</span><# } #>
			<# if ( data.description ) { #><span class="description customize-control-description">{{{ data.description }}}</span><# } #>

			<input id="_customize-input-{{ data.id }}" type="hidden" {{{ data.link }}} />

			<div class="gl-radio-images">
				<# for ( key in data.choices ) { #>
				<div class="gl-radio-image">
					<label<# if ( data.value === key ) { #> class="checked"<# } #>>
						<input type="radio" name="test" value="{{ key }}" <# if ( data.value === key ) { #> checked<# } #> />
						<img src="{{ data.choices[ key ] }}">
					</label>
				</div>
				<# } #>
			</div>

			<div class="gl-template-matcher-sequence">
			<# _.each( data.options, function( option, key ){  #>
				<div class="gl-template-matcher">
					<div class="gl-template-matcher-column">{{ option }}</div>
					<select data-name="gl-template-selection" data-value="{{data.value[key]}}" >
						<# _.each( data.selections, function( option2, key2 ){  #>
						<option <# if ( data.value[key] == key2 ){ #> selected="selected" <# } #> value="{{ key2 }}">{{ option2 }}</option>
						<# } ); #>
					</select>
				</div>
			<# } ); #>
		</div>
			<?php
		}

		/**
		 * Render Content.
		 */
		protected function render_content() {}
	}
}
