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

		greenlet_enqueue_script( 'greenlet-scripts', GREENLET_SCRIPT_URL . '/scripts' . $min . '.js', array(), GREENLET_VERSION, true );
		$l10n = array(
			'ajaxurl'     => esc_url( admin_url( 'admin-ajax.php' ) ),
			'current_url' => preg_replace( '~paged?/[0-9]+/?~', '', esc_url( home_url( $wp->request ) ) ),
			'page'        => get_query_var( 'paged', 1 ),
			'permalinks'  => $wp_rewrite->using_permalinks(),
			'query_vars'  => wp_json_encode( $wp_query->query_vars ),
			'page_data'   => greenlet_page_data(),
			'to_top_at'   => gl_get_option( 'to_top_at', '100px' ),
		);
		$l10n = apply_filters( 'greenlet_l10n_object', $l10n );
		wp_localize_script( 'greenlet-scripts', 'greenletData', $l10n );

		$css_framework = gl_get_option( 'css_framework', 'default' );

		$handle   = $css_framework;
		$css_path = false;
		switch ( $css_framework ) {
			case 'default':
				$css_path = GREENLET_STYLE_URL . '/default' . $min . '.css';
				$handle   = 'greenlet-default';
				break;
			case 'bootstrap':
				$default_css = GREENLET_STYLE_URL . '/bootstrap' . $min . '.css';

				$css_path = gl_get_option( 'css_path', $default_css );
				$css_path = ( '' === $css_path ) ? $default_css : $css_path;
				break;
		}

		if ( false !== $css_path ) {
			greenlet_enqueue_style( $handle, $css_path );
		}

		$styles_href = GREENLET_STYLE_URL . '/styles' . $min . '.css';
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
