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
	 * @since  1.2.5 Added constant prefixes.
	 * @return void
	 */
	function greenlet_constants() {

		// Define constants for parent theme directories.
		define( 'GREENLET_PARENT_DIR', get_template_directory() );
		define( 'GREENLET_ASSET_DIR', GREENLET_PARENT_DIR . '/assets' );
		define( 'GREENLET_IMAGE_DIR', GREENLET_ASSET_DIR . '/images' );
		define( 'GREENLET_TEMPLATE_DIR', GREENLET_PARENT_DIR . '/templates' );
		define( 'GREENLET_LIBRARY_DIR', GREENLET_PARENT_DIR . '/library' );
		define( 'GREENLET_LANGUAGE_DIR', GREENLET_LIBRARY_DIR . '/languages' );

		// Define constants for parent theme URLs.
		define( 'GREENLET_PARENT_URL', get_template_directory_uri() );
		define( 'GREENLET_LIBRARY_URL', GREENLET_PARENT_URL . '/library' );
		define( 'GREENLET_ASSET_URL', GREENLET_PARENT_URL . '/assets' );
		define( 'GREENLET_IMAGE_URL', GREENLET_ASSET_URL . '/images' );
		define( 'GREENLET_STYLE_URL', GREENLET_ASSET_URL . '/css' );
		define( 'GREENLET_SCRIPT_URL', GREENLET_ASSET_URL . '/js' );

		// Define constants for child theme directory and URLs.
		define( 'GREENLET_CHILD_DIR', get_stylesheet_directory() );
		define( 'GREENLET_CHILD_URL', get_stylesheet_directory_uri() );

		// Define other constants.
		define( 'GREENLET_VERSION', '2.0.1' );
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

		require_once GREENLET_LIBRARY_DIR . '/common/helpers.php';
		require_once GREENLET_LIBRARY_DIR . '/common/setup.php';
		require_once GREENLET_LIBRARY_DIR . '/common/class-columns.php';

		require_once GREENLET_LIBRARY_DIR . '/pro/class-pro.php';

		require_once GREENLET_LIBRARY_DIR . '/addons/colorwings/class-colorwings.php';

		global $wp_customize;
		if ( is_admin() || isset( $wp_customize ) ) {
			require_once GREENLET_LIBRARY_DIR . '/backend/helpers.php';
			require_once GREENLET_LIBRARY_DIR . '/backend/options/class-options-admin.php';
			require_once GREENLET_LIBRARY_DIR . '/backend/customizer/class-customizer.php';
			require_once GREENLET_LIBRARY_DIR . '/backend/editor/class-postmeta.php';
			require_once GREENLET_LIBRARY_DIR . '/backend/editor/class-editor.php';
		}

		require_once GREENLET_LIBRARY_DIR . '/frontend/helpers.php';
		require_once GREENLET_LIBRARY_DIR . '/frontend/performance.php';
		require_once GREENLET_LIBRARY_DIR . '/frontend/scripts.php';
		require_once GREENLET_LIBRARY_DIR . '/frontend/markup.php';
		require_once GREENLET_LIBRARY_DIR . '/frontend/attributes.php';
		require_once GREENLET_LIBRARY_DIR . '/frontend/header-structure.php';
		require_once GREENLET_LIBRARY_DIR . '/frontend/main-structure.php';
		require_once GREENLET_LIBRARY_DIR . '/frontend/footer-structure.php';
		require_once GREENLET_LIBRARY_DIR . '/frontend/main.php';

		require_once GREENLET_LIBRARY_DIR . '/support/woocommerce/class-woocommerce.php';
	}

	add_action( 'greenlet_init', 'greenlet_load_framework' );
}

// Run greenlet_init action hook.
do_action( 'greenlet_init' );
