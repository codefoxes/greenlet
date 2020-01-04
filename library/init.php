<?php
/**
 * Load Greenlet.
 *
 * Load framework constants, files, functions.
 *
 * @package greenlet\library
 */

// Run greenlet_pre action hook.
do_action( 'greenlet_pre' );


// Define content width.
if ( ! isset( $content_width ) ) {
	$content_width = 800;
}


if ( ! function_exists( 'greenlet_constants' ) ) {
	/**
	 * Defines the Greenlet Theme constants.
	 *
	 * @since 1.0.0
	 */
	function greenlet_constants() {

		// Define constants for parent theme directories.
		define( 'PARENT_DIR', get_template_directory() );
		define( 'IMAGES_DIR', PARENT_DIR . '/images' );
		define( 'TEMPLATES_DIR', PARENT_DIR . '/templates' );
		define( 'LIBRARY_DIR', PARENT_DIR . '/library' );
		define( 'LANGUAGES_DIR', LIBRARY_DIR . '/languages' );
		define( 'OPTIONS_DIR', LIBRARY_DIR . '/options' );
		define( 'ADMIN_DIR', LIBRARY_DIR . '/admin' );

		// Define constants for child directories.
		define( 'CHILD_DIR', get_stylesheet_directory() );
		define( 'CHILD_IMAGES_DIR', CHILD_DIR . '/images' );
		define( 'CHILD_TEMPLATES_DIR', CHILD_DIR . '/templates' );
		define( 'CHILD_LIBRARY_DIR', CHILD_DIR . '/library' );
		define( 'CHILD_LANGUAGES_DIR', CHILD_LIBRARY_DIR . '/languages' );
		define( 'CHILD_OPTIONS_DIR', CHILD_LIBRARY_DIR . '/options' );
		define( 'CHILD_ADMIN_DIR', CHILD_LIBRARY_DIR . '/admin' );

		// Define constants for parent theme URLs.
		define( 'PARENT_URL', get_template_directory_uri() );
		define( 'LIBRARY_URL', PARENT_URL . '/library' );
		define( 'IMAGES_URL', PARENT_URL . '/images' );
		define( 'STYLES_URL', LIBRARY_URL . '/css' );
		define( 'SCRIPTS_URL', LIBRARY_URL . '/js' );
		define( 'ADMIN_URL', LIBRARY_URL . '/admin' );

		// Define constants for child theme URLs.
		define( 'CHILD_URL', get_stylesheet_directory_uri() );
		define( 'CHILD_LIBRARY_URL', CHILD_URL . '/library' );
		define( 'CHILD_IMAGES_URL', CHILD_URL . '/images' );
		define( 'CHILD_STYLES_URL', CHILD_LIBRARY_URL . '/css' );
		define( 'CHILD_SCRIPTS_URL', CHILD_LIBRARY_URL . '/js' );
		define( 'CHILD_ADMIN_URL', CHILD_LIBRARY_URL . '/admin' );

		// Define other contants.
		define( 'OPTIONS_FRAMEWORK_DIRECTORY', LIBRARY_URL . '/options/' );
		define( 'GREENLET_VERSION', '1.0.0' );
	}

	add_action( 'greenlet_init', 'greenlet_constants' );
}


if ( ! function_exists( 'greenlet_load_framework' ) ) {
	/**
	 * Loads all the framework files.
	 *
	 * Before any files are added, greenlet_pre_framework action hook is called.
	 *
	 * If child theme defines GREENLET_LOAD_FRAMEWORK as false before requiring this
	 * init.php file, then no files will be loaded. They can be loaded manually.
	 *
	 * @since 1.0.0
	 * @todo Set Permissions to meta and update.
	 */
	function greenlet_load_framework() {

		// Run greenlet_pre_framework action hook.
		do_action( 'greenlet_pre_framework' );

		// Do not load greenlet, if necessary.
		if ( defined( 'GREENLET_LOAD_FRAMEWORK' ) && GREENLET_LOAD_FRAMEWORK === false ) {
			return;
		}

		require_once LIBRARY_DIR . '/class-columnobject.php';
		require_once LIBRARY_DIR . '/class-honeypot.php';
		require_once OPTIONS_DIR . '/options-framework.php';
		require_once PARENT_DIR . '/options.php';
		require_once LIBRARY_DIR . '/header-structure.php';
		require_once LIBRARY_DIR . '/page-structure.php';
		require_once LIBRARY_DIR . '/footer-structure.php';
		require_once LIBRARY_DIR . '/markup.php';
		require_once LIBRARY_DIR . '/attributes.php';
		require_once LIBRARY_DIR . '/meta-boxes.php';
	}

	add_action( 'greenlet_init', 'greenlet_load_framework' );
}

// Run greenlet_init action hook.
do_action( 'greenlet_init' );


if ( ! function_exists( 'greenlet_setup' ) ) {
	/**
	 * Loads textdomain, Adds theme support, menu etc.
	 *
	 * @since 1.0.0
	 *
	 * @see wp-includes/theme.php.
	 */
	function greenlet_setup() {
		// Make the theme available for translation.
		load_theme_textdomain( 'greenlet', LANGUAGES_DIR );

		// Add action to wp ajax.
		// Todo: Nonce verification
		if ( array_key_exists( 'action', $_REQUEST ) ) {
			add_action( "wp_ajax_{$_REQUEST['action']}",		$_REQUEST['action'] );
			add_action( "wp_ajax_nopriv_{$_REQUEST['action']}",	$_REQUEST['action'] );
		}

		// Switch to html5 support.
		add_theme_support( 'html5', array( 'comment-list', 'comment-form', 'search-form', 'gallery', 'caption' ) );

		// Let WordPress manage the document title.
		add_theme_support( 'title-tag' );

		add_theme_support(
			'custom-background',
			apply_filters(
				'greenlet_custom_background_args',
				array(
					'default-color' => 'fff',
					'default-image' => '',
				)
			)
		);

		add_theme_support(
			'custom-header',
			apply_filters(
				'greenlet_custom_header_args',
				array(
					'default-image'      => '',
					'default-text-color' => '000',
					'width'              => 1980,
					'height'             => 250,
					'flex-height'        => true,
					'wp-head-callback'   => 'greenlet_header_style',
				)
			)
		);

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
			$sidebars_qty = of_get_option( 'sidebars_qty' ) ? of_get_option( 'sidebars_qty' ) : 3;

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
				if ( of_get_option( $pos . '_content_source' ) === 'widgets' ) {

					// Get position template option.
					$layout_option = $pos . '_template';
					$layout        = of_get_option( $layout_option ) ? of_get_option( $layout_option ) : '4-4-4';

					// Create new column object.
					// @see library/classes.php.
					$cobj = new ColumnObject( $layout );

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

if ( ! function_exists( 'greenlet_defer_style' ) ) {
	/**
	 * Defer stylesheet.
	 *
	 * @param string $href Link href.
	 */
	function greenlet_defer_style( $href ) {
		// Todo: Prefetch if external URL.
		printf( '<link rel="preload" href="%s" as="style" onload="this.onload=null;this.rel=\'stylesheet\'">', esc_url( $href ) );
		printf( '<noscript><link rel="stylesheet" href="%s"></noscript>', esc_url( $href ) ); // phpcs:ignore
	}
}

if ( ! function_exists( 'greenlet_enqueue_style' ) ) {
	/**
	 * Enqueue stylesheet.
	 *
	 * @param string           $handle Stylesheet handle.
	 * @param string           $src    Link href.
	 * @param bool|null        $defer  Whether to defer.
	 * @param array            $deps   An array of registered stylesheet handles.
	 * @param string|bool|null $ver    Stylesheet version number.
	 */
	function greenlet_enqueue_style( $handle, $src, $defer = null, $deps = array(), $ver = false ) {
		if ( null === $defer ) {
			$defer = of_get_option( 'defer_css' ) ? of_get_option( 'defer_css' ) : 0;
		}
		if ( $defer ) {
			greenlet_defer_style( $src );
			return;
		}

		wp_enqueue_style( $handle, $src, $deps, $ver );
	}
}

if ( ! function_exists( 'greenlet_scripts' ) ) {
	/**
	 * Styles and Scripts.
	 *
	 * Registers and enqueue styles and scripts.
	 *
	 * @since 1.0.0
	 *
	 * @see wp-includes/functions.wp-styles.php.
	 * @see wp-includes/functions.wp-scripts.php.
	 */
	function greenlet_scripts() {
		// Adds support for pages with threaded comments.
		if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
			wp_enqueue_script( 'comment-reply' );
		}

		global $wp_query, $wp, $wp_rewrite;
		wp_enqueue_script( 'greenlet-custom', SCRIPTS_URL . '/scripts.js', array(), GREENLET_VERSION, true );
		wp_localize_script(
			'greenlet-custom',
			'pagination_ajax',
			array(
				'ajaxurl'     => admin_url( 'admin-ajax.php' ),
				'current_url' => preg_replace( '~paged?/[0-9]+/?~', '', home_url( $wp->request ) ),
				'page'        => get_query_var( 'paged', 1 ),
				'permalinks'  => $wp_rewrite->using_permalinks(),
				'query_vars'  => wp_json_encode( $wp_query->query_vars ),
			)
		);

		$css_framework = of_get_option( 'css_framework' ) ? of_get_option( 'css_framework' ) : 'default';
		$load_js       = of_get_option( 'load_js' ) ? of_get_option( 'load_js' ) : 0;

		switch ( $css_framework ) {
			case 'default':
				$default_href = STYLES_URL . '/default.css';
				greenlet_enqueue_style( 'greenlet-default', $default_href );
				break;
			case 'bootstrap':
				$css_path = of_get_option( 'css_path' ) ? of_get_option( 'css_path' ) : 'https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css';
				$js_path  = of_get_option( 'js_path' ) ? of_get_option( 'js_path' ) : 'https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js';
				break;
			default:
				$css_path = STYLES_URL . '/default.css';
				$js_path  = '';
				break;
		}

		if ( 'default' !== $css_framework ) {
			greenlet_enqueue_style( $css_framework, $css_path );
			if ( 1 === $load_js ) {
				wp_enqueue_script( $css_framework . '-js', $js_path, array( 'jquery' ), GREENLET_VERSION, true );
			}
		}

		$styles_href = STYLES_URL . '/styles.css';
		greenlet_enqueue_style( 'greenlet-styles', $styles_href );
	}

	add_action( 'wp_enqueue_scripts', 'greenlet_scripts' );
}


if ( ! function_exists( 'greenlet_load_wp_head' ) ) {
	/**
	 * Adds styles to head.
	 *
	 * Gets logo and adds style to wp head.
	 *
	 * @since 1.0.0
	 *
	 * @see wp-includes/general-template.php.
	 */
	function greenlet_load_wp_head() {
		$main_width = of_get_option( 'container_width' ) ? of_get_option( 'container_width' ) : '1170px';
		$main_class = '.container';

		?>
		<style type="text/css">
			@media (min-width: 1281px) {
				<?php echo esc_html( $main_class ); ?> {
					max-width: <?php echo esc_html( $main_width ); ?>;
				}
			}
		<?php

		if ( of_get_option( 'fixed_topbar' ) ) {
			add_filter(
				'body_class',
				function ( $classes ) {
					$classes[] = 'fixed-topbar';
					return $classes;
				}
			);
		}

		?>
		</style>
		<?php
	}

	add_action( 'wp_head', 'greenlet_load_wp_head' );
}


if ( ! function_exists( 'greenlet' ) ) {
	/**
	 * Greenlet function.
	 *
	 * Gets header and footer.
	 * Creates main action hooks.
	 *
	 * @since 1.0.0
	 *
	 * @see wp-includes/general-template.php.
	 * @see wp-includes/plugin.php.
	 */
	function greenlet() {

		get_header();

		do_action( 'greenlet_before_main_container' );

		// see library/page-structure.php for default actions for this hook.
		do_action( 'greenlet_main_container' );

		do_action( 'greenlet_after_main_container' );

		get_footer();
	}
}


if ( ! function_exists( 'greenlet_cover' ) ) {
	/**
	 * Greenlet Cover function.
	 *
	 * Get templates for Topbar, Header, Semifooter, Footer.
	 * Get templates for logo and registered menus.
	 *
	 * @since 1.0.0
	 * @see wp-includes/general-template.php.
	 *
	 * @param string $pos column position.
	 */
	function greenlet_cover( $pos = 'header' ) {

		// Set variables.
		$layout_option = $pos . '_template';
		$source_option = $pos . '_content_source';

		// Get logo and menu positions from options, else set default values.
		$logo_position  = of_get_option( 'logo_position' ) ? of_get_option( 'logo_position' ) : 'header-1';
		$mmenu_position = of_get_option( 'mmenu_position' ) ? of_get_option( 'mmenu_position' ) : 'header-2';
		$smenu_position = of_get_option( 'smenu_position' ) ? of_get_option( 'smenu_position' ) : 'dont-show';
		$fmenu_position = of_get_option( 'fmenu_position' ) ? of_get_option( 'fmenu_position' ) : 'select';
		$layout         = of_get_option( $layout_option ) ? of_get_option( $layout_option ) : '4-8';
		$source         = of_get_option( $source_option ) ? of_get_option( $source_option ) : 'ceditor';

		// Create new column object with current layout as parameter.
		// @see library/classes.php.
		$cobj = new ColumnObject( $layout );

		// For each columns in the array.
		$i = 1;
		foreach ( $cobj->array as $col ) {

			$args = array(
				'primary' => "{$pos}-{$i} {$pos}-column",
				'width'   => $col,
			);

			printf( '<div %s>', wp_kses( greenlet_attr( $args ), null ) );

			do_action( "greenlet_before_{$pos}_{$i}_content" );

			// If current position has logo or menu, get template part.
			switch ( $pos . '-' . $i ) {

				case $logo_position:
					get_template_part( 'templates/logo' );
					break;

				case $mmenu_position:
					get_template_part( 'templates/menu/main' );
					break;

				case $smenu_position:
					get_template_part( 'templates/menu/secondary' );
					break;

				case $fmenu_position:
					get_template_part( 'templates/menu/footer' );
					break;
			}

			// Get content from the option source.
			switch ( $source ) {

				case 'ceditor':
					// Echo Saved content from content editor option.
					$template_part = $pos . '_' . $i . '_textarea';
					echo of_get_option( $template_part ); // phpcs:ignore
					break;

				case 'widgets':
					// Get dynamic sidebar.
					dynamic_sidebar( $pos . '-sidebar-' . $i );
					break;

				case 'manual':
					// Get current column template.
					get_template_part( 'templates/' . $pos . '/column', ( $i ) );
					break;
			}

			do_action( "greenlet_after_{$pos}_{$i}_content" );

			echo '</div>';
			$i++;
		}
	}
}


if ( ! function_exists( 'greenlet_get_min_sidebars' ) ) {
	/**
	 * Get Minimum sidebars
	 * Calculates minimum sidebars required based on the
	 * default template options and template file names.
	 *
	 * @return int Sidebars qty
	 */
	function greenlet_get_min_sidebars() {

		// Get file names in the template directory, exclude current and parent.
		$files = array_filter(
			scandir( TEMPLATES_DIR ),
			function( $item ) {
				return '.' !== $item[0];
			}
		);

		// Get template names from options, else set default values.
		$files[] = of_get_option( 'default_template' ) ? of_get_option( 'default_template' ) : '12';
		$files[] = of_get_option( 'default_post_template' ) ? of_get_option( 'default_post_template' ) : '12';
		$files[] = of_get_option( 'home_template' ) ? of_get_option( 'home_template' ) : '12';
		$files[] = of_get_option( 'archive_template' ) ? of_get_option( 'archive_template' ) : '12';

		$cols = array();

		// For each file names in the array.
		foreach ( $files as $file ) {

			// Remove php file extension if exist.
			$file = str_replace( '.php', '', $file );

			// Store each columns in array.
			$cols_array = explode( '-', $file );

			// If array contains only numbers.
			if ( is_numeric_array( $cols_array ) ) {

				// Count columns in array.
				$cols[] = count( $cols_array );
			}
		}

		// Count maximum value in array, remove 1 and return.
		$max_cols     = max( $cols );
		$min_sidebars = $max_cols - 1;

		return $min_sidebars;
	}
}


if ( ! function_exists( 'is_numeric_array' ) ) {
	/**
	 * Check if the array is numeric.
	 *
	 * @param array $array Input array.
	 * @return bool        Whether array is numeric.
	 */
	function is_numeric_array( $array ) {
		$nonints = preg_grep( '/\D/', $array );
		return( 0 === count( $nonints ) );
	}
}


if ( ! function_exists( 'greenlet_template_sequence' ) ) {
	/**
	 * Sends template sequence upon ajax.
	 */
	function greenlet_template_sequence() {

		// Get ajax post data.
		// Todo: Nonce verification
		$template_name = isset( $_REQUEST[ 'template' ] ) ? $_REQUEST[ 'template' ] : null;
		$context       = isset( $_REQUEST[ 'context' ] ) ? $_REQUEST[ 'context' ] : null;

		// Get templates columns and content sequence.
		$options    = greenlet_column_options( $template_name );
		$selections = greenlet_column_content_options();

		// Get sequence html, Output and terminate the current script.
		$output = greenlet_sequencer(
			$options,
			$selections,
			$context,
			array( 'main', 'sidebar-1', 'sidebar-2', 'sidebar-3', 'sidebar-4', 'sidebar-5', 'sidebar-6', 'sidebar-7', 'sidebar-8' )
		);

		echo wp_kses( $output, greenlet_sequencer_tags() );
		die();
	}
}

if ( ! function_exists( 'greenlet_sequencer_tags' ) ) {
	/**
	 * Retrieve sequencer allowed tags.
	 *
	 * @return array Sequencer allowed Tags
	 */
	function greenlet_sequencer_tags() {
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
}


if ( ! function_exists( 'greenlet_sequencer' ) ) {
	/**
	 * Column sequencer
	 * Generates template columns and content sequence.
	 *
	 * @param    array  $options    template columns.
	 * @param    array  $selections column content.
	 * @param    string $context    for current option.
	 * @param    array  $sequence   previously set sequence.
	 * @return   string             column sequence html
	 */
	function greenlet_sequencer( $options, $selections, $context = null, $sequence = null ) {

		$output = '';

		foreach ( $options as $key => $option ) {

			$selected = '';
			$label    = $option;
			$option   = preg_replace( '/[^a-zA-Z0-9._\-]/', '', strtolower( $key ) );

			$id   = 'template-sequence[' . $option . ']';
			$name = 'template-sequence[' . $option . ']';

			// If context exist, set option framework id and name.
			if ( $context ) {

				$options_framework = new Options_Framework();
				$option_name       = $options_framework->get_option_name();
				$id                = $option_name . '-' . $context . '-' . $option;
				$name              = $option_name . '[' . $context . '][' . $option . ']';
			}

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
}



if ( ! function_exists( 'greenlet_cover_columns' ) ) {
	/**
	 * Gets cover (header, footer) columns.
	 *
	 * @param  array $positions Cover positions.
	 * @return array            List of columns
	 */
	function greenlet_cover_columns( $positions = array( 'topbar', 'header', 'semifooter', 'footer' ) ) {

		$cover_columns = array( 'dont-show' => 'Do Not Show' );

		foreach ( $positions as $key => $position ) {
			$cols  = of_get_option( "{$position}_template" );
			$array = explode( '-', $cols );
			foreach ( $array as $id => $width ) {
				$id++;
				$cover_columns[ $position . '-' . $id ] = ucfirst( $position ) . ' Column ' . $id . ' (width = ' . $width . ')';
			}
		}

		return $cover_columns;
	}
}


if ( ! function_exists( 'greenlet_column_options' ) ) {
	/**
	 * Returns column array for current template selection.
	 *
	 * @param  string $layout template option.
	 * @return array columns
	 */
	function greenlet_column_options( $layout = 'default_template' ) {

		// If layout option exist, get saved options. Else extract columns name.
		if ( of_get_option( $layout ) ) {
			$cols = of_get_option( $layout );
		} else {
			$cols = str_replace( '.php', '', basename( $layout ) );
		}

		// Assign to column array.
		$cols  = explode( '-', $cols );
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
}


if ( ! function_exists( 'greenlet_column_content_options' ) ) {
	/**
	 * Returns columns content array.
	 * Assigns Main content and sidebars into array and returns.
	 *
	 * @return array column content
	 */
	function greenlet_column_content_options() {

		$array['main'] = 'Main Content';

		foreach ( $GLOBALS['wp_registered_sidebars'] as $sidebar ) {
			$array[ $sidebar['id'] ] = $sidebar['name'];
		}

		return $array;
	}
}


if ( version_compare( $GLOBALS['wp_version'], '4.1', '<' ) ) {
	/**
	 * Filters wp_title to print a neat <title> tag based on what is being viewed.
	 *
	 * @param    string $title Default title text for current view.
	 * @param    string $sep   Optional separator.
	 * @return    string    The        filtered title.
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

	/**
	 * Title shim for sites older than WordPress 4.1.
	 *
	 * @link https://make.wordpress.org/core/2014/10/29/title-tags-in-4-1/
	 * @todo Remove this function when WordPress 4.3 is released.
	 */
	function greenlet_render_title() {
		?>
		<title><?php wp_title( '|', true, 'right' ); ?></title>
		<?php
	}

	add_action( 'wp_head', 'greenlet_render_title' );
}


if ( ! function_exists( 'greenlet_header_style' ) ) :
	/**
	 * Styles the header image and text displayed on the blog
	 *
	 * @see greenlet_custom_header_setup().
	 */
	function greenlet_header_style() {
		$header_image = get_header_image();

		// If no custom options for text are set, let's bail.
		if ( empty( $header_image ) && display_header_text() ) {
			return;
		}

		$css          = '.site-header{ background: url(' . $header_image . '); }';
		$greenlet_css = apply_filters( 'greenlet_header_css', $css, $header_image );
		?>

		<style type="text/css" id="greenlet-header-css">
			<?php echo $greenlet_css; // phpcs:ignore ?>
		</style>

		<?php
	}
endif;

/**
 * Get meta description.
 *
 * @return string Meta description.
 */
function greenlet_meta_description() {
	if ( is_single() ) {
		$description = single_post_title( '', false );
	} else {
		$description = get_bloginfo( 'name' ) . ' - ' . get_bloginfo( 'description' );
	}

	return $description;
}
