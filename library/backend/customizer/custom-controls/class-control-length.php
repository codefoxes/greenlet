<?php
/**
 * Length Control.
 *
 * @package greenlet\library\admin\customizer
 */

namespace Greenlet;

if ( ! class_exists( 'Control_Length' ) && class_exists( 'WP_Customize_Control' ) ) {
	/**
	 * Length custom control.
	 *
	 * @since  1.1.0
	 * @access public
	 */
	class Control_Length extends \WP_Customize_Control {

		/**
		 * The type of customize control being rendered.
		 *
		 * @since  1.1.0
		 * @access public
		 * @var    string
		 */
		public $type = 'length';

		/**
		 * The sub type of length: border-radius, padding etc.
		 *
		 * @since  1.2.0
		 * @access public
		 * @var    string
		 */
		public $sub_type = 'size';

		/**
		 * The units of length.
		 *
		 * @since  2.1.0
		 * @access public
		 * @var    array
		 */
		public $units = array();

		/**
		 * Enqueue scripts/styles.
		 *
		 * @since  1.1.0
		 * @access public
		 * @return void
		 */
		public function enqueue() {
			greenlet_add_script_dependencies( 'greenlet-controls', array( 'react-dom' ) );
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

			$this->json['subType'] = $this->sub_type;

			$this->json['units'] = $this->units;
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
			<div id="{{ data.id }}-root"></div>
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
