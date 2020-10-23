<?php
/**
 * Theme Styles and Scripts.
 *
 * @package greenlet\library\frontend
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_action( 'wp_enqueue_scripts', 'greenlet_scripts' );
add_action( 'wp_enqueue_scripts', 'greenlet_load_inline_styles' );
add_action( 'wp_enqueue_scripts', 'greenlet_enqueue_fonts', 90 );

if ( ! function_exists( 'greenlet_scripts' ) ) {
	/**
	 * Styles and Scripts.
	 *
	 * Registers and enqueue styles and scripts.
	 *
	 * @since 1.0.0
	 * @since 1.2.0 Bootstrap is bundled with theme rather than CDN.
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
		$min = ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ) ? '' : '.min';

		greenlet_enqueue_script( 'greenlet-scripts', GL_SCRIPTS_URL . '/scripts' . $min . '.js', array(), GREENLET_VERSION, true );
		$l10n = array(
			'ajaxurl'     => esc_url( admin_url( 'admin-ajax.php' ) ),
			'current_url' => preg_replace( '~paged?/[0-9]+/?~', '', esc_url( home_url( $wp->request ) ) ),
			'page'        => get_query_var( 'paged', 1 ),
			'permalinks'  => $wp_rewrite->using_permalinks(),
			'query_vars'  => wp_json_encode( $wp_query->query_vars ),
			'page_data'   => greenlet_page_data(),
		);
		$l10n = apply_filters( 'greenlet_l10n_object', $l10n );
		wp_localize_script( 'greenlet-scripts', 'greenlet_object', $l10n );

		$css_framework = gl_get_option( 'css_framework', 'default' );
		$load_js       = gl_get_option( 'load_js', false );

		switch ( $css_framework ) {
			case 'default':
				$default_href = GL_STYLES_URL . '/default' . $min . '.css';
				greenlet_enqueue_style( 'greenlet-default', $default_href );
				break;
			case 'bootstrap':
				$default_css = GL_STYLES_URL . '/bootstrap' . $min . '.css';
				$default_js  = GL_SCRIPTS_URL . '/bootstrap' . $min . '.js';
				$css_path    = gl_get_option( 'css_path', $default_css );
				$js_path     = gl_get_option( 'js_path', $default_js );

				$css_path = ( '' === $css_path ) ? $default_css : $css_path;
				$js_path  = ( '' === $js_path ) ? $default_js : $js_path;
				break;
			default:
				$css_path = GL_STYLES_URL . '/default' . $min . '.css';
				$js_path  = '';
				break;
		}

		if ( 'default' !== $css_framework ) {
			greenlet_enqueue_style( $css_framework, $css_path );
			if ( false !== $load_js ) {
				wp_enqueue_script( $css_framework . '-js', $js_path, array( 'jquery' ), GREENLET_VERSION, true );
			}
		}

		$styles_href = GL_STYLES_URL . '/styles' . $min . '.css';
		greenlet_enqueue_style( 'greenlet-styles', $styles_href );
	}
}

if ( ! function_exists( 'greenlet_load_inline_styles' ) ) {
	/**
	 * Adds styles to head.
	 *
	 * Gets logo and adds style to wp head.
	 *
	 * @since 1.0.0
	 *
	 * @see wp-includes/general-template.php.
	 */
	function greenlet_load_inline_styles() {
		$show_title   = gl_get_option( 'show_title', '1' );
		$show_tagline = gl_get_option( 'show_tagline', false );

		$fixed_topbar = gl_get_option( 'fixed_topbar', true );

		ob_start();
		greenlet_print_inline_styles();

		if ( false === $show_title ) {
			echo '.site-name { display: none; }';
		}
		if ( false === $show_tagline ) {
			echo '.site-tagline { display: none; }';
		}

		if ( false !== $fixed_topbar ) {
			echo '.topbar { position: sticky; }';
		}

		greenlet_enqueue_inline_style( 'greenlet-inline', ob_get_clean() );
	}
}
