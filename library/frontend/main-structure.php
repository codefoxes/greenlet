<?php
/**
 * Page structure.
 *
 * @package greenlet\library\frontend
 */

use Greenlet\Columns as GreenletColumns;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_action( 'pre_get_posts', 'greenlet_set_query' );
add_action( 'greenlet_main_container', 'greenlet_do_main_container' );
add_action( 'greenlet_before_loop', 'greenlet_breadcrumb', 2 );
add_action( 'greenlet_before_loop', 'greenlet_archive_header_template' );
add_action( 'greenlet_archive_header', 'greenlet_do_archive_header' );
add_action( 'greenlet_loop', 'greenlet_meta_icons' );
add_action( 'greenlet_loop', 'greenlet_do_loop' );
add_action( 'greenlet_entry_header', 'greenlet_do_entry_header' );
add_action( 'greenlet_entry_content', 'greenlet_do_entry_content' );
add_action( 'greenlet_entry_footer', 'greenlet_do_entry_footer' );
add_action( 'greenlet_after_entry', 'greenlet_comments_template' );
add_action( 'greenlet_post_meta', 'greenlet_post_meta' );
add_action( 'greenlet_before_while', 'greenlet_posts_open' );
add_action( 'greenlet_after_endwhile', 'greenlet_posts_close' );
add_action( 'greenlet_after_endwhile', 'greenlet_paging_nav' );

add_filter( 'excerpt_more', 'greenlet_excerpt_more' );
add_filter( 'excerpt_length', 'greenlet_excerpt_length', 999 );
add_filter( 'get_search_form', 'greenlet_search_form' );

/**
 * Set main query.
 *
 * @since 2.1.0
 * @param WP_Query $query The WP_Query instance.
 */
function greenlet_set_query( $query ) {
	if ( $query->is_main_query() && ! is_admin() ) {
		$count = gl_get_option( 'posts_count', 10 );
		$query->set( 'posts_per_page', strval( $count ) );
	}
}

/**
 * Renders main container.
 *
 * @since  1.0.0
 * @return void
 */
function greenlet_do_main_container() {
	do_action( 'greenlet_before_left_sidebar' );

	// Instantiate Greenlet\Columns class to get column widths.
	$cobj = new GreenletColumns();

	if ( $cobj->sequence ) {
		foreach ( $cobj->sequence as $pos => $column ) {
			$cols_array = $cobj->cols_array();
			$width      = isset( $cols_array[ $pos ] ) ? $cols_array[ $pos ] : null;

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
 * @since  1.0.0
 * @return void
 */
function greenlet_breadcrumb() {

	if ( ! is_front_page() && ( false !== gl_get_option( 'breadcrumb', '1' ) ) ) {
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
			get_template_part( 'templates/breadcrumb' );
		}

		do_action( 'greenlet_after_breadcrumb' );
	}
}

/**
 * Renders archive header.
 *
 * @since  1.0.0
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
 * @since  1.0.0
 * @return void
 */
function greenlet_do_archive_header() {

	switch ( true ) {
		case is_author():
			$archive_title = apply_filters( 'greenlet_author_archive_title', ucfirst( get_the_author() ) . __( ' Archives', 'greenlet' ) );

			// If the author bio exists, display it.
			if ( get_the_author_meta( 'description' ) ) {
				$archive_description = '<p>' . get_the_author_meta( 'description' ) . '</p>';
			}
			break;
		case is_category():
			$archive_title = apply_filters( 'greenlet_category_archive_title', single_cat_title( '', false ) . __( ' Archives', 'greenlet' ) );

			// Show an optional category description.
			if ( category_description() ) {
				$archive_description = category_description();
			}
			break;
		case is_tag():
			$archive_title = apply_filters( 'greenlet_tag_archive_title', single_tag_title( '', false ) . __( ' Archives', 'greenlet' ) );

			// Show an optional tag description.
			if ( tag_description() ) {
				$archive_description = '<p>' . tag_description() . '</p>';
			}
			break;
		case is_day():
			$archive_title = apply_filters( 'greenlet_daily_archive_title', get_the_date() . __( ' Archives', 'greenlet' ) );
			break;
		case is_month():
			$archive_title = apply_filters( 'greenlet_monthly_archive_title', get_the_date( _x( 'F Y', 'Monthly archives date format', 'greenlet' ) ) . __( ' Archives', 'greenlet' ) );
			break;
		case is_year():
			$archive_title = apply_filters( 'greenlet_yearly_archive_title', get_the_date( _x( 'Y', 'Yearly archives date format', 'greenlet' ) ) . __( ' Archives', 'greenlet' ) );
			break;
	}

	if ( isset( $archive_title ) ) {
		printf( '<h1 %s>', wp_kses( greenlet_attr( 'archive-title' ), null ) );
		echo esc_html( $archive_title );
		echo '</h1>';
	}
	if ( isset( $archive_description ) ) {
		echo wp_kses_post( $archive_description );
	}
}

/**
 * Single post class for grid.
 *
 * @since 2.1.0
 * @return string Post class.
 */
function greenlet_post_class() {
	global $wp_query;
	$query = $wp_query;

	if ( null === $query->query ) {
		global $page_query;
		$query = $page_query;
	}

	$loop_index = $query->current_post;
	$columns    = gl_get_option( 'posts_columns', 3 );

	if ( 0 === ( $loop_index % $columns ) || 1 === $columns ) {
		return 'first';
	}

	if ( 0 === ( $loop_index + 1 ) % $columns ) {
		return 'last';
	}

	return '';
}

/**
 * Renders main post loop.
 *
 * @since  1.0.0
 * @return void
 */
function greenlet_do_loop() {
	// If there are posts, run the post loop.
	if ( have_posts() ) :
		greenlet_run_loop();
	else :
		get_template_part( 'content', 'none' );
	endif;
}

/**
 * Run loop on WP Query.
 *
 * @since 2.1.0
 * @param mixed $query WP_Query instance.
 */
function greenlet_run_loop( $query = null ) {
	if ( null === $query ) {
		global $wp_query;
		$query = $wp_query;
	}
	$layout = gl_get_option( 'post_list_layout', 'list' );
	do_action( 'greenlet_before_while' );

	// Post loop - While there are posts, Display each of them.
	while ( $query->have_posts() ) :
		$query->the_post();
		if ( 'grid' === $layout ) {
			add_filter( 'greenlet_post_class', 'greenlet_post_class' );
		}
		get_template_part( 'content', get_post_format() );
	endwhile;

	do_action( 'greenlet_after_endwhile', $query );
}

/**
 * Renders post header.
 *
 * @since  1.0.0
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
		printf( '<h2 %s>', wp_kses( greenlet_attr( 'entry-title' ), null ) );
		$title = get_the_title();

		if ( empty( $title ) ) {
			?>
			<a href="<?php the_permalink(); ?>" rel="bookmark"><?php echo get_the_date(); ?></a>
			<?php
		} else {
			?>
			<a href="<?php the_permalink(); ?>" rel="bookmark"><?php the_title(); ?></a>
			<?php
		}
		echo '</h2>';
	}

	$show_meta = gl_get_option( 'show_meta', array( 'sticky', 'author', 'date', 'cats', 'tags', 'reply' ) );
	do_action( 'greenlet_post_meta', $show_meta );

	greenlet_markup_close();
}

/**
 * Meta icons definition holder.
 *
 * @since 2.1.0
 */
function greenlet_meta_icons() {
	$show_meta = gl_get_option( 'show_meta', array( 'sticky', 'author', 'date', 'cats', 'tags', 'reply' ) );
	if ( empty( $show_meta ) ) {
		return;
	}

	$svg_tags = array(
		'svg'   => array(
			'class'           => true,
			'aria-hidden'     => true,
			'aria-labelledby' => true,
			'role'            => true,
			'xmlns'           => true,
			'width'           => true,
			'height'          => true,
			'viewbox'         => true,
		),
		'defs'  => true,
		'g'     => array(
			'id'   => true,
			'fill' => true,
		),
		'title' => array( 'title' => true ),
		'path'  => array(
			'd'    => true,
			'fill' => true,
		),
		'rect'  => array(
			'x'      => true,
			'y'      => true,
			'width'  => true,
			'height' => true,
			'rx'     => true,
		),
	);

	echo '<div class="meta-icons">';
	echo wp_kses( greenlet_get_file_contents( GREENLET_IMAGE_DIR . '/icons/icon-defs.svg' ), $svg_tags );
	echo '</div>';
}

/**
 * Renders post meta.
 *
 * @since  1.0.0
 * @param  array $show_meta Meta info display details.
 * @return void
 */
function greenlet_post_meta( $show_meta ) {
	greenlet_markup( 'entry-meta', greenlet_attr( 'list-inline entry-meta' ) );

	$term_list_tags = array(
		'a' => array(
			'href' => true,
			'rel'  => true,
		),
	);

	if ( get_post_type() === 'post' ) {
		// If the post is sticky, mark it.
		if ( is_sticky() && in_array( 'sticky', $show_meta, true ) ) {
			printf(
				'<li %s><span class="meta-icon sticky-icon"><svg><use xlink:href="#gl-path-%s" /></svg></span> %s </li>',
				wp_kses( greenlet_attr( 'meta-featured-post list-inline-item' ), null ),
				'pin',
				esc_html__( 'Featured', 'greenlet' )
			);
		}

		// Get the post author.
		if ( in_array( 'author', $show_meta, true ) ) {
			printf(
				'<li %s><span class="meta-icon user-icon"><svg><use xlink:href="#gl-path-%s" /></svg></span><a href="%s" rel="author"> %s</a></li>',
				wp_kses( greenlet_attr( 'meta-author list-inline-item' ), null ),
				'user',
				esc_url( get_author_posts_url( get_the_author_meta( 'ID' ) ) ),
				get_the_author()
			);
		}

		// Get the date.
		if ( in_array( 'date', $show_meta, true ) ) {
			printf(
				'<li %s><span class="meta-icon date-icon"><svg><use xlink:href="#gl-path-%s" /></svg></span> %s </li>',
				wp_kses( greenlet_attr( 'meta-date list-inline-item' ), null ),
				'date',
				get_the_date()
			);
		}

		// Get the date.
		if ( in_array( 'mod', $show_meta, true ) ) {
			printf(
				'<li %s><span class="meta-icon clock-icon"><svg><use xlink:href="#gl-path-%s" /></svg></span> %s </li>',
				wp_kses( greenlet_attr( 'meta-modified list-inline-item' ), null ),
				'clock',
				get_the_modified_date() // phpcs:ignore
			);
		}

		// The categories.
		$category_list = get_the_category_list( ', ' );
		if ( $category_list && in_array( 'cats', $show_meta, true ) ) {
			printf(
				'<li %s><span class="meta-icon folder-icon"><svg><use xlink:href="#gl-path-%s" /></svg></span> %s </li>',
				wp_kses( greenlet_attr( 'meta-categories list-inline-item' ), null ),
				'folder',
				wp_kses( $category_list, $term_list_tags )
			);
		}

		// The tags.
		$tag_list = get_the_tag_list( '', ', ' );
		if ( $tag_list && in_array( 'tags', $show_meta, true ) ) {
			printf(
				'<li %s><span class="meta-icon tag-icon"><svg><use xlink:href="#gl-path-%s" /></svg></span> %s </li>',
				wp_kses( greenlet_attr( 'meta-tags list-inline-item' ), null ),
				'tag',
				wp_kses( $tag_list, $term_list_tags )
			);
		}

		// Comments link.
		if ( comments_open() && in_array( 'reply', $show_meta, true ) ) {
			printf(
				'<li %s><span class="meta-icon comment-icon"><svg><use xlink:href="#gl-path-%s" /></svg></span> ',
				wp_kses( greenlet_attr( 'meta-reply list-inline-item' ), null ),
				'comment'
			);
			comments_popup_link( __( 'Leave a comment', 'greenlet' ), __( 'One comment', 'greenlet' ), __( 'View all % comments', 'greenlet' ) );
			echo '</li>';
		}

		// Edit link.
		if ( is_user_logged_in() && current_user_can( 'edit_posts' ) && ! is_customize_preview() ) {
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
 * @since  1.0.0
 * @return void
 */
function greenlet_do_entry_content() {

	greenlet_markup( 'entry-content', greenlet_attr( 'entry-content clearfix' ) );

	if ( is_single() || is_page() ) {

		if ( has_post_thumbnail() ) {
			greenlet_markup( 'featured-image', greenlet_attr( 'featured-image' ) );
			the_post_thumbnail();
			greenlet_markup_close();
		}

		the_content();
		apply_filters( 'greenlet_page_break', wp_link_pages() );
	} else {

		$excerpt_type = gl_get_option( 'excerpt_type', 'excerpt' );
		$show_image   = gl_get_option( 'featured_image', '1' );

		global $post;
		$is_more = strpos( $post->post_content, '<!--more-->' );
		$more    = '<span class="more-text">' . gl_get_option( 'read_more', __( 'continue reading', 'greenlet' ) ) . '</span>';

		// If the post has a thumbnail and not password protected, display.
		if ( ( false !== $show_image ) && has_post_thumbnail() && ! post_password_required() ) {

			greenlet_markup( 'entry-thumbnail', greenlet_attr( 'entry-thumbnail' ) );
			echo '<a href="' . esc_url( get_permalink() ) . '" title="' . esc_html( get_the_title() ) . '">';
			the_post_thumbnail( 'medium' );
			echo '</a>';
			greenlet_markup_close();
		}

		if ( 'full' === $excerpt_type ) {
			the_content();
		} elseif ( $is_more ) {
			the_content( $more );
		} elseif ( 0 !== greenlet_excerpt_length( 55 ) ) {
			the_excerpt();
		}
	}

	greenlet_markup_close();
}

/**
 * Renders post footer.
 *
 * @since  1.0.0
 * @return void
 */
function greenlet_do_entry_footer() {

	$show_author = gl_get_option( 'show_author', array( 'name', 'image', 'bio' ) );

	$name  = null;
	$image = null;
	$bio   = null;

	if ( is_array( $show_author ) && count( $show_author ) > 0 ) {
		$name  = in_array( 'name', $show_author, true ) ? true : false;
		$image = in_array( 'image', $show_author, true ) ? true : false;
		$bio   = in_array( 'bio', $show_author, true ) ? true : false;
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
 * @since  1.0.0
 * @param  string $more More button html.
 * @return string       Filtered More button html
 */
function greenlet_excerpt_more( $more ) {
	if ( is_admin() ) {
		return $more;
	}

	global $post;
	$more = '<span class="more-text">' . gl_get_option( 'read_more', __( 'continue reading', 'greenlet' ) ) . '</span>';
	return apply_filters( 'greenlet_more_link', '<a class="more-link" href="' . esc_url( get_permalink( $post->ID ) ) . '">' . $more . '</a>' );
}

/**
 * Defines excerpt words length.
 *
 * @since  1.0.0
 * @param  int $length Excerpt Length.
 * @return int length
 */
function greenlet_excerpt_length( $length ) {
	if ( is_admin() ) {
		return $length;
	}

	$length = gl_get_option( 'excerpt_length', 55 );
	$length = apply_filters( 'greenlet_excerpt_length', $length );
	return $length;
}

/**
 * Post list open tag.
 *
 * @since 2.1.0
 */
function greenlet_posts_open() {
	if ( ! is_single() && ! is_page() ) {
		$layout  = gl_get_option( 'post_list_layout', 'list' );
		$columns = gl_get_option( 'posts_columns', 3 );

		$class_names = 'posts-list ' . $layout . ( ( 'grid' === $layout ) ? ' cols-' . $columns : '' );
		greenlet_markup( 'posts-list', greenlet_attr( apply_filters( 'greenlet_post_list_classes', $class_names ) ) );
	}
}

/**
 * Post list close tag.
 *
 * @since 2.1.0
 */
function greenlet_posts_close() {
	if ( ! is_single() && ! is_page() ) {
		greenlet_markup_close();
	}
}

/**
 * Renders comment template.
 *
 * @since  1.0.0
 * @return void
 */
function greenlet_comments_template() {
	$show = gl_get_option( 'show_comments', array( 'posts' ) );
	if ( comments_open() ) {
		if ( ( is_page() && in_array( 'pages', $show, true ) ) || ( is_single() && in_array( 'posts', $show, true ) ) ) {
			comments_template();
		}
	}
}

/**
 * Renders pagination navigation.
 *
 * @since  1.0.0
 * @param  object $query WP_Query Object.
 * @return void
 */
function greenlet_paging_nav( $query = null ) {

	$format   = gl_get_option( 'paging_nav', 'number' );
	$pag_attr = greenlet_attr( "pagination {$format}" );

	if ( empty( $query ) ) {
		global $wp_query;
		$query = $wp_query;
	}

	if ( $query->max_num_pages <= 1 ) {
		return;
	}
	$big_num = 999999999;

	$paged = 1;
	if ( property_exists( $query, 'query_vars' ) && array_key_exists( 'paged', $query->query_vars ) ) {
		$paged = $query->query_vars['paged'];
	}

	$current_page = max( 1, $paged );

	if ( 'number' === $format || 'ajax' === $format ) {

		$pages = paginate_links(
			apply_filters(
				'greenlet_pagination_args',
				array(
					'base'      => str_replace( $big_num, '%#%', esc_url( get_pagenum_link( $big_num ) ) ),
					'format'    => '',
					'current'   => $current_page,
					'total'     => $query->max_num_pages,
					'prev_text' => '&laquo;',
					'next_text' => '&raquo;',
					'type'      => 'array',
					'end_size'  => 3,
					'mid_size'  => 3,
				)
			)
		);
	} elseif ( 'load' === $format ) {
		$pages = array( greenlet_load_link( $current_page, $query ) );
	} elseif ( 'infinite' === $format ) {
		$pages    = array( greenlet_load_link( $current_page, $query ) );
		$pag_attr = greenlet_attr( "pagination load {$format}" );
	} else {
		$pages    = array();
		$pages[] .= get_previous_posts_link( __( '&laquo; Newer Posts', 'greenlet' ) );
		$pages[] .= get_next_posts_link( __( 'Older Posts &raquo;', 'greenlet' ) );
	}

	$op  = sprintf( "<ul %s>\n\t<li>", $pag_attr );
	$op .= join( "</li>\n\t<li>", $pages );
	$op .= "</li>\n";
	$op .= '<input type="hidden" id="greenlet_generic_nonce" value="' . wp_create_nonce( 'greenlet_generic' ) . '" />';
	$op .= "</ul>\n";

	$pagination_tags = array(
		'ul'    => array(
			'class' => true,
			'id'    => true,
		),
		'li'    => array(
			'class' => true,
			'id'    => true,
		),
		'a'     => array(
			'class'     => true,
			'id'        => true,
			'href'      => true,
			'data-next' => true,
		),
		'span'  => array(
			'class' => true,
			'id'    => true,
		),
		'input' => array(
			'class' => true,
			'id'    => true,
			'type'  => true,
			'value' => true,
		),
	);

	echo wp_kses( apply_filters( 'greenlet_paging_nav', $op, $pages, $pag_attr ), $pagination_tags );
}

/**
 * Add post classes.
 *
 * @since 1.2.5
 * @param array $classes Classes Array.
 * @return array         Classes Array with added class.
 */
function greenlet_add_post_classes( $classes ) {
	$classes[] = 'post';
	return $classes;
}

/**
 * Ajax Pagination functions.
 *
 * @since  1.0.0
 * @return void
 */
function greenlet_get_paginated() {
	if ( ! isset( $_POST['nonce'] ) || ! isset( $_POST['action'] ) || ! isset( $_POST['query_vars'] ) ) {
		return;
	}

	if ( ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['nonce'] ) ), 'greenlet_generic' ) ) {
		return;
	}

	global $wp_rewrite, $current_location;
	$current_location = array_key_exists( 'location', $_POST ) ? esc_url_raw( wp_unslash( $_POST['location'] ) ) : '';

	$options = array(
		'no_posts_message' => esc_html__( 'There are no posts meeting your criteria', 'greenlet' ),
		'no_posts_class'   => '',
	);
	$options = apply_filters( 'greenlet_pagination_options', $options );

	add_filter( 'post_class', 'greenlet_add_post_classes' );
	add_filter( 'greenlet_pagination_args', 'greenlet_pagination_args' );

	$args = wp_unslash( json_decode( sanitize_textarea_field( wp_unslash( $_POST['query_vars'] ) ), true ) );

	$args['post_status'] = 'publish';

	$location = ''; // Placeholder.
	if ( isset( $_POST['location'] ) ) {
		$location = sanitize_text_field( wp_unslash( $_POST['location'] ) );
	}

	global $page_query;
	$page_query = new WP_Query( $args );

	// Here we get max posts to know if current page is not too big.
	if ( $wp_rewrite->using_permalinks() && preg_match( '~/page/([0-9]+)~', $location, $matches ) || preg_match( '~paged?=([0-9]+)~', $location, $matches ) ) {
		$args['paged']          = min( $matches[1], $page_query->max_num_pages );
		$args['posts_per_page'] = get_option( 'posts_per_page' );

		$args       = apply_filters( 'greenlet_pagination_query_args', $args );
		$page_query = new WP_Query( $args );
	}

	$response = array();

	ob_start();

	if ( $page_query->have_posts() ) {

		greenlet_run_loop( $page_query );

		wp_reset_postdata();

		$response['posts'] = ob_get_contents();

	} else {
		get_template_part( 'content', 'none' );

		echo apply_filters( 'greenlet_no_posts_message', "<div class='no-posts" . ( ( $options['no_posts_class'] ) ? ' ' . $options['no_posts_class'] : '' ) . "'>" . $options['no_posts_message'] . '</div>' ); // phpcs:ignore

		$response['no_posts'] = ob_get_contents();
	}
	ob_end_clean();

	echo wp_json_encode( $response );

	die();
}

/**
 * Retrieve Paginations arguments.
 *
 * @since  1.0.0
 * @param  array $args Pagination Args.
 * @return array
 */
function greenlet_pagination_args( $args = array() ) {
	$args['base'] = str_replace( 999999999, '%#%', greenlet_get_page_link( 999999999 ) );
	return $args;
}

/**
 * Retrieve Page link.
 *
 * Fork of WordPress' get_pagenum_link.
 * CONVERT PAGINATION TO CLASS.
 * BECAUSE IT USES $_POST LOCATION?
 *
 * @see wp-includes/link-template.php
 *
 * @since  1.0.0
 * @param  int  $pagenum Page number.
 * @param  bool $escape  Whether to escape.
 * @return string        Page link.
 */
function greenlet_get_page_link( $pagenum = 1, $escape = true ) {
	global $wp_rewrite, $current_location;

	if ( empty( $current_location ) ) {
		$current_location = '';
	}

	$pagenum = (int) $pagenum;
	$request = remove_query_arg( 'paged', preg_replace( '~' . home_url() . '~', '', $current_location ) );
	$request = remove_query_arg( 'page', preg_replace( '~' . home_url() . '~', '', $current_location ) );

	$home_root = wp_parse_url( home_url() );
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
 * @since  1.0.0
 * @param  int    $current_page Current Page Index.
 * @param  object $query        WP_Query.
 * @param  string $label        Content for link text.
 * @param  int    $max_page     Optional. Max pages.
 * @return string|null          HTML-formatted next posts page link.
 */
function greenlet_load_link( $current_page, $query = null, $label = null, $max_page = 0 ) {
	if ( empty( $query ) ) {
		global $wp_query;
		$query = $wp_query;
	}

	if ( ! $max_page ) {
		$max_page = $query->max_num_pages;
	}

	$next_page = intval( $current_page ) + 1;

	if ( null === $label ) {
		$label = esc_html__( 'Load More', 'greenlet' );
	}

	if ( ! is_single() && ( $next_page <= $max_page ) ) {
		/**
		 * Filter the anchor tag attributes for the next posts page link.
		 *
		 * @param string $attributes Attributes for the anchor tag.
		 */
		$attr = apply_filters( 'greenlet_next_link_attributes', sprintf( 'class="load" data-next="%s"', $next_page ) );

		return '<a href="' . esc_url( greenlet_get_load_page_link( $next_page, $max_page ) ) . "\" $attr>" . preg_replace( '/&([^#])(?![a-z]{1,8};)/i', '&#038;$1', $label ) . '</a>';
	}

	return '';
}

/**
 * Retrieve next posts page link.
 *
 * @since  1.0.0
 * @param  int $next_page Next Page index.
 * @param  int $max_page  Optional. Max pages.
 * @return string         The link URL for next posts page.
 */
function greenlet_get_load_page_link( $next_page, $max_page = 0 ) {
	if ( ! is_single() ) {
		if ( ! $max_page || $max_page >= $next_page ) {
			return greenlet_get_page_link( $next_page );
		}
	}
}

/**
 * Get search form.
 *
 * @since  1.0.0
 * @return string Search form HTML.
 */
function greenlet_search_form() {
	$html = '<form role="search" method="get" class="search-form" action="' . esc_url( home_url( '/' ) ) . '">
		<label>
			<span class="screen-reader-text">' . __( 'Search for:', 'greenlet' ) . '</span>
			<input type="search" class="search-field search-input" placeholder="' . esc_attr__( 'Search &hellip;', 'greenlet' ) . '" value="' . get_search_query() . '" name="s" aria-label="' . esc_attr__( 'Search', 'greenlet' ) . '">
		</label>
		<input type="submit" class="search-submit" value="' . esc_attr__( 'Search', 'greenlet' ) . '">
	</form>';

	return $html;
}
