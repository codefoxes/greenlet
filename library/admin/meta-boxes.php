<?php
/**
 * Meta boxes Manager.
 *
 * Add meta boxes to posts and pages.
 *
 * @package greenlet\library
 */

// If greenlet_add_page_template doesnt exist.
if ( ! function_exists( 'greenlet_add_page_template' ) && is_admin() ) {

	// Meta box action.
	add_action( 'add_meta_boxes', 'greenlet_add_page_template' );

	// Save page template while post is saved or updated.
	add_action( 'save_post', 'greenlet_save_page_template', 10, 2 );

	// Add scripts to admin pages.
	add_action( 'admin_enqueue_scripts', 'greenlet_admin_enqueue' );

	/**
	 * Add Page Attributes meta box.
	 * Removes default page attributes meta and adds modified.
	 *
	 * @param array $post_type Current post type.
	 */
	function greenlet_add_page_template( $post_type ) {

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
				'greenlet_page_template_meta_box',
				$post_type,
				'side',
				'core'
			);
		}
	}


	/**
	 * Conditionally output Meta box.
	 *
	 * @param WP_Post $post The current WP_Post object.
	 */
	function greenlet_page_template_meta_box( $post ) {

		// If page templates exist.
		if ( 0 !== count( get_page_templates() ) ) {

			// Add an nonce field so we can check for it later.
			wp_nonce_field( 'greenlet_template_meta_box', 'greenlet_template_meta_box_nonce' );

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
				 * @param array   $dropdown_args Array of arguments used to generate the pages drop-down.
				 * @param WP_Post $post          The current WP_Post object.
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

			<p><strong><?php esc_html_e( 'Template', 'greenlet' ); ?></strong></p>
			<label class="screen-reader-text" for="page_template"><?php esc_html_e( 'Page Template', 'greenlet' ); ?></label>
			<select name="page_template" id="page_template">
				<option value='default'><?php esc_html_e( 'Default Template', 'greenlet' ); ?></option>
				<?php greenlet_page_template_dropdown( $template ); ?>
			</select>
			<div class="sequence spinner"></div>
			<div id="sequence" style="margin: 1em 0;">
				<?php
				// Output template column sequencer.
				$options    = greenlet_column_options( $template );
				$selections = greenlet_column_content_options();
				$output     = greenlet_sequencer( $options, $selections, null, $sequence );
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
	function greenlet_page_template_dropdown( $default = '' ) {

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
	 * @param int     $post_id Post ID of current post.
	 * @param WP_Post $post    The current WP_Post object.
	 */
	function greenlet_save_page_template( $post_id, $post ) {

		// Check if our nonce is set.
		if ( ! isset( $_POST['greenlet_template_meta_box_nonce'] ) ) {
			return;
		}

		// Verify that the nonce is valid.
		if ( ! wp_verify_nonce( $_POST['greenlet_template_meta_box_nonce'], 'greenlet_template_meta_box' ) ) {
			return;
		}

		// If this is an autosave, our form has not been submitted, so we don't want to do anything.
		if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
			return;
		}

		// Sanitize user input.
		$template = sanitize_text_field( $_POST[ 'page_template' ] );
		$sequence = $_POST['template-sequence'] ? $_POST['template-sequence'] : '';
		if ( is_array( $sequence ) ) {
			$sequence = array_map( 'sanitize_text_field', $sequence );
		} else {
			$sequence = sanitize_text_field( $sequence );
		}

		// Update custom page template meta upon save.
		if ( ! empty( $_POST['page_template'] ) ) {
			update_post_meta( $post_id, '_wp_page_template', $template );
		}

		if ( ! empty( $_POST['template-sequence'] ) ) {
			update_post_meta( $post_id, '_template_sequence', $sequence );
		}
	}


	/**
	 * Add admin scripts.
	 *
	 * Add and Localize script for admin pages.
	 *
	 * @see wp-includes/functions.wp-scripts.php.
	 * @todo Add to only required pages.
	 *
	 * @param string $hook admin pages.
	 */
	function greenlet_admin_enqueue( $hook ) {
		// if ( $hook == 'post-new.php' || $hook == 'post.php' || theme.php( ? options page ) ) {}.

		wp_register_script( 'greenlet_template', ADMIN_URL . '/templates.js', array( 'wp-blocks', 'wp-element', 'wp-components' ), GREENLET_VERSION, true );
		wp_localize_script( 'greenlet_template', 'template_ajax', array( 'ajaxurl' => admin_url( 'admin-ajax.php' ) ) );
		wp_enqueue_script( 'greenlet_template' );
	}
}
