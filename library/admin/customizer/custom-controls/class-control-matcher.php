<?php
/**
 * Customizer matcher custom control.
 *
 * @package greenlet\library\admin\customizer
 */

namespace Greenlet;

if ( ! class_exists( 'WP_Customize_Control' ) ) {
	return;
}

/**
 * Matcher Control.
 *
 * @since  1.0.0
 */
class Control_Matcher extends \WP_Customize_Control {

	public $type = 'matcher';

	public $options = array();

	public $selections = array();

	public $allow_addition = true;

	public function to_json() {
		parent::to_json();

		$this->json['default'] = $this->setting->default;
		if ( isset( $this->default ) ) {
			$this->json['default'] = $this->default;
		}
		$this->json['value']      = $this->value();
		$this->json['label']      = esc_html( $this->label );
		$this->json['options']    = $this->options;
		$this->json['selections'] = $this->selections;
	}

	protected function content_template() {
		?>
		<#
		// console.log( data );
		#>
		<# if ( data.label ) { #>
		<label>
			<span class="customize-control-title">{{{ data.label }}}</span>
		</label>
		<# } #>
		<div class="customize-control-content">
			<# _.each( data.options, function( option, key ){  #>
			{{ option }}
			<select id="_customize-input-{{data.settings.default}}[{{key}}]" data-name="{{option}}" data-value="{{data.value[key]}}" >
				<# _.each( data.selections, function( option2, key2 ){  #>
				<option <# if ( data.value[key] == key2 ){ #> selected="selected" <# } #> value="{{ key2 }}">{{ option2 }}</option>
				<# } ); #>
			</select>
			<# } ); #>
		</div>

		<?php
	}
}
