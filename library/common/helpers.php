<?php
/**
 * Common Helper functions.
 *
 * @package greenlet\library\common
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! function_exists( 'gl_get_option' ) ) {
	/**
	 * Retrieve Greenlet theme option.
	 *
	 * @since 1.0.0
	 *
	 * @param  string      $option_name  Option Name.
	 * @param  string|bool $default      Default Value to return.
	 * @return mixed                     Option Value.
	 */
	function gl_get_option( $option_name, $default = false ) {
		return get_theme_mod( $option_name, $default );
	}
}


if ( ! function_exists( 'greenlet_defer_style' ) ) {
	/**
	 * Defer stylesheet.
	 *
	 * @since 1.0.0
	 * @param string $href Link href.
	 */
	function greenlet_defer_style( $href ) {
		// Todo: Prefetch if external URL.
		printf( '<link rel="%1$s" href="%2$s" media="none" onload="this.media=\'all\'">', 'stylesheet', esc_url( $href ) );
		printf( '<noscript><link rel="%1$s" href="%2$s"></noscript>', 'stylesheet', esc_url( $href ) );
	}
}


if ( ! function_exists( 'greenlet_enqueue_style' ) ) {
	/**
	 * Enqueue stylesheet.
	 *
	 * @since 1.0.0
	 * @param string           $handle Stylesheet handle.
	 * @param string           $src    Link href.
	 * @param bool|null        $defer  Whether to defer.
	 * @param array            $deps   An array of registered stylesheet handles.
	 * @param string|bool|null $ver    Stylesheet version number.
	 */
	function greenlet_enqueue_style( $handle, $src, $defer = null, $deps = array(), $ver = false ) {
		if ( null === $defer ) {
			$defer = gl_get_option( 'defer_css', '1' );
		}
		if ( false !== $defer ) {
			greenlet_defer_style( $src );
			return;
		}

		wp_enqueue_style( $handle, $src, $deps, $ver );
	}
}


if ( ! function_exists( 'minify_css' ) ) {
	/**
	 * Minify CSS.
	 *
	 * @since  1.0.0
	 * @param  string $css Input CSS.
	 * @return string     Minified CSS
	 */
	function minify_css( $css = '' ) {
		if ( ! empty( $css ) ) {
			$css = preg_replace( '!/\*[^*]*\*+([^/][^*]*\*+)*/!', '', $css );
			$css = str_replace( array( "\r\n", "\r", "\n", "\t", '  ', '    ', '    ' ), '', $css );
			$css = str_replace( ', ', ',', $css );
			$css = str_replace( ' {', '{', $css );
		}

		return $css;
	}
}


if ( ! function_exists( 'greenlet_enqueue_inline_style' ) ) {
	/**
	 * Enqueue inline styles.
	 *
	 * @since 1.0.0
	 * @param string $handle Stylesheet handle.
	 * @param string $data   CSS Data.
	 */
	function greenlet_enqueue_inline_style( $handle, $data ) {
		wp_register_style( $handle, false, array(), GREENLET_VERSION );
		wp_enqueue_style( $handle );
		wp_add_inline_style( $handle, minify_css( $data ) );
	}
}


if ( ! function_exists( 'is_numeric_array' ) ) {
	/**
	 * Check if the array is numeric.
	 *
	 * @since  1.0.0
	 * @param  array $array Input array.
	 * @return bool         Whether array is numeric.
	 */
	function is_numeric_array( $array ) {
		$nonints = preg_grep( '/\D/', $array );
		return( 0 === count( $nonints ) );
	}
}


if ( ! function_exists( 'greenlet_get_min_sidebars' ) ) {
	/**
	 * Get Minimum sidebars
	 * Calculates minimum sidebars required based on the
	 * default template options and template file names.
	 *
	 * @since  1.0.0
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

		$default_layout = array( 'template' => '12' );

		$layouts = array(
			gl_get_option( 'default_template', $default_layout ),
			gl_get_option( 'post_template', $default_layout ),
			gl_get_option( 'home_template', $default_layout ),
			gl_get_option( 'archive_template', $default_layout ),
		);

		foreach ( $layouts as $layout ) {
			// Get template names from options, else set default values.
			$files[] = isset( $layout['template'] ) ? $layout['template'] : '12';
		}

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

if ( ! function_exists( 'top_bottom_default_columns' ) ) {
	/**
	 * Get default columns for Topbar, Header, Semi-footer and Footer.
	 *
	 * @since  1.0.0
	 * @param  string $pos Position.
	 * @return string      Columns String.
	 */
	function top_bottom_default_columns( $pos ) {
		switch ( $pos ) {
			case 'topbar':
				return '4-8';
			case 'header':
				return '3-9';
			case 'semifooter':
				return '4-4-4';
			case 'footer':
				return '12';
			default:
				return '12';
		}
	}
}

if ( ! function_exists( 'greenlet_get_logo' ) ) {
	/**
	 * Get logo URL.
	 *
	 * @since  1.1.0
	 * @return string Logo URL.
	 */
	function greenlet_get_logo() {
		$logo_id  = get_theme_mod( 'custom_logo' );
		$logo_url = false;

		if ( false !== $logo_id ) {
			$logo_url = wp_get_attachment_image_url( $logo_id, 'full' );
		}

		return apply_filters( 'greenlet_logo', $logo_url );
	}
}

if ( ! function_exists( 'greenlet_get_file_contents' ) ) {
	/**
	 * Get file Contents.
	 *
	 * @since  1.1.0
	 * @param  string $file_path File Path.
	 * @return false|string      File Contents.
	 */
	function greenlet_get_file_contents( $file_path ) {
		ob_start();
		include $file_path;
		$file_contents = ob_get_contents();
		ob_end_clean();
		return $file_contents;
	}
}

if ( ! function_exists( 'greenlet_font_defaults' ) ) {
	/**
	 * Get font default fallbacks and variants.
	 *
	 * @since  1.1.0
	 * @return array Font defaults.
	 */
	function greenlet_font_defaults() {
		return array(
			'fallback' => array(
				'default'     => array( '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji' ),
				'sans-serif'  => array( 'Helvetica', 'Verdana', 'Arial', 'sans-serif' ),
				'serif'       => array( 'Times', 'Georgia', 'serif' ),
				'monospace'   => array( 'Courier', 'monospace' ),
				'display'     => array( 'Helvetica', 'Verdana', 'Arial', 'sans-serif' ),
				'handwriting' => array( 'Comic Sans MS', 'cursive', 'sans-serif' ),
			),
			'variants' => array(
				'normal' => array( '100', '200', '300', '400', '500', '600', '700', '800', '900' ),
				'italic' => array( '100', '200', '300', '400', '500', '600', '700', '800', '900' ),
			),
		);
	}
}
