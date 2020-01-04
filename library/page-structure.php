<?php
/**
 * Page structure.
 *
 * @package greenlet\library
 */

add_action( 'greenlet_main_container', 'greenlet_do_main_container' );

if ( of_get_option( 'breadcrumb' ) ) {
	add_action( 'greenlet_before_loop', 'greenlet_breadcrumb', 2 );
}

add_action( 'greenlet_before_loop', 'greenlet_archive_header_template' );
add_action( 'greenlet_archive_header', 'greenlet_do_archive_header' );

add_action( 'greenlet_loop', 'greenlet_do_loop' );

add_action( 'greenlet_entry_header', 'greenlet_do_entry_header' );
add_action( 'greenlet_entry_content', 'greenlet_do_entry_content' );
add_action( 'greenlet_entry_footer', 'greenlet_do_entry_footer' );
add_action( 'greenlet_after_entry', 'greenlet_comments_template' );

add_action( 'greenlet_after_endwhile', 'greenlet_paging_nav' );

add_filter( 'excerpt_more', 'greenlet_excerpt_more' );
add_filter( 'excerpt_length', 'greenlet_excerpt_length', 999 );


/**
 * Renders main container.
 *
 * @return void
 */
function greenlet_do_main_container() {
	do_action( 'greenlet_before_left_sidebar' );

	// Intantiate ColumnObject class to get column widths.
	$cobj = new ColumnObject();

	if ( $cobj->sequence ) {
		foreach ( $cobj->sequence as $pos => $column ) {
			$width = isset( $cobj->cols_array()[ $pos ] ) ? $cobj->cols_array()[ $pos ] : null;
			if ( 'main' === $column ) {
				do_action( 'greenlet_after_left_sidebar' );

				// Attribute arguments for main content.
				$args = array(
					'primary' => 'main',
					'width'   => $width,
				);

				greenlet_markup( 'main', greenlet_attr( $args ) );
				greenlet_markup( 'main-wrap', greenlet_attr( 'wrap' ) );

				do_action( 'greenlet_before_loop' );
				do_action( 'greenlet_loop' );
				do_action( 'greenlet_after_loop' );

				greenlet_markup_close( 2 );

				do_action( 'greenlet_before_right_sidebar' );
			} else {
				// If sidebar is active, Display it.
				if ( is_active_sidebar( $column ) ) {

					// Attribute arguments for sidebar.
					$args = array(
						'primary' => 'sidebar',
						'width'   => $width,
					);

					greenlet_markup( 'sidebar', greenlet_attr( $args ) );
					greenlet_markup( 'side-wrap', greenlet_attr( 'wrap' ) );
					dynamic_sidebar( $column );
					greenlet_markup_close( 2 );
				}
			}
		}
	} else {
		// Add sidebars left to the main content.
		// If sidebar width is less than main content display each of them.
		$i = 0;
		while ( $cobj->array[ $i ] < $cobj->main_column ) {

			// If sidebar is active, Display it.
			if ( is_active_sidebar( 'sidebar-' . ( $i + 1 ) ) ) {

				// Attribute arguments for sidebar.
				$args = array(
					'primary' => 'sidebar',
					'width'   => $cobj->array[ $i ],
				);

				greenlet_markup( 'sidebar', greenlet_attr( $args ) );
				greenlet_markup( 'side-wrap', greenlet_attr( 'wrap' ) );
				dynamic_sidebar( 'sidebar-' . ( $i + 1 ) );
				greenlet_markup_close( 2 );
			}
			$i++;
		}

		// Save sidebar pointer so that we can use it later.
		$greenlet_sidebar_pointer = $i;

		do_action( 'greenlet_after_left_sidebar' );

		// Attribute arguments for main content.
		$args = array(
			'primary' => 'main',
			'width'   => $cobj->main_column,
		);

		greenlet_markup( 'main', greenlet_attr( $args ) );
		greenlet_markup( 'main-wrap', greenlet_attr( 'wrap' ) );

		do_action( 'greenlet_before_loop' );
		do_action( 'greenlet_loop' );
		do_action( 'greenlet_after_loop' );

		greenlet_markup_close( 2 );

		do_action( 'greenlet_before_right_sidebar' );

		// Add sidebars right to the main content.
		// Get saved sidebar pointer.
		// Display each sidebars upto total columns.
		$i = $greenlet_sidebar_pointer;

		$i++;
		while ( $i < $cobj->total ) {

			// If sidebar is active, Display it.
			if ( is_active_sidebar( 'sidebar-' . $i ) ) {

				// Attribute arguments for sidebar.
				$args = array(
					'primary' => 'sidebar',
					'width'   => $cobj->array[ $i ],
				);

				greenlet_markup( 'sidebar', greenlet_attr( $args ) );
				greenlet_markup( 'side-wrap', greenlet_attr( 'wrap' ) );
				dynamic_sidebar( 'sidebar-' . $i );
				greenlet_markup_close( 2 );
			}
			$i++;
		}
	}
	do_action( 'greenlet_after_right_sidebar' );
}


/**
 * Renders breadcrumb.
 *
 * @return void
 */
function greenlet_breadcrumb() {

	if ( ! is_front_page() ) {
		do_action( 'greenlet_before_breadcrumb' );

		if ( function_exists( 'yoast_breadcrumb' ) ) {
			yoast_breadcrumb( '<p id="breadcrumbs">', '</p>' );
		} elseif ( function_exists( 'breadcrumb_trail' ) ) {
			breadcrumb_trail();
		} elseif ( function_exists( 'bcn_display' ) ) {
			echo '<div class="breadcrumbs" xmlns:v="http://rdf.data-vocabulary.org/#">';
			if ( function_exists( 'bcn_display_list_multidim' ) ) {
				bcn_display_list_multidim();
			} else {
				bcn_display();
			}
			echo '</div>';
		} elseif ( function_exists( 'bread_crumb' ) ) {
			bread_crumb();
		} elseif ( function_exists( 'simple_breadcrumb' ) ) {
			simple_breadcrumb();
		} elseif ( function_exists( 'breadcrumbs_everywhere' ) ) {
			breadcrumbs_everywhere();
		} else {
			get_template_part( 'library/breadcrumb' );
		}

		do_action( 'greenlet_after_breadcrumb' );
	}
}


/**
 * Renders archive header.
 *
 * @return void
 */
function greenlet_archive_header_template() {

	// If archive page then display the header.
	if ( is_archive() ) {
		do_action( 'greenlet_before_archive_header' );
		greenlet_markup( 'page-header', greenlet_attr( 'page-header' ) );
		do_action( 'greenlet_archive_header' );
		greenlet_markup_close();
		do_action( 'greenlet_after_archive_header' );
	}
}


/**
 * Renders archive header content.
 *
 * @return void
 */
function greenlet_do_archive_header() {

	switch ( true ) {
		case is_author():
			$archive_title = apply_filters( 'greenlet_author_archive_title', ucfirst( get_the_author() ) . ' Archives' );

			// If the author bio exists, display it.
			if ( get_the_author_meta( 'description' ) ) {
				$archive_description = '<p>' . get_the_author_meta( 'description' ) . '</p>';
			}
			break;
		case is_category():
			$archive_title = apply_filters( 'greenlet_category_archive_title', single_cat_title( '', false ) . ' Archives' );

			// Show an optional category description.
			if ( category_description() ) {
				$archive_description = category_description();
			}
			break;
		case is_tag():
			$archive_title = apply_filters( 'greenlet_tag_archive_title', single_tag_title( '', false ) . ' Archives' );

			// Show an optional tag description.
			if ( tag_description() ) {
				$archive_description = '<p>' . tag_description() . '</p>';
			}
			break;
		case is_day():
			$archive_title = apply_filters( 'greenlet_daily_archive_title', get_the_date() . ' Archives' );
			break;
		case is_month():
			$archive_title = apply_filters( 'greenlet_monthly_archive_title', get_the_date( _x( 'F Y', 'Monthly archives date format', 'greenlet' ) ) . ' Archives' );
			break;
		case is_year():
			$archive_title = apply_filters( 'greenlet_yearly_archive_title', get_the_date( _x( 'Y', 'Yearly archives date format', 'greenlet' ) ) . ' Archives' );
			break;
	}

	if ( isset( $archive_title ) ) {
		printf( '<h1 %s>', wp_kses( greenlet_attr( 'archive-title' ), null ) );
		// translators: %s: Archive Title.
		printf( esc_html__( '%s', 'greenlet' ), esc_html( $archive_title ) ); // phpcs:ignore
		echo '</h1>';
	}
	if ( isset( $archive_description ) ) {
		// translators: %s: Archive Description.
		printf( esc_html__( '%s', 'greenlet' ), esc_html( $archive_description ) ); // phpcs:ignore
	}
}


/**
 * Renders main post loop.
 *
 * @return void
 */
function greenlet_do_loop() {

	// If there are posts, run the post loop.
	if ( have_posts() ) :

		do_action( 'greenlet_before_while' );

		// Post loop - While there are posts, Display each of them.
		while ( have_posts() ) :
			the_post();
			get_template_part( 'content', get_post_format() );
		endwhile;

		do_action( 'greenlet_after_endwhile' );

	else :

		get_template_part( 'content', 'none' );

	endif;
}


/**
 * Renders post header.
 *
 * @return void
 */
function greenlet_do_entry_header() {

	if ( is_front_page() && is_singular() ) {
		return;
	}

	greenlet_markup( 'entry-header', greenlet_attr( 'entry-header' ) );

	// If single page, display title. Else, display title in a link.
	if ( is_singular() ) {
		printf( '<h1 %s>', wp_kses( greenlet_attr( 'entry-title' ), null ) );
		the_title();
		echo '</h1>';
	} else {
		printf( '<h2 %s>', wp_kses( greenlet_attr( 'entry-title' ), null ) ); ?>
		<a href="<?php the_permalink(); ?>" rel="bookmark"><?php the_title(); ?></a>
		<?php
		echo '</h2>';
	}

	// Display the meta information, can be changed with filter.
	apply_filters( 'greenlet_post_meta', greenlet_post_meta() );

	greenlet_markup_close();
}

function greenlet_get_file_contents ( $file_path ) {
	ob_start();
	include $file_path;
	$file_contents = ob_get_contents();
	ob_end_clean();
	return $file_contents;
}


/**
 * Renders post meta.
 *
 * @return void
 */
function greenlet_post_meta() {
	greenlet_markup( 'entry-meta', greenlet_attr( 'list-inline entry-meta' ) );

	if ( get_post_type() === 'post' ) {
		// If the post is sticky, mark it.
		if ( is_sticky() ) {
			printf(
				'<li %s><span class="sticky-icon">%s</span> %s </li>',
				wp_kses( greenlet_attr( 'meta-featured-post list-inline-item' ), null ),
				greenlet_get_file_contents( IMAGES_DIR . '/icons/pin-icon.svg' ), // phpcs:ignore
				esc_html__( 'Featured', 'greenlet' )
			);
		}

		// Get the post author.
		printf(
			'<li %1$s><span class="user-icon">%2$s</span><a href="%3$s" rel="author"> %4$s</a></li>',
			wp_kses( greenlet_attr( 'meta-author list-inline-item' ), null ),
			greenlet_get_file_contents( IMAGES_DIR . '/icons/user-icon.svg' ), // phpcs:ignore
			esc_url( get_author_posts_url( get_the_author_meta( 'ID' ) ) ),
			get_the_author()
		);

		// Get the date.
		printf(
			'<li %s><span class="date-icon">%s</span> %s </li>',
			wp_kses( greenlet_attr( 'meta-date list-inline-item' ), null ),
			greenlet_get_file_contents( IMAGES_DIR . '/icons/date-icon.svg' ), // phpcs:ignore
			get_the_date()
		);

		// The categories.
		$category_list = get_the_category_list( ', ' );
		if ( $category_list ) {
			printf(
				'<li %s><span class="folder-icon">%s</span> %s </li>',
				wp_kses( greenlet_attr( 'meta-categories list-inline-item' ), null ),
				greenlet_get_file_contents( IMAGES_DIR . '/icons/folder-icon.svg' ), // phpcs:ignore
				$category_list // phpcs:ignore
			);
		}

		// The tags.
		$tag_list = get_the_tag_list( '', ', ' );
		if ( $tag_list ) {
			printf(
				'<li %s><span class="tag-icon">%s</span> %s </li>',
				wp_kses( greenlet_attr( 'meta-tags list-inline-item' ), null ),
				greenlet_get_file_contents( IMAGES_DIR . '/icons/tag-icon.svg' ), // phpcs:ignore
				$tag_list // phpcs:ignore
			);
		}

		// Comments link.
		if ( comments_open() ) {
			printf(
				'<li %s><span class="comment-icon">%s</span> ',
				wp_kses( greenlet_attr( 'meta-reply list-inline-item' ), null ),
				greenlet_get_file_contents( IMAGES_DIR . '/icons/comment-icon.svg' ) // phpcs:ignore
			);
			comments_popup_link( __( 'Leave a comment', 'greenlet' ), __( 'One comment', 'greenlet' ), __( 'View all % comments', 'greenlet' ) );
			echo '</li>';
		}

		// Edit link.
		if ( is_user_logged_in() && current_user_can( 'edit_posts' ) ) {
			printf( '<li %s><span class="dashicons dashicons-edit"></span> ', wp_kses( greenlet_attr( 'meta-edit list-inline-item' ), null ) );
			edit_post_link( __( 'Edit', 'greenlet' ) );
			echo '</li>';
		}
	}

	greenlet_markup_close();
}


/**
 * Renders post content.
 *
 * @return void
 */
function greenlet_do_entry_content() {

	greenlet_markup( 'entry-content', greenlet_attr( 'entry-content' ) );

	if ( is_single() || is_page() ) {

		the_content();
		apply_filters( 'greenlet_page_break', wp_link_pages() );
	} else {

		global $post;
		$is_more    = strpos( $post->post_content, '<!--more-->' );
		$show_image = of_get_option( 'featured_image' ) ? of_get_option( 'featured_image' ) : 0;
		$more       = apply_filters( 'greenlet_more_text', __( '<span class="more-text">Read More</span>', 'greenlet' ) );

		// If the post has a thumbnail and not password protected, display.
		if ( ( 1 === $show_image ) && has_post_thumbnail() && ! post_password_required() ) {

			greenlet_markup( 'entry-thumbnail', greenlet_attr( 'entry-thumbnail' ) );
			the_post_thumbnail( 'thumbnail' );
			greenlet_markup_close();
		}

		if ( $is_more ) {
			the_content( $more );
		} elseif ( 0 !== greenlet_excerpt_length() ) {
			the_excerpt();
		}
	}

	greenlet_markup_close();
}


/**
 * Renders post footer.
 *
 * @return void
 */
function greenlet_do_entry_footer() {

	$show_author = of_get_option( 'show_author' );

	$name  = null;
	$image = null;
	$bio   = null;

	if ( is_array( $show_author ) && count( $show_author ) > 0 ) {
		$name  = isset( $show_author['name'] ) ? $show_author['name'] : null;
		$image = isset( $show_author['image'] ) ? $show_author['image'] : null;
		$bio   = isset( $show_author['bio'] ) ? $show_author['bio'] : null;
	}

	// If we have a single post.
	if ( is_single() && ( $name || $image || $bio ) ) {

		greenlet_markup( 'entry-footer', greenlet_attr( 'entry-footer' ) );

		if ( $image ) {

			$size = apply_filters( 'greenlet_author_bio_avatar_size', 56 );
			printf(
				'<div %s>%s</div>',
				wp_kses( greenlet_attr( 'author-avatar' ), null ),
				get_avatar( get_the_author_meta( 'user_email' ), $size )
			);
		}

		printf( '<div %s>', wp_kses( greenlet_attr( 'author-description' ), null ) );

		if ( $name ) {

			$author_url = esc_url( get_author_posts_url( get_the_author_meta( 'ID' ) ) );

			$author = sprintf(
				'<span %1$s><a %2$s href="%3$s">%4$s</a></span>',
				greenlet_attr( 'author' ),
				greenlet_attr( 'author-link' ),
				$author_url,
				get_the_author()
			);

			$heading = sprintf( '<h2 %s> %s %s</h2>', greenlet_attr( 'author-heading' ), __( 'Author:', 'greenlet' ), $author );
			echo apply_filters( 'greenlet_author', $heading, $author ); // phpcs:ignore
		}

		if ( $bio && get_the_author_meta( 'description' ) ) {

			$desc = sprintf( '<p %s>%s</p>', greenlet_attr( 'author-bio' ), get_the_author_meta( 'description' ) );
			echo apply_filters( 'greenlet_author_description', $desc ); // phpcs:ignore
		}

		echo '</div>';

		greenlet_markup_close();
	}
}


/**
 * Defines read more button.
 *
 * @return string more button
 */
function greenlet_excerpt_more() {
	global $post;
	$more = apply_filters( 'greenlet_more_text', __( '<span class="more-text">Read More</span>', 'greenlet' ) );
	return '<a class="more-link" href="' . get_permalink( $post->ID ) . '">' . $more . '</a>';
}


/**
 * Defines excerpt words length.
 *
 * @return int length
 */
function greenlet_excerpt_length() {
	$length = of_get_option( 'excerpt_length' ) ? of_get_option( 'excerpt_length' ) : 55;
	$length = apply_filters( 'greenlet_excerpt_length', $length );
	return $length;
}


/**
 * Renders comment template.
 *
 * @return void
 */
function greenlet_comments_template() {
	$show = of_get_option( 'show_comments' ) ? of_get_option( 'show_comments' ) : array( 'posts' => true );
	if ( comments_open() ) {
		if ( ( is_page() && $show['pages'] ) || ( is_single() && $show['posts'] ) ) {
			comments_template();
		}
	}
}


/**
 * Renders pagination navigation.
 *
 * @return void
 */
function greenlet_paging_nav() {

	$format   = of_get_option( 'paging_nav' ) ? of_get_option( 'paging_nav' ) : 'number';
	$pag_attr = greenlet_attr( "pagination {$format}" );

	global $wp_query;
	if ( $wp_query->max_num_pages <= 1 ) {
		return;
	}
	$bignum = 999999999;

	if ( 'number' === $format || 'ajax' === $format ) {

		$pages = paginate_links(
			apply_filters(
				'greenlet_pagination_args',
				array(
					'base'      => str_replace( $bignum, '%#%', esc_url( get_pagenum_link( $bignum ) ) ),
					'format'    => '',
					'current'   => max( 1, get_query_var( 'paged' ) ),
					'total'     => $wp_query->max_num_pages,
					'prev_text' => '&laquo;',
					'next_text' => '&raquo;',
					'type'      => 'array',
					'end_size'  => 3,
					'mid_size'  => 3,
				)
			)
		);
	} elseif ( 'load' === $format ) {
		$pages = array( greenlet_load_link() );
	} elseif ( 'infinite' === $format ) {
		$pages    = array( greenlet_load_link() );
		$pag_attr = greenlet_attr( "pagination load {$format}" );
	} else {
		$pages    = array();
		$pages[] .= get_previous_posts_link( __( '&laquo; Newer Posts', 'greenlet' ) );
		$pages[] .= get_next_posts_link( __( 'Older Posts &raquo;', 'greenlet' ) );
	}

	$op  = sprintf( "<ul %s>\n\t<li>", $pag_attr );
	$op .= join( "</li>\n\t<li>", $pages );
	$op .= "</li>\n</ul>\n";

	echo apply_filters( 'greenlet_paging_nav', $op, $pages, $pag_attr ); // phpcs:ignore
}

/**
 * Ajax Pagination functions.
 *
 * @return void
 */
function greenlet_get_paginated() {
	global $wp_query, $wp_rewrite;
	$options = array(
		'no_posts_message' => 'There are no posts meeting your criteria',
		'no_posts_class'   => '',
	);
	$options = apply_filters( 'greenlet_pagination_options', $options );

	add_filter(
		'post_class',
		function ( $classes ) {
			$classes[] = 'post';
			return $classes;
		}
	);
	add_filter( 'greenlet_pagination_args', 'greenlet_pagination_args' );

	$args    = apply_filters( 'greenlet_pagination_query_args', array() );
	$args_in = json_decode( stripslashes( $_POST['query_vars'] ), true );
	$args    = $args_in;

	$wp_query = new WP_Query( $args ); // phpcs:ignore

	// Here we get max posts to know if current page is not too big.
	if ( $wp_rewrite->using_permalinks() && preg_match( '~/page/([0-9]+)~', $_POST['location'], $mathces ) || preg_match( '~paged?=([0-9]+)~', $_POST['location'], $mathces ) ) {
		$args['paged']          = min( $mathces[1], $wp_query->max_num_pages );
		$args['posts_per_page'] = get_option( 'posts_per_page' );
		$wp_query               = new WP_Query( $args ); // phpcs:ignore
	}

	$response = array();

	ob_start();

	if ( $wp_query->have_posts() ) {

		do_action( 'greenlet_before_while' );

		// Post loop - While there are posts, Display each of them.
		while ( have_posts() ) :
			the_post();

			get_template_part( 'content', get_post_format() );

		endwhile;

		do_action( 'greenlet_after_endwhile' );

		wp_reset_postdata();

		$response['posts'] = ob_get_contents();

	} else {
		get_template_part( 'content', 'none' );

		// phpcs:ignore
		echo apply_filters( 'greenlet_no_posts_message', "<div class='no-posts" . ( ( $options['no_posts_class'] ) ? ' ' . $options['no_posts_class'] : '' ) . "'>" . $options['no_posts_message'] . '</div>' );

		$response['no_posts'] = ob_get_contents();
	}
	ob_end_clean();

	echo wp_json_encode( $response );

	die();
}

/**
 * Retrieve Paginations arguments.
 *
 * @param array $args Pagination Args.
 * @return array
 */
function greenlet_pagination_args( $args = array() ) {
	$args['base'] = str_replace( 999999999, '%#%', greenlet_get_page_link( 999999999 ) );
	return $args;
}

// WordPress' get_pagenum_link.
//
// CONVERT PAGINATION TO CLASS
// BECAUSE IT USES $_POST LOCATION.

/**
 * Retrieve Page link.
 *
 * @param int  $pagenum Page number.
 * @param bool $escape  Whether to escape.
 * @return string       Page link.
 */
function greenlet_get_page_link( $pagenum = 1, $escape = true ) {
	global $wp_rewrite;

	$pagenum = (int) $pagenum;
	$current = array_key_exists( 'location', $_POST ) ? $_POST['location'] : '';
	$request = remove_query_arg( 'paged', preg_replace( '~' . home_url() . '~', '', $current ) );
	$request = remove_query_arg( 'page', preg_replace( '~' . home_url() . '~', '', $current ) );

	$home_root = parse_url( home_url() );
	$home_root = ( isset( $home_root['path'] ) ) ? $home_root['path'] : '';
	$home_root = preg_quote( $home_root, '|' );

	$request = preg_replace( '|^' . $home_root . '|i', '', $request );
	$request = preg_replace( '|^/+|', '', $request );

	if ( ! $wp_rewrite->using_permalinks() ) {
		$base = trailingslashit( home_url() );

		if ( $pagenum > 1 ) {
			$result = add_query_arg( 'paged', $pagenum, $base . $request );
		} else {
			$result = $base . $request;
		}
	} else {
		$qs_regex = '|\?.*?$|';
		preg_match( $qs_regex, $request, $qs_match );

		if ( ! empty( $qs_match[0] ) ) {
			$query_string = $qs_match[0];
			$request      = preg_replace( $qs_regex, '', $request );
		} else {
			$query_string = '';
		}

		$request = preg_replace( "|$wp_rewrite->pagination_base/\d+/?$|", '', $request );
		$request = preg_replace( '|^' . preg_quote( $wp_rewrite->index, '|' ) . '|i', '', $request );
		$request = ltrim( $request, '/' );

		$base = trailingslashit( home_url() );

		if ( $wp_rewrite->using_index_permalinks() && ( $pagenum > 1 || '' !== $request ) ) {
			$base .= $wp_rewrite->index . '/';
		}

		if ( $pagenum > 1 ) {
			$request = ( ( ! empty( $request ) ) ? trailingslashit( $request ) : $request ) . user_trailingslashit( $wp_rewrite->pagination_base . '/' . $pagenum, 'paged' );
		}

		$result = $base . $request . $query_string;
	}

	/**
	* Filter the page number link for the current request.
	*
	* @param string $result The page number link.
	*/
	$result = apply_filters( 'get_pagenum_link', $result );

	if ( $escape ) {
		return esc_url( $result );
	} else {
		return esc_url_raw( $result );
	}
}

/**
 * Return the next posts page link.
 *
 * @param string $label    Content for link text.
 * @param int    $max_page Optional. Max pages.
 * @return string|null     HTML-formatted next posts page link.
 */
function greenlet_load_link( $label = null, $max_page = 0 ) {
	global $paged, $wp_query;

	if ( ! $max_page ) {
		$max_page = $wp_query->max_num_pages;
	}

	if ( ! $paged ) {
		$paged = array_key_exists( 'current', $_POST ) ? $_POST['current'] : 1;
	}

	$nextpage = intval( $paged ) + 1;

	if ( null === $label ) {
		$label = esc_html__( 'Load More', 'greenlet' );
	}

	if ( ! is_single() && ( $nextpage <= $max_page ) ) {
		/**
		 * Filter the anchor tag attributes for the next posts page link.
		 *
		 * @param string $attributes Attributes for the anchor tag.
		 */
		$attr = apply_filters( 'greenlet_next_link_attributes', sprintf( 'class="load" data-next="%s"', $nextpage ) );

		return '<a href="' . esc_url( greenlet_get_load_page_link( $max_page ) ) . "\" $attr>" . preg_replace( '/&([^#])(?![a-z]{1,8};)/i', '&#038;$1', $label ) . '</a>';
	}
}

/**
 * Retrieve next posts page link.
 *
 * @param int $max_page Optional. Max pages.
 * @return string The link URL for next posts page.
 */
function greenlet_get_load_page_link( $max_page = 0 ) {
	global $paged;

	if ( ! is_single() ) {
		if ( ! $paged ) {
			$paged = array_key_exists( 'current', $_POST ) ? $_POST['current'] : 1;
		}
		$nextpage = intval( $paged ) + 1;
		if ( ! $max_page || $max_page >= $nextpage ) {
			return greenlet_get_page_link( $nextpage );
		}
	}
}
