<?php
/**
 * Meta Boxes Manager.
 *
 * @package greenlet\library\admin\metaboxes
 */

namespace Greenlet;

/**
 * Set up Custom Meta Boxes.
 *
 * @since  1.0.0
 */
class Metaboxes {

	/**
	 * Holds the instances of this class.
	 *
	 * @since  1.0.0
	 * @access private
	 * @var    object
	 */
	private static $instance;

	/**
	 * Sets up needed actions/filters for the honeypot to initialize.
	 *
	 * @since  1.0.0
	 * @access public
	 * @return void
	 */
	public function __construct() {
		// Meta box action.
		add_action( 'add_meta_boxes', array( $this, 'greenlet_add_page_template' ) );

		// Save page template while post is saved or updated.
		add_action( 'save_post', array( $this, 'greenlet_save_page_template' ), 10, 2 );

		// Add scripts to admin pages.
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_scripts' ) );

		add_action( 'wp_ajax_greenlet_template_sequence', array( $this, 'greenlet_template_sequence' ) );
		add_action( 'wp_ajax_nopriv_greenlet_template_sequence', array( $this, 'greenlet_template_sequence' ) );
	}

	/**
	 * Enqueue Customizer Scripts.
	 *
	 * @since  1.0.0
	 */
	public function enqueue_scripts() {
		wp_register_script( 'greenlet_metaboxes', LIBRARY_URL . '/backend/assets/js/metaboxes.js', array( 'wp-blocks', 'wp-element', 'wp-components' ), GREENLET_VERSION, true );
		wp_localize_script( 'greenlet_metaboxes', 'template_ajax', array( 'ajaxurl' => admin_url( 'admin-ajax.php' ) ) );
		wp_enqueue_script( 'greenlet_metaboxes' );
	}

	/**
	 * Add Page Attributes meta box.
	 * Removes default page attributes meta and adds modified.
	 *
	 * @since  1.0.0
	 * @access public
	 * @param  array $post_type Current post type.
	 */
	public function greenlet_add_page_template( $post_type ) {

		// Set desired post types array to show template meta box.
		$post_types = array( 'post', 'page', 'forum', 'product' );

		/**
		 * Filter the post types to add template meta box.
		 *
		 * @param array $post_types List of post types.
		 */
		$post_types = apply_filters( 'greenlet_meta_template_post_types', $post_types );

		if ( in_array( $post_type, $post_types, true ) ) {

			// Remove Default meta box.
			remove_meta_box( 'pageparentdiv', 'page', 'side' );

			// Add meta box with greenlet_page_template_meta_box callback.
			add_meta_box(
				'postparentdiv',
				__( 'Page Attributes', 'greenlet' ),
				array( $this, 'greenlet_page_template_meta_box' ),
				$post_type,
				'side',
				'core'
			);
		}
	}

	/**
	 * Conditionally output Meta box.
	 *
	 * @since 1.0.0
	 * @param object $post The current WP_Post object.
	 */
	public function greenlet_page_template_meta_box( $post ) {

		// If page templates exist.
		if ( 0 !== count( get_page_templates() ) ) {

			// Add an nonce field so we can check for it later.
			wp_nonce_field( 'greenlet_template_meta_box', 'greenlet_nonce' );

			// Get previously set page template and sequence.
			$template = get_post_meta( $post->ID, '_wp_page_template', true );
			$sequence = get_post_meta( $post->ID, '_template_sequence', true );

			// Page hierarchy (parent).
			$post_type_object = get_post_type_object( $post->post_type );

			// If hierarchy exist.
			if ( $post_type_object->hierarchical ) {
				$dropdown_args = array(
					'post_type'        => $post->post_type,
					'exclude_tree'     => $post->ID,
					'selected'         => $post->post_parent,
					'name'             => 'parent_id',
					'show_option_none' => __( '(no parent)', 'greenlet' ),
					'sort_column'      => 'menu_order, post_title',
					'echo'             => 0,
				);

				/**
				 * Filter the arguments used to generate a Pages drop-down element.
				 *
				 * @see wp_dropdown_pages()
				 *
				 * @param array  $dropdown_args Array of arguments used to generate the pages drop-down.
				 * @param object $post          The current WP_Post object.
				 */
				$dropdown_args = apply_filters( 'page_attributes_dropdown_pages_args', $dropdown_args, $post );
				$pages         = wp_dropdown_pages( array_map( 'esc_html', $dropdown_args ) );

				// If pages exist, output dropdown list.
				if ( ! empty( $pages ) ) { ?>
					<p><strong><?php esc_html_e( 'Parent', 'greenlet' ); ?></strong></p>
					<label class="screen-reader-text" for="parent_id"><?php esc_html_e( 'Parent', 'greenlet' ); ?></label>
					<?php
					$dropdown_args['echo'] = 1;
					wp_dropdown_pages( array_map( 'esc_html', $dropdown_args ) );
				}
			}
			?>

			<input type="hidden" id="greenlet-post-type" value="<?php echo esc_html( $post->post_type ); ?>" />
			<p><strong><?php esc_html_e( 'Template', 'greenlet' ); ?></strong></p>
			<label class="screen-reader-text" for="page_template"><?php esc_html_e( 'Page Template', 'greenlet' ); ?></label>
			<select name="page_template" id="page_template">
				<option value='default'><?php esc_html_e( 'Default Template', 'greenlet' ); ?></option>
				<?php $this->greenlet_page_template_dropdown( $template ); ?>
			</select>
			<div class="sequence spinner"></div>
			<div id="sequence" style="margin: 1em 0;">
				<?php
				// Output template column sequencer.
				$options    = $this->greenlet_column_options( $template, $post->post_type );
				$selections = greenlet_column_content_options();
				$output     = $this->greenlet_sequencer( $options, $selections, $sequence );
				echo wp_kses( $output, $this->greenlet_sequencer_tags() );
				?>
			</div>
			<?php if ( 'page' === $post->post_type ) { ?>
				<p><strong><?php esc_html_e( 'Order', 'greenlet' ); ?></strong></p>
				<p><label class="screen-reader-text" for="menu_order"><?php esc_html_e( 'Order', 'greenlet' ); ?></label><input name="menu_order" type="text" size="4" id="menu_order" value="<?php echo esc_attr( $post->menu_order ); ?>"/></p>
				<p><?php esc_html_e( 'Need help? Use the Help tab in the upper right of your screen.', 'greenlet' ); ?></p>
				<?php
			}
		}
	}

	/**
	 * Adds page templates dropdown.
	 *
	 * @since 1.0.0
	 * @param string $default selected page template.
	 */
	public function greenlet_page_template_dropdown( $default = '' ) {

		// Get page templates.
		$templates = get_page_templates();
		ksort( $templates );

		// For each page template.
		foreach ( array_keys( $templates ) as $template ) {

			// If template is set page template, add selected attribute.
			if ( $default === $templates[ $template ] ) {
				$selected = " selected='selected'";
			} else {
				$selected = '';
			}
			printf( '<option value="%1$s" %2$s>%3$s</option>', esc_html( $templates[ $template ] ), wp_kses( $selected, null ), esc_html( $template ) );
		}
	}

	/**
	 * Saves page template meta.
	 *
	 * @see wp-includes/pluggable.php
	 * @see wp-includes/formatting.php
	 * @see wp-includes/post.php
	 *
	 * @since 1.0.0
	 * @param int $post_id Post ID of current post.
	 */
	public function greenlet_save_page_template( $post_id ) {

		// If this is an autosave, our form has not been submitted, so we don't want to do anything.
		if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
			return;
		}

		// Check if our nonce is set.
		if ( ! isset( $_POST['greenlet_nonce'] ) ) {
			return;
		}

		// Verify that the nonce is valid.
		if ( ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['greenlet_nonce'] ) ), 'greenlet_template_meta_box' ) ) {
			return;
		}

		// Sanitize user input.
		$template = isset( $_POST['page_template'] ) ? sanitize_text_field( wp_unslash( $_POST['page_template'] ) ) : null;
		$sequence = array_key_exists( 'template-sequence', $_POST ) ? array_map( 'sanitize_text_field', wp_unslash( $_POST['template-sequence'] ) ) : array();

		// Update custom page template meta upon save.
		if ( ! empty( $_POST['page_template'] ) ) {
			update_post_meta( $post_id, '_wp_page_template', $template );
		}

		if ( ! empty( $_POST['template-sequence'] ) ) {
			update_post_meta( $post_id, '_template_sequence', $sequence );
		}
	}

	/**
	 * Sends template sequence upon ajax.
	 *
	 * @since 1.0.0
	 */
	public function greenlet_template_sequence() {

		if ( ! isset( $_POST['nonce'] ) ) {
			return;
		}

		if ( ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['nonce'] ) ), 'greenlet_template_meta_box' ) ) {
			return;
		}

		// Get ajax post data.
		$template_name = isset( $_POST['template'] ) ? sanitize_text_field( wp_unslash( $_POST['template'] ) ) : null;
		$post_type     = isset( $_POST['post_type'] ) ? sanitize_text_field( wp_unslash( $_POST['post_type'] ) ) : 'post';

		// Get templates columns and content sequence.
		$options    = $this->greenlet_column_options( $template_name, $post_type );
		$selections = greenlet_column_content_options();

		// Get sequence html, Output and terminate the current script.
		$output = $this->greenlet_sequencer(
			$options,
			$selections,
			array( 'main', 'sidebar-1', 'sidebar-2', 'sidebar-3', 'sidebar-4', 'sidebar-5', 'sidebar-6', 'sidebar-7', 'sidebar-8' )
		);

		echo wp_kses( $output, $this->greenlet_sequencer_tags() );
		die();
	}

	/**
	 * Returns column array for current template selection.
	 *
	 * @since  1.0.0
	 * @param  string $template_name template name.
	 * @param  string $post_type     Post type.
	 * @return array columns
	 */
	public function greenlet_column_options( $template_name, $post_type ) {
		if ( 'default' === $template_name ) {
			if ( 'page' === $post_type ) {
				$layout = gl_get_option( 'default_template', array( 'template' => '12' ) );
			} else {
				$layout = gl_get_option( 'post_template', array( 'template' => '12' ) );
			}

			$template = $layout['template'];
		} else {
			$template = str_replace( '.php', '', basename( $template_name ) );
		}

		// Assign to column array.
		$cols  = explode( '-', $template );
		$array = array();

		// If array is numeric, return columns array. Else return empty.
		if ( is_numeric_array( $cols ) ) {

			$total = count( $cols );
			for ( $i = 1; $i <= $total; $i++ ) {
				$array[ $i - 1 ] = 'Column ' . $i;
			}
		}

		return $array;
	}

	/**
	 * Column sequencer
	 * Generates template columns and content sequence.
	 *
	 * @since    1.0.0
	 * @param    array $options    template columns.
	 * @param    array $selections column content.
	 * @param    array $sequence   previously set sequence.
	 * @return   string            column sequence html
	 */
	public function greenlet_sequencer( $options, $selections, $sequence = null ) {

		$output = '';

		foreach ( $options as $key => $option ) {

			$selected = '';
			$label    = $option;
			$option   = preg_replace( '/[^a-zA-Z0-9._\-]/', '', strtolower( $key ) );

			$id   = 'template-sequence[' . $option . ']';
			$name = 'template-sequence[' . $option . ']';

			$output .= '<div><label for="' . esc_attr( $id ) . '">' . esc_html( $label ) . '</label>';
			$output .= '<select id="' . esc_attr( $id ) . '" class="of-input" name="' . esc_attr( $name ) . '" style="width:60%;margin:2px 10px;">';
			foreach ( $selections as $key2 => $option2 ) {
				if ( isset( $sequence[ $option ] ) ) {
					$selected = selected( $sequence[ $option ], $key2, false );
				}
				$output .= '<option' . $selected . ' value="' . esc_attr( $key2 ) . '">' . esc_html( $option2 ) . '</option>';
			}
			$output .= '</select></div>';
		}

		return $output;
	}

	/**
	 * Retrieve sequencer allowed tags.
	 *
	 * @since  1.0.0
	 * @return array Sequencer allowed Tags
	 */
	public function greenlet_sequencer_tags() {
		return array(
			'div'    => array(),
			'label'  => array(
				'for' => array(),
			),
			'select' => array(
				'id'    => array(),
				'class' => array(),
				'name'  => array(),
				'style' => array(),
			),
			'option' => array(
				'selected' => array(),
				'value'    => array(),
			),
		);
	}

	/**
	 * Returns the instance.
	 *
	 * @since  1.0.0
	 * @access public
	 * @return object
	 */
	public static function get_instance() {

		if ( ! self::$instance ) {
			self::$instance = new self();
		}

		return self::$instance;
	}
}

Metaboxes::get_instance();
