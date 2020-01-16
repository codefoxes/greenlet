<?php
/**
 * Theme Styles and Scripts.
 *
 * @package greenlet\library\frontend
 */

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
		$main_width = gl_get_option( 'container_width', '1170px' );
		$main_width = ( '' === $main_width ) ? '1170px' : $main_width;
		$main_class = '.container';

		$show_title   = gl_get_option( 'show_title', '1' );
		$show_tagline = gl_get_option( 'show_tagline', '1' );
		$site_bg      = gl_get_option( 'site_bg', '#f5f5f5' );
		$header_bg    = gl_get_option( 'header_bg', '#fff' );
		$header_color = gl_get_option( 'header_color', '#33691e' );
		$footer_bg    = gl_get_option( 'footer_bg', '#212121' );
		$footer_color = gl_get_option( 'footer_color', '#fff' );

		$fixed_topbar = gl_get_option( 'fixed_topbar', false );

		$critical_css = gl_get_option( 'critical_css', '' );
		$defer_css    = gl_get_option( 'defer_css', false );

		?>
		<style type="text/css">
			@media (min-width: 1281px) {
			<?php echo esc_html( $main_class ); ?> {
				max-width: <?php echo esc_html( $main_width ); ?>;
			}
			}

			body {
				background: <?php echo sanitize_hex_color( $site_bg ); // phpcs:ignore ?>;
			}

			.site-header {
				background: <?php echo sanitize_hex_color( $header_bg ); // phpcs:ignore ?>;
			}

			.site-header, .site-header a {
				color: <?php echo sanitize_hex_color( $header_color ); // phpcs:ignore ?>;
			}

			.site-footer {
				background: <?php echo sanitize_hex_color( $footer_bg ); // phpcs:ignore ?>;
				color: <?php echo sanitize_hex_color( $footer_color ); // phpcs:ignore ?>;
			}

			<?php
			if ( false === $show_title ) {
				echo '.site-name { display: none; }';
			}
			if ( false === $show_tagline ) {
				echo '.site-tagline { display: none; }';
			}

			if ( false !== $defer_css && '' !== $critical_css ) {
				echo $critical_css;
			}

			if ( false !== $fixed_topbar ) {
				echo '.topbar { position: sticky; }';
			}
			?>
		</style>
		<?php

		// Todo: Move this somewhere else.
		if ( false !== $fixed_topbar ) {
			add_filter(
				'body_class',
				function ( $classes ) {
					$classes[] = 'fixed-topbar';
					return $classes;
				}
			);
		}
	}

	add_action( 'wp_head', 'greenlet_load_wp_head' );
}
