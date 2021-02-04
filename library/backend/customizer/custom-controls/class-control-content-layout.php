<?php
/**
 * Content Layout Control.
 *
 * @package greenlet\library\admin\customizer
 */

namespace Greenlet;

if ( ! class_exists( 'Control_Content_Layout' ) && class_exists( 'WP_Customize_Control' ) ) {
	/**
	 * Content Layout custom control.
	 *
	 * @since  2.5.0
	 * @access public
	 */
	class Control_Content_Layout extends \WP_Customize_Control {

		/**
		 * The type of customize control being rendered.
		 *
		 * @since  2.5.0
		 * @access public
		 * @var    string
		 */
		public $type = 'content-layout';

		/**
		 * Allow groups parameter.
		 *
		 * @since  2.5.0
		 * @access public
		 * @var    array
		 */
		public $groups = array();

		/**
		 * Allow items parameter.
		 *
		 * @since  2.5.0
		 * @access public
		 * @var    array
		 */
		public $items = array();

		/**
		 * Allow cls parameter.
		 *
		 * @since  2.5.0
		 * @access public
		 * @var    string
		 */
		public $cls = '';

		/**
		 * Enqueue scripts/styles.
		 *
		 * @since  2.5.0
		 * @access public
		 * @return void
		 */
		public function enqueue() {
			$min = ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ) ? '' : '.min';
			wp_enqueue_script( 'sortablejs', GREENLET_LIBRARY_URL . '/backend/assets/js/sortable' . $min . '.js', array(), GREENLET_VERSION, true );
			greenlet_add_script_dependencies( 'greenlet-controls', array( 'sortablejs', 'react-dom' ) );
		}

		/**
		 * Refresh the parameters passed to the JavaScript via JSON.
		 *
		 * @since  2.5.0
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

			// Groups / Sections.
			$this->json['groups'] = $this->groups;

			// Items.
			$this->json['items'] = $this->items;

			// CSS Class.
			$this->json['cls'] = $this->cls;
		}

		/**
		 * Displays the control content.
		 *
		 * @since  2.5.0
		 * @access public
		 * @return void
		 */
		protected function content_template() { ?>
			<div id="{{ data.id }}-root"></div>
			<?php
		}

		/**
		 * Render Content.
		 *
		 * @since 2.5.0
		 */
		protected function render_content() {}
	}
}
