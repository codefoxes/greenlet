<?php
/**
 * Load Greenlet.
 *
 * Load framework constants, files, functions.
 *
 * @package greenlet\library
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Run greenlet_pre action hook.
do_action( 'greenlet_pre' );


if ( ! function_exists( 'greenlet_constants' ) ) {
	/**
	 * Defines the Greenlet Theme constants.
	 *
	 * @since  1.0.0
	 * @return void
	 */
	function greenlet_constants() {

		// Define constants for parent theme directories.
		define( 'PARENT_DIR', get_template_directory() );
		define( 'ASSETS_DIR', PARENT_DIR . '/assets' );
		define( 'IMAGES_DIR', ASSETS_DIR . '/images' );
		define( 'TEMPLATES_DIR', PARENT_DIR . '/templates' );
		define( 'LIBRARY_DIR', PARENT_DIR . '/library' );
		define( 'LANGUAGES_DIR', LIBRARY_DIR . '/languages' );

		// Define constants for child directories.
		define( 'CHILD_DIR', get_stylesheet_directory() );
		define( 'CHILD_ASSETS_DIR', CHILD_DIR . '/assets' );
		define( 'CHILD_IMAGES_DIR', CHILD_ASSETS_DIR . '/images' );
		define( 'CHILD_TEMPLATES_DIR', CHILD_DIR . '/templates' );
		define( 'CHILD_LIBRARY_DIR', CHILD_DIR . '/library' );
		define( 'CHILD_LANGUAGES_DIR', CHILD_LIBRARY_DIR . '/languages' );

		// Define constants for parent theme URLs.
		define( 'PARENT_URL', get_template_directory_uri() );
		define( 'LIBRARY_URL', PARENT_URL . '/library' );
		define( 'ASSETS_URL', PARENT_URL . '/assets' );
		define( 'IMAGES_URL', ASSETS_URL . '/images' );
		define( 'STYLES_URL', ASSETS_URL . '/css' );
		define( 'SCRIPTS_URL', ASSETS_URL . '/js' );

		// Define constants for child theme URLs.
		define( 'CHILD_URL', get_stylesheet_directory_uri() );
		define( 'CHILD_LIBRARY_URL', CHILD_URL . '/library' );
		define( 'CHILD_ASSETS_URL', CHILD_URL . '/assets' );
		define( 'CHILD_IMAGES_URL', CHILD_ASSETS_URL . '/images' );
		define( 'CHILD_STYLES_URL', CHILD_ASSETS_URL . '/css' );
		define( 'CHILD_SCRIPTS_URL', CHILD_ASSETS_URL . '/js' );

		// Define other constants.
		define( 'GREENLET_VERSION', '1.2.3' );
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
	 * @since  1.0.0
	 * @return void
	 */
	function greenlet_load_framework() {

		// Run greenlet_pre_framework action hook.
		do_action( 'greenlet_pre_framework' );

		// Do not load greenlet, if necessary.
		if ( defined( 'GREENLET_LOAD_FRAMEWORK' ) && GREENLET_LOAD_FRAMEWORK === false ) {
			return;
		}

		require_once LIBRARY_DIR . '/common/helpers.php';
		require_once LIBRARY_DIR . '/common/setup.php';
		require_once LIBRARY_DIR . '/common/class-columns.php';

		global $wp_customize;
		if ( is_admin() || isset( $wp_customize ) ) {
			require_once LIBRARY_DIR . '/backend/helpers.php';
			require_once LIBRARY_DIR . '/backend/options/class-options-admin.php';
			require_once LIBRARY_DIR . '/backend/customizer/class-customizer.php';
			require_once LIBRARY_DIR . '/backend/editor/class-editor.php';
		}

		require_once LIBRARY_DIR . '/frontend/helpers.php';
		require_once LIBRARY_DIR . '/frontend/performance.php';
		require_once LIBRARY_DIR . '/frontend/scripts.php';
		require_once LIBRARY_DIR . '/frontend/markup.php';
		require_once LIBRARY_DIR . '/frontend/attributes.php';
		require_once LIBRARY_DIR . '/frontend/header-structure.php';
		require_once LIBRARY_DIR . '/frontend/main-structure.php';
		require_once LIBRARY_DIR . '/frontend/footer-structure.php';
		require_once LIBRARY_DIR . '/frontend/main.php';

		require_once LIBRARY_DIR . '/support/woocommerce/class-woocommerce.php';
	}

	add_action( 'greenlet_init', 'greenlet_load_framework' );
}

// Run greenlet_init action hook.
do_action( 'greenlet_init' );
