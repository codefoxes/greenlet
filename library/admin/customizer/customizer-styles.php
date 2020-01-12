<?php
/**
 * Customizer Styles.
 *
 * @package greenlet\library\admin\customizer
 */

if ( ! function_exists( 'gl_get_option' ) ) {
	/**
	 * Retrieve Greenlet theme option.
	 *
	 * @since 1.0.0
	 *
	 * @param string      $option_name  Option Name.
	 * @param string|bool $default      Default Value to return.
	 * @return mixed                    Option Value.
	 */
	function gl_get_option( $option_name, $default = false ) {
		return get_theme_mod( $option_name, $default );
	}
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
		$header_bg    = gl_get_option( 'header_bg', '#7CB342' );
		$header_color = gl_get_option( 'header_color', '#fff' );
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
