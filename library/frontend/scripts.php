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

		wp_enqueue_script( 'greenlet-scripts', SCRIPTS_URL . '/scripts' . $min . '.js', array(), GREENLET_VERSION, true );
		wp_localize_script(
			'greenlet-scripts',
			'pagination_ajax',
			array(
				'ajaxurl'     => admin_url( 'admin-ajax.php' ),
				'current_url' => preg_replace( '~paged?/[0-9]+/?~', '', home_url( $wp->request ) ),
				'page'        => get_query_var( 'paged', 1 ),
				'permalinks'  => $wp_rewrite->using_permalinks(),
				'query_vars'  => wp_json_encode( $wp_query->query_vars ),
			)
		);

		$css_framework = gl_get_option( 'css_framework', 'default' );
		$load_js       = gl_get_option( 'load_js', false );

		switch ( $css_framework ) {
			case 'default':
				$default_href = STYLES_URL . '/default' . $min . '.css';
				greenlet_enqueue_style( 'greenlet-default', $default_href );
				break;
			case 'bootstrap':
				$default_css = STYLES_URL . '/bootstrap' . $min . '.css';
				$default_js  = SCRIPTS_URL . '/bootstrap' . $min . '.js';
				$css_path    = gl_get_option( 'css_path', $default_css );
				$js_path     = gl_get_option( 'js_path', $default_js );

				$css_path = ( '' === $css_path ) ? $default_css : $css_path;
				$js_path  = ( '' === $js_path ) ? $default_js : $js_path;
				break;
			default:
				$css_path = STYLES_URL . '/default' . $min . '.css';
				$js_path  = '';
				break;
		}

		if ( 'default' !== $css_framework ) {
			greenlet_enqueue_style( $css_framework, $css_path );
			if ( false !== $load_js ) {
				wp_enqueue_script( $css_framework . '-js', $js_path, array( 'jquery' ), GREENLET_VERSION, true );
			}
		}

		$styles_href = STYLES_URL . '/styles' . $min . '.css';
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

		$logo_width       = gl_get_option( 'logo_width', false );
		$logo_height      = gl_get_option( 'logo_height', false );
		$site_bg          = gl_get_option( 'site_bg', '#f5f5f5' );
		$site_color       = gl_get_option( 'site_color', '#383838' );
		$topbar_bg        = gl_get_option( 'topbar_bg', '#fff' );
		$topbar_color     = gl_get_option( 'topbar_color', '#212121' );
		$header_bg        = gl_get_option( 'header_bg', '#fff' );
		$header_color     = gl_get_option( 'header_color', '#383838' );
		$header_link_over = gl_get_option( 'header_link_hover', '#01579B' );
		$main_bg          = gl_get_option( 'main_bg', '#f5f5f5' );
		$content_bg       = gl_get_option( 'content_bg', '' );
		$semifooter_bg    = gl_get_option( 'semifooter_bg', '#fff' );
		$semifooter_color = gl_get_option( 'semifooter_color', '#212121' );
		$footer_bg        = gl_get_option( 'footer_bg', '#212121' );
		$footer_color     = gl_get_option( 'footer_color', '#fff' );
		$heading_color    = gl_get_option( 'heading_color', '#383838' );
		$head_color_over  = gl_get_option( 'heading_hover_color', '#000000' );
		$heading_font     = gl_get_option( 'heading_font', array() );
		$h1_font          = gl_get_option( 'h1_font', array() );
		$h2_font          = gl_get_option( 'h2_font', array() );
		$h3_font          = gl_get_option( 'h3_font', array() );
		$h4_font          = gl_get_option( 'h4_font', array() );
		$h5_font          = gl_get_option( 'h5_font', array() );
		$h6_font          = gl_get_option( 'h6_font', array() );
		$link_color       = gl_get_option( 'link_color', '#0277BD' );
		$link_hover       = gl_get_option( 'link_hover', '#01579B' );
		$link_font        = gl_get_option( 'link_font', array() );
		$btn_bg           = gl_get_option( 'button_bg', '#ffffff' );
		$btn_color        = gl_get_option( 'button_color', '#555555' );
		$btn_border       = gl_get_option( 'button_border', '1px solid #bbbbbb' );
		$btn_radius       = gl_get_option( 'button_radius', '0px' );
		$btn_bg_over      = gl_get_option( 'button_hover_bg', '#ffffff' );
		$btn_color_over   = gl_get_option( 'button_hover_color', '#383838' );
		$btn_border_over  = gl_get_option( 'button_hover_border', '1px solid #383838' );
		$btn_font         = gl_get_option( 'button_font', array() );
		$ip_bg            = gl_get_option( 'input_bg', '#ffffff' );
		$ip_color         = gl_get_option( 'input_color', '#383838' );
		$ip_ph            = gl_get_option( 'input_placeholder', '#555555' );
		$ip_border        = gl_get_option( 'input_border', '1px solid #bbbbbb' );
		$ip_radius        = gl_get_option( 'input_radius', '0px' );
		$ip_bg_focus      = gl_get_option( 'input_focus_bg', '#ffffff' );
		$ip_color_focus   = gl_get_option( 'input_focus_color', '#383838' );
		$ip_ph_focus      = gl_get_option( 'input_focus_placeholder', '#555555' );
		$ip_border_focus  = gl_get_option( 'input_focus_border', '1px solid #383838' );
		$input_font       = gl_get_option( 'input_font', array() );
		$para_color       = gl_get_option( 'para_color', '#383838' );
		$para_font        = gl_get_option( 'para_font', array() );
		$code_bg          = gl_get_option( 'code_bg', '#f1f1f1' );
		$code_color       = gl_get_option( 'code_color', '#383838' );
		$code_border      = gl_get_option( 'code_border', '1px solid #e1e1e1' );
		$code_font        = gl_get_option( 'code_font', array() );
		$icons_color      = gl_get_option( 'icons_color', '#999999' );
		$base_font        = gl_get_option( 'base_font', array() );
		$header_font      = gl_get_option( 'header_font', array() );
		$content_font     = gl_get_option( 'content_font', array() );
		$footer_font      = gl_get_option( 'footer_font', array() );
		$logo_font        = gl_get_option( 'logo_font', array() );
		$article_radius   = gl_get_option( 'article_radius', '0px' );
		$sidebar_radius   = gl_get_option( 'sidebar_radius', '0px' );
		$b_crumb_radius   = gl_get_option( 'breadcrumb_radius', '0px' );

		$critical_css = gl_get_option( 'critical_css', '' );
		$defer_css    = gl_get_option( 'defer_css', '1' );

		$raw_width  = 0;
		$raw_height = 0;
		$logo       = greenlet_get_logo();
		if ( $logo ) {
			list( $raw_width, $raw_height ) = getimagesize( esc_url( $logo ) );
		}

		greenlet_add_style( '.container', 'max-width', greenlet_css_width( 'container_width', '1170px' ), '', 'min-width: 801px' );
		greenlet_add_style( '.topbar .container', 'max-width', greenlet_css_width( 'topbar_container' ), '', 'min-width: 801px' );
		greenlet_add_style( '.site-header .container', 'max-width', greenlet_css_width( 'header_container' ), '', 'min-width: 801px' );
		greenlet_add_style( '.site-content .container', 'max-width', greenlet_css_width( 'main_container' ), '', 'min-width: 801px' );
		greenlet_add_style( '.semifooter .container', 'max-width', greenlet_css_width( 'semifooter_container' ), '', 'min-width: 801px' );
		greenlet_add_style( '.site-footer .container', 'max-width', greenlet_css_width( 'footer_container' ), '', 'min-width: 801px' );
		greenlet_add_style( 'body', array( array( 'background', $site_bg ), array( 'color', $site_color ), array( 'font', $base_font ) ) );
		greenlet_add_style( '.topbar', array( array( 'background', $topbar_bg ), array( 'color', $topbar_color ), array( 'max-width', greenlet_css_width( 'topbar_width' ) ) ) );
		greenlet_add_style( '.site-header', array( array( 'background', $header_bg ), array( 'max-width', greenlet_css_width( 'header_width' ) ), array( 'font', $header_font ) ) );
		greenlet_add_style( '.site-header, .site-header a, .site-header .hamburger', 'color', sanitize_hex_color( $header_color ) );
		greenlet_add_style( '.site-header a:hover', 'color', sanitize_hex_color( $header_link_over ) );
		greenlet_add_style( '.site-navigation ul .children, .site-navigation ul .sub-menu', 'background', sanitize_hex_color( $header_bg ) );
		greenlet_add_style( '.site-content', array( array( 'background', $main_bg ), array( 'max-width', greenlet_css_width( 'main_width' ) ), array( 'font', $content_font ) ) );
		greenlet_add_style( '.entry-article, .sidebar > .wrap, #comments, .breadcrumb', 'background', $content_bg );
		greenlet_add_style( '.semifooter', array( array( 'background', $semifooter_bg ), array( 'color', $semifooter_color ), array( 'max-width', greenlet_css_width( 'semifooter_width' ) ) ) );
		greenlet_add_style( '.site-footer', array( array( 'background', $footer_bg ), array( 'max-width', greenlet_css_width( 'footer_width' ) ), array( 'font', $footer_font ) ) );
		greenlet_add_style( '.site-footer, .site-footer p', 'color', $footer_color );
		greenlet_add_style( 'h1, h2, h3, h4, h5, h6, .entry-title a', array( array( 'color', $heading_color ), array( 'font', $heading_font ) ) );
		greenlet_add_style( 'h1:hover, h2:hover, h3:hover, h4:hover, h5:hover, h6:hover', 'color', $head_color_over );
		greenlet_add_style( 'h1', 'font', $h1_font );
		greenlet_add_style( 'h2', 'font', $h2_font );
		greenlet_add_style( 'h3', 'font', $h3_font );
		greenlet_add_style( 'h4', 'font', $h4_font );
		greenlet_add_style( 'h5', 'font', $h5_font );
		greenlet_add_style( 'h6', 'font', $h6_font );
		greenlet_add_style( 'a, .entry-meta li', array( array( 'color', $link_color ), array( 'font', $link_font ) ) );
		greenlet_add_style( 'a:hover', 'color', sanitize_hex_color( $link_hover ) );
		greenlet_add_style( '.button, button, input[type="submit"], input[type="reset"], input[type="button"], .pagination li a, .pagination li span', array( array( 'background', $btn_bg ), array( 'color', $btn_color ), array( 'border', $btn_border ), array( 'border-radius', $btn_radius ), array( 'font', $btn_font ) ) );
		greenlet_add_style( '.button:hover, button:hover, input[type="submit"]:hover, input[type="reset"]:hover, input[type="button"]:hover, .pagination li a:hover, .pagination li span:hover', array( array( 'background', $btn_bg_over ), array( 'color', $btn_color_over ), array( 'border', $btn_border_over ) ) );
		greenlet_add_style( 'input[type="email"], input[type="number"], input[type="search"], input[type="text"], input[type="tel"], input[type="url"], input[type="password"], textarea, select', array( array( 'background', $ip_bg ), array( 'color', $ip_color ), array( 'border', $ip_border ), array( 'border-radius', $ip_radius ), array( 'font', $input_font ) ) );
		greenlet_add_style( 'input[type="email"]:focus, input[type="number"]:focus, input[type="search"]:focus, input[type="text"]:focus, input[type="tel"]:focus, input[type="url"]:focus, input[type="password"]:focus, textarea:focus, select:focus', array( array( 'background', $ip_bg_focus ), array( 'color', $ip_color_focus ), array( 'border', $ip_border_focus ) ) );
		greenlet_add_style( 'input[type="email"]::placeholder, input[type="number"]::placeholder, input[type="search"]::placeholder, input[type="text"]::placeholder, input[type="tel"]::placeholder, input[type="url"]::placeholder, input[type="password"]::placeholder, textarea::placeholder, select::placeholder', 'color', $ip_ph );
		greenlet_add_style( 'input[type="email"]:focus::placeholder, input[type="number"]:focus::placeholder, input[type="search"]:focus::placeholder, input[type="text"]:focus::placeholder, input[type="tel"]:focus::placeholder, input[type="url"]:focus::placeholder, input[type="password"]:focus::placeholder, textarea:focus::placeholder, select:focus::placeholder', 'color', $ip_ph_focus );
		greenlet_add_style( 'p', array( array( 'color', $para_color ), array( 'font', $para_font ) ) );
		greenlet_add_style( 'code', array( array( 'color', $code_color ), array( 'font', $code_font ), array( 'background', $code_bg ), array( 'border', $code_border ) ) );
		greenlet_add_style( '.site-logo, h1.site-name a', 'font', $logo_font );
		greenlet_add_style( '.entry-meta svg', 'fill', $icons_color );
		greenlet_add_style( '.entry-article', 'border-radius', $article_radius );
		greenlet_add_style( '.sidebar > .wrap', 'border-radius', $sidebar_radius );
		greenlet_add_style( '.breadcrumb', 'border-radius', $b_crumb_radius );

		ob_start();
		greenlet_print_inline_styles();

		if ( false !== $logo_width && $raw_width !== $logo_width ) {
			echo '.site-logo img { width: ' . esc_html( $logo_width ) . ';}';
		}

		if ( false !== $logo_height && $raw_height !== $logo_height ) {
			echo '.site-logo img { height: ' . esc_html( $logo_height ) . ';}';
		}

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

		if ( false !== $defer_css && '' !== $critical_css ) {
			greenlet_enqueue_inline_style( 'greenlet-critical', $critical_css );
		}
	}
}
