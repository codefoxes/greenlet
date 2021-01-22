<?php
/**
 * Template Selector Control.
 *
 * @package greenlet\library\admin\customizer
 */

namespace Greenlet;

if ( ! class_exists( 'Control_Template_Sequence' ) && class_exists( 'WP_Customize_Control' ) ) {
	/**
	 * Template Selector custom control.
	 *
	 * @since  1.0.0
	 * @access public
	 */
	class Control_Template_Sequence extends \WP_Customize_Control {

		/**
		 * The type of customize control being rendered.
		 *
		 * @since  1.0.0
		 * @access public
		 * @var    string
		 */
		public $type = 'template-sequence';

		/**
		 * Allow templates parameter.
		 *
		 * @since  1.0.0
		 * @access public
		 * @var    array
		 */
		public $templates = array();

		/**
		 * Allow columns parameter.
		 *
		 * @since  1.0.0
		 * @access public
		 * @var    array
		 */
		public $columns = array();

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

			// Templates.
			$this->json['templates'] = $this->templates;

			// Columns.
			$this->json['columns'] = $this->columns;
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
			<# if ( ! data.templates ) { return; } #>

			<# if ( data.label ) { #><span class="customize-control-title">{{{ data.label }}}</span><# } #>
			<# if ( data.description ) { #><span class="description customize-control-description">{{{ data.description }}}</span><# } #>

			<svg class="svg-def" width="0" height="0" viewBox="0 0 201 11">
				<defs>
					<g id="gl-arrow-shape" fill="#ccc">
						<rect x="2" y="5" width="199" height="1" />
						<rect x="0" y="0" width="1" height="11" fill="#ddd" />
						<polygon points="1 5.5 4 2 4 9" />
					</g>
				</defs>
			</svg>

			<div class="gl-radio-images">
				<# for ( key in data.templates ) { #>
				<div class="gl-radio-image">
					<label<# if ( data.value.template === key ) { #> class="checked"<# } #>>
						<input type="radio" name="{{ data.id }}" value="{{ key }}" <# if ( data.value.template === key ) { #> checked<# } #> />
						<div class="icon">{{{ data.templates[ key ] }}}</div>
						<span class="template-name">{{ key }}</span>
					</label>
				</div>
				<# } #>
			</div>

			<# var cols = data.value.template.split('-'); #>

			<div class="gl-sequence gl-row">
			<# _.each( cols, function( col, index ){  #>
				<div class="gl-sequence-col col-{{ col }}">
					<select class="gl-sequence-content" >
						<# _.each( data.columns, function( col_name, col_id ){  #>
						<option <# if ( data.value.sequence[index] == col_id ){ #> selected="selected" <# } #> value="{{ col_id }}">{{ col_name }}</option>
						<# } ); #>
					</select>
					<div class="gl-sequence-name">
						<svg class="gl-arrow left" width="201px" height="11px" viewBox="0 0 201 11">
							<use href="#gl-arrow-shape" />
						</svg>
						<svg class="gl-arrow right" width="201px" height="11px" viewBox="0 0 201 11">
							<use href="#gl-arrow-shape" />
						</svg>
						<span>{{ col }}</span>
					</div>
				</div>
			<# } ); #>
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
