<?php
/**
 * Theme Setup functions.
 *
 * @package greenlet\library\common
 */

use Greenlet\Columns as GreenletColumns;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! function_exists( 'greenlet_setup' ) ) {
	/**
	 * Loads text domain, Adds theme support, menu etc.
	 *
	 * @since 1.0.0
	 *
	 * @see wp-includes/theme.php.
	 */
	function greenlet_setup() {
		// Make the theme available for translation.
		load_theme_textdomain( 'greenlet', LANGUAGES_DIR );

		// Switch to html5 support.
		add_theme_support( 'html5', array( 'comment-list', 'comment-form', 'search-form', 'gallery', 'caption' ) );

		// Let WordPress manage the document title.
		add_theme_support( 'title-tag' );

		$logo_defaults = array(
			'height'      => 28,
			'width'       => 300,
			'flex-height' => true,
			'flex-width'  => true,
		);

		add_theme_support( 'custom-logo', $logo_defaults );

		// Add support for automatic feed links.
		add_theme_support( 'automatic-feed-links' );

		// Add support for post thumbnails.
		add_theme_support( 'post-thumbnails' );

		// Register nav menus.
		register_nav_menus(
			array(
				'main-menu'      => __( 'Main Menu', 'greenlet' ),
				'secondary-menu' => __( 'Secondary Menu', 'greenlet' ),
				'footer-menu'    => __( 'Footer Menu', 'greenlet' ),
			)
		);

		// Add visual editor style.
		add_editor_style( get_stylesheet_uri() );

		// Add support for woocommerce.
		add_theme_support( 'woocommerce' );
	}

	add_action( 'after_setup_theme', 'greenlet_setup' );
}


if ( ! function_exists( 'greenlet_widget_init' ) ) {
	/**
	 * Registers widget areas.
	 *
	 * Registers number of content sidebars based on the options set.
	 * Registers header and footer sidebars if widgets are source for them.
	 *
	 * @since 1.0.0
	 *
	 * @see wp-includes/widgets.php.
	 */
	function greenlet_widget_init() {
		if ( function_exists( 'register_sidebar' ) ) {
			// Get number of sidebars from saved options, else set to 3.
			$sidebars_qty = gl_get_option( 'sidebars_qty', 3 );

			// Register number of sidebars.
			for ( $i = 1; $i <= $sidebars_qty; $i++ ) {
				register_sidebar(
					array(
						// translators: %s: Index of the sidebar.
						'name'          => sprintf( __( 'Sidebar %s', 'greenlet' ), $i ),
						'id'            => 'sidebar-' . $i,
						// translators: %s: Index of the sidebar.
						'description'   => sprintf( __( 'Appears on the posts and pages as sidebar %s.', 'greenlet' ), $i ),
						'before_widget' => '<div id="%1$s" class="widget %2$s">',
						'after_widget'  => '</div><!-- end widget -->',
						'before_title'  => '<h5 class="widget-title">',
						'after_title'   => '</h5>',
					)
				);
			}

			// Crate position array to loop through.
			$position = array( 'topbar', 'header', 'semifooter', 'footer' );

			// For each positions in the array.
			foreach ( $position as $pos ) {

				// If the content source set in options is widgets.
				if ( gl_get_option( $pos . '_content_source', 'manual' ) === 'widgets' ) {

					// Get position template option.
					$layout_option = $pos . '_template';
					$layout        = gl_get_option( $layout_option, top_bottom_default_columns( $pos ) );

					// Create new column object.
					$cobj = new GreenletColumns( $layout );

					// For total number of columns register sidebars.
					for ( $i = 1; $i <= ( $cobj->total ); $i++ ) {
						register_sidebar(
							array(
								// translators: %1$s: Widget Position. %2$s: Widget Column.
								'name'          => sprintf( __( '%1$s Widget Area %2$s', 'greenlet' ), ucfirst( $pos ), $i ),
								'id'            => $pos . '-sidebar-' . $i,
								// translators: %1$s: Widget Position. %2$s: Widget Column.
								'description'   => sprintf( __( 'Appears on the %1$s as column %2$s.', 'greenlet' ), $pos, $i ),
								'before_widget' => '<div id="%1$s" class="widget %2$s">',
								'after_widget'  => '</div> <!-- end widget -->',
								'before_title'  => '<h5 class="widget-title">',
								'after_title'   => '</h5>',
							)
						);
					}
				}
			}
		}
	}

	add_action( 'widgets_init', 'greenlet_widget_init' );
}


if ( ! function_exists( 'set_content_width' ) ) {
	/**
	 * Set Content Width.
	 *
	 * @since 1.0.0
	 */
	function set_content_width() {
		global $content_width;

		if ( ! isset( $content_width ) ) {
			$content_width = apply_filters( 'greenlet_content_width', 1170 );
		}
	}

	add_action( 'wp', 'set_content_width' );
}


if ( version_compare( $GLOBALS['wp_version'], '4.1', '<' ) ) {
	/**
	 * Filters wp_title to print a neat <title> tag based on what is being viewed.
	 *
	 * @since  1.0.0
	 * @param  string $title Default title text for current view.
	 * @param  string $sep   Optional separator.
	 * @return string        The filtered title.
	 */
	function greenlet_wp_title( $title, $sep ) {
		if ( is_feed() ) {
			return $title;
		}

		global $page, $paged;

		// Add the blog name.
		$title .= get_bloginfo( 'name', 'display' );

		// Add the blog description for the home/front page.
		$site_description = get_bloginfo( 'description', 'display' );
		if ( $site_description && ( is_home() || is_front_page() ) ) {
			$title .= " $sep $site_description";
		}

		// Add a page number if necessary.
		if ( ( $paged >= 2 || $page >= 2 ) && ! is_404() ) {
			// translators: %s: Page number.
			$title .= " $sep " . sprintf( esc_html__( 'Page %s', 'greenlet' ), max( $paged, $page ) );
		}

		return $title;
	}

	add_filter( 'wp_title', 'greenlet_wp_title', 10, 2 );
}
