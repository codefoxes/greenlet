<?php
/**
 * Theme Styles and Scripts.
 *
 * @package greenlet\library\frontend
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
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
		$min = ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ) ? '' : '.min';

		wp_enqueue_script( 'greenlet-custom', SCRIPTS_URL . '/scripts' . $min . '.js', array(), GREENLET_VERSION, true );
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

		$css_framework = gl_get_option( 'css_framework', 'default' );
		$load_js       = gl_get_option( 'load_js', false );

		switch ( $css_framework ) {
			case 'default':
				$default_href = STYLES_URL . '/default' . $min . '.css';
				greenlet_enqueue_style( 'greenlet-default', $default_href );
				break;
			case 'bootstrap':
				$default_css = 'https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css';
				$default_js  = 'https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js';
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

	add_action( 'wp_enqueue_scripts', 'greenlet_scripts' );
}


if ( ! function_exists( 'greenlet_css_width' ) ) {
	/**
	 * Get CSS width property for option.
	 *
	 * @since  1.0.0
	 * @param  string      $option  Option name.
	 * @param  string|bool $default Default Value.
	 * @return string               Width.
	 */
	function greenlet_css_width( $option, $default = false ) {
		if ( ! $default ) {
			$default = '100%';
		}
		$width = gl_get_option( $option, $default );
		return ( '' === $width ) ? $default : $width;
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
		$show_tagline = gl_get_option( 'show_tagline', '1' );

		$fixed_topbar = gl_get_option( 'fixed_topbar', false );

		$site_bg          = gl_get_option( 'site_bg', '#f5f5f5' );
		$site_color       = gl_get_option( 'site_color', '#383838' );
		$topbar_bg        = gl_get_option( 'topbar_bg', '#fff' );
		$topbar_color     = gl_get_option( 'topbar_color', '#212121' );
		$header_bg        = gl_get_option( 'header_bg', '#fff' );
		$header_color     = gl_get_option( 'header_color', '#33691e' );
		$header_link_over = gl_get_option( 'header_link_hover', '#7cb342' );
		$main_bg          = gl_get_option( 'main_bg', '#f5f5f5' );
		$content_bg       = gl_get_option( 'content_bg', '' );
		$semifooter_bg    = gl_get_option( 'semifooter_bg', '#fff' );
		$semifooter_color = gl_get_option( 'semifooter_color', '#212121' );
		$footer_bg        = gl_get_option( 'footer_bg', '#212121' );
		$footer_color     = gl_get_option( 'footer_color', '#fff' );
		$heading_color    = gl_get_option( 'heading_color', '#383838' );
		$link_color       = gl_get_option( 'link_color', '#1565C0' );
		$link_hover       = gl_get_option( 'link_hover', '#0D47A1' );

		$critical_css = gl_get_option( 'critical_css', '' );
		$defer_css    = gl_get_option( 'defer_css', false );

		ob_start();
		// phpcs:disable
		?>
		@media (min-width: 801px) {
			.container {
				max-width: <?php echo esc_html( greenlet_css_width( 'container_width', '1170px' ) ); ?>;
			}

			.topbar .container {
				max-width: <?php echo esc_html( greenlet_css_width( 'topbar_container', '1170px' ) ); ?>;
			}

			.site-header .container {
				max-width: <?php echo esc_html( greenlet_css_width( 'header_container', '1170px' ) ); ?>;
			}

			.site-content .container {
				max-width: <?php echo esc_html( greenlet_css_width( 'main_container', '1170px' ) ); ?>;
			}

			.semifooter .container {
				max-width: <?php echo esc_html( greenlet_css_width( 'semifooter_container', '1170px' ) ); ?>;
			}

			.site-footer .container {
				max-width: <?php echo esc_html( greenlet_css_width( 'footer_container', '1170px' ) ); ?>;
			}
		}

		body {
			background: <?php echo sanitize_hex_color( $site_bg ); ?>;
			color: <?php echo sanitize_hex_color( $site_color ); ?>;
		}

		.topbar {
			background: <?php echo sanitize_hex_color( $topbar_bg ); ?>;
			color: <?php echo sanitize_hex_color( $topbar_color ); ?>;
			max-width: <?php echo esc_html( greenlet_css_width( 'topbar_width' ) ); ?>;
		}

		.site-header {
			background: <?php echo sanitize_hex_color( $header_bg ); ?>;
			max-width: <?php echo esc_html( greenlet_css_width( 'header_width' ) ); ?>;
		}

		.site-header, .site-header a {
			color: <?php echo sanitize_hex_color( $header_color ); ?>;
		}

		.site-header a:hover {
			color: <?php echo sanitize_hex_color( $header_link_over ); ?>;
		}

		.site-content {
			background: <?php echo sanitize_hex_color( $main_bg ); ?>;
			max-width: <?php echo esc_html( greenlet_css_width( 'main_width' ) ); ?>;
		}

		.entry-article, .sidebar > .wrap, #comments {
			background: <?php echo sanitize_hex_color( $content_bg ); ?>;
		}

		.semifooter {
			background: <?php echo sanitize_hex_color( $semifooter_bg ); ?>;
			color: <?php echo sanitize_hex_color( $semifooter_color ); ?>;
			max-width: <?php echo esc_html( greenlet_css_width( 'semifooter_width' ) ); ?>;
		}

		.site-footer {
			background: <?php echo sanitize_hex_color( $footer_bg ); ?>;
			color: <?php echo sanitize_hex_color( $footer_color ); ?>;
			max-width: <?php echo esc_html( greenlet_css_width( 'footer_width' ) ); ?>;
		}

		a, .entry-meta li {
			color: <?php echo sanitize_hex_color( $link_color ); ?>;
		}

		a:hover {
			color: <?php echo sanitize_hex_color( $link_hover ); ?>;
		}

		h1, h2, h3, h4, h5, h6, .entry-title a {
			color: <?php echo sanitize_hex_color( $heading_color ); ?>;
		}

		<?php
		// phpcs:enable
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

	add_action( 'wp_enqueue_scripts', 'greenlet_load_inline_styles' );
}
