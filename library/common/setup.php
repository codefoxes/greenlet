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
		load_theme_textdomain( 'greenlet', GREENLET_LANGUAGE_DIR );

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

		// Add support for Wide and full width blocks.
		add_theme_support( 'align-wide' );

		// Register nav menus.
		register_nav_menus( array( 'main-menu' => __( 'Main Menu', 'greenlet' ) ) );

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
						'before_title'  => '<h3 class="widget-title">',
						'after_title'   => '</h3>',
					)
				);
			}

			// Create position array to loop through.
			$position = array( 'header', 'footer' );

			// For each cover positions.
			foreach ( $position as $pos ) {
				// Get position layout option.
				$cover_rows = gl_get_option( $pos . '_layout', greenlet_cover_layout_defaults( $pos ) );

				$k = 1;
				// For each row in the cover position.
				foreach ( $cover_rows as $row ) {
					$cobj = new GreenletColumns( $row['columns'] );

					// For total number of columns register sidebars.
					for ( $i = 1; $i <= ( $cobj->total ); $i++ ) {
						register_sidebar(
							array(
								// translators: %1$s: Widget Position. %2$s: Widget Column.
								'name'          => sprintf( __( '%1$s %2$s - Column %3$s', 'greenlet' ), ucfirst( $pos ), $k, $i ),
								'id'            => "{$pos}-sidebar-{$k}-{$i}",
								// translators: %1$s: Widget Position. %2$s: Widget Column.
								'description'   => sprintf( __( 'Appears on the %1$s %2$s at column %3$s.', 'greenlet' ), $pos, $k, $i ),
								'before_widget' => '<div id="%1$s" class="widget %2$s">',
								'after_widget'  => '</div> <!-- end widget -->',
								'before_title'  => '<h3 class="widget-title">',
								'after_title'   => '</h3>',
							)
						);
					}
					$k++;
				}
			}
		}
	}

	add_action( 'widgets_init', 'greenlet_widget_init' );
}

if ( ! function_exists( 'greenlet_register_meta' ) ) {
	/**
	 * Register Layout meta fields.
	 *
	 * @since 2.0.0
	 */
	function greenlet_register_meta() {
		register_post_meta(
			'',
			'greenlet_layout',
			array(
				'show_in_rest' => array(
					'schema' => array(
						'type'       => 'object',
						'properties' => array(
							'template' => array( 'type' => 'string' ),
							'sequence' => array(
								'type'  => 'array',
								'items' => array( 'type' => 'string' ),
							),
						),
					),
				),
				'single'       => true,
				'type'         => 'object',
			)
		);
	}

	add_action( 'init', 'greenlet_register_meta' );
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
