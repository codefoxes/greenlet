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
	}

	/**
	 * Enqueue Customizer Scripts.
	 */
	public function enqueue_scripts() {
		wp_register_script( 'greenlet_metaboxes', ADMIN_URL . '/assets/js/metaboxes.js', array( 'wp-blocks', 'wp-element', 'wp-components' ), GREENLET_VERSION, true );
		wp_localize_script( 'greenlet_metaboxes', 'template_ajax', array( 'ajaxurl' => admin_url( 'admin-ajax.php' ) ) );
		wp_enqueue_script( 'greenlet_metaboxes' );
	}

	/**
	 * Add Page Attributes meta box.
	 * Removes default page attributes meta and adds modified.
	 *
	 * @since  1.0.0
	 * @access public
	 * @param array $post_type Current post type.
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
				$pages         = wp_dropdown_pages( $dropdown_args ); // phpcs:ignore

				// If pages exist, output dropdown list.
				if ( ! empty( $pages ) ) { ?>
					<p><strong><?php esc_html_e( 'Parent', 'greenlet' ); ?></strong></p>
					<label class="screen-reader-text" for="parent_id"><?php esc_html_e( 'Parent', 'greenlet' ); ?></label>
					<?php
					echo $pages; // phpcs:ignore
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
				$options    = greenlet_column_options( $template, $post->post_type );
				$selections = greenlet_column_content_options();
				$output     = greenlet_sequencer( $options, $selections, $sequence );
				echo wp_kses( $output, greenlet_sequencer_tags() );
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

if ( is_admin() ) {
	Metaboxes::get_instance();
}
