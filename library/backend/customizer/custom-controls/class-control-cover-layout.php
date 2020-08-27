<?php
/**
 * Cover Layout Control.
 *
 * @package greenlet\library\admin\customizer
 */

namespace Greenlet;

if ( ! class_exists( 'Control_Cover_Layout' ) && class_exists( 'WP_Customize_Control' ) ) {
	/**
	 * Cover Layout custom control.
	 *
	 * @since  1.3.0
	 * @access public
	 */
	class Control_Cover_Layout extends \WP_Customize_Control {

		/**
		 * The type of customize control being rendered.
		 *
		 * @since  1.3.0
		 * @access public
		 * @var    string
		 */
		public $type = 'cover-layout';

		/**
		 * The cover position to control.
		 *
		 * @since  1.3.0
		 * @access public
		 * @var    string
		 */
		public $position = '';

		/**
		 * Allow choices parameter.
		 *
		 * @since  1.3.0
		 * @access public
		 * @var    array
		 */
		public $choices = array();

		/**
		 * Allow items parameter.
		 *
		 * @since  1.3.5
		 * @access public
		 * @var    array
		 */
		public $items = array();

		/**
		 * Enqueue scripts/styles.
		 *
		 * @since  1.3.0
		 * @access public
		 * @return void
		 */
		public function enqueue() {
			$min = ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ) ? '' : '.min';
			wp_enqueue_script( 'greenlet-controls', GL_LIBRARY_URL . '/backend/assets/js/greenlet-controls' . $min . '.js', array( 'jquery', 'react-dom' ), GREENLET_VERSION, true );
			wp_enqueue_style( 'greenlet-controls', GL_LIBRARY_URL . '/backend/assets/css/greenlet-controls.css', array(), GREENLET_VERSION );
		}

		/**
		 * Refresh the parameters passed to the JavaScript via JSON.
		 *
		 * @since  1.3.0
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

			// Control Position.
			$this->json['position'] = $this->position;

			// Choices.
			$this->json['choices'] = $this->choices;

			// Content items.
			$this->json['items'] = $this->items;
		}

		/**
		 * Displays the control content.
		 *
		 * @since  1.3.0
		 * @access public
		 * @return void
		 */
		protected function content_template() {
			?>
			<div id="{{ data.id }}-root" class="cover-layout"></div>
			<?php
		}

		/**
		 * Render Content.
		 *
		 * @since 1.3.0
		 */
		protected function render_content() {}
	}
}
