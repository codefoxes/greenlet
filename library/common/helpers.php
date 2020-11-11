<?php
/**
 * Common Helper functions.
 *
 * @package greenlet\library\common
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Escape array theme mod.
 *
 * @since  1.2.5
 * @param  mixed $item Theme mod item.
 * @return array|string
 */
function greenlet_esc_array_mod( $item ) {
	if ( 'array' === gettype( $item ) ) {
		$escaped = array_map( 'greenlet_esc_array_mod', $item );
	} else {
		$escaped = esc_html( $item );
	}
	return $escaped;
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
		$mod  = get_theme_mod( $option_name, $default );
		$type = gettype( $mod );
		if ( 'boolean' === $type ) {
			$mod = ( true === $mod || 'true' === $mod || 1 === $mod || '1' === $mod ) ? true : false;
		} elseif ( in_array( $type, array( 'string', 'double', 'integer' ), true ) ) {
			$mod = esc_html( $mod );
		} elseif ( 'array' === $type ) {
			$mod = array_map( 'greenlet_esc_array_mod', $mod );
		}
		return $mod;
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
	 * @since 2.0.0            Added $inline, Moved $defer to last parameter.
	 * @param string           $handle Stylesheet handle.
	 * @param string           $src    Link href.
	 * @param array            $deps   An array of registered stylesheet handles.
	 * @param string|bool|null $ver    Stylesheet version number.
	 * @param bool|null        $inline Whether to enqueue inline.
	 * @param bool|null        $defer  Whether to defer.
	 */
	function greenlet_enqueue_style( $handle, $src, $deps = array(), $ver = false, $inline = null, $defer = null ) {
		if ( null === $inline ) {
			$inline = gl_get_option( 'inline_css', '1' );
		}

		if ( null === $defer ) {
			$defer = gl_get_option( 'defer_css', '1' );
		}

		if ( false !== $inline ) {
			if ( '/' === substr( $src, 0, 1 ) ) {
				$path = ABSPATH . $src;
			} else {
				$path = str_replace( get_home_url(), ABSPATH, $src );
			}
			ob_start();
			require_once $path;
			greenlet_enqueue_inline_style( $handle, ob_get_clean() );
			return;
		}

		if ( false !== $defer ) {
			if ( null !== $ver ) {
				if ( false === $ver ) {
					if ( strpos( $handle, 'wp-' ) === 0 ) {
						global $wp_version;
						$src .= ( wp_parse_url( $src, PHP_URL_QUERY ) ? '&' : '?' ) . 'ver=' . $wp_version;
					} else {
						$src .= ( wp_parse_url( $src, PHP_URL_QUERY ) ? '&' : '?' ) . 'ver=' . GREENLET_VERSION;
					}
				} else {
					$src .= ( wp_parse_url( $src, PHP_URL_QUERY ) ? '&' : '?' ) . 'ver=' . $ver;
				}
			}
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

if ( ! function_exists( 'greenlet_enqueue_script' ) ) {
	/**
	 * Enqueue script.
	 *
	 * @since 2.0.0
	 * @param string           $handle    Script handle.
	 * @param string           $src       Script src.
	 * @param array            $deps      An array of registered script handles.
	 * @param string|bool|null $ver       Script version number.
	 * @param bool             $in_footer Whether to enqueue in footer.
	 * @param bool|null        $inline    Whether to enqueue inline.
	 */
	function greenlet_enqueue_script( $handle, $src, $deps = array(), $ver = false, $in_footer = true, $inline = null ) {
		if ( null === $inline ) {
			$inline = gl_get_option( 'inline_js', '1' );
		}
		if ( false !== $inline ) {
			$path = str_replace( get_home_url(), ABSPATH, $src );
			ob_start();
			require_once $path;
			greenlet_enqueue_inline_script( $handle, ob_get_clean(), $deps );
			return;
		}

		wp_enqueue_script( $handle, $src, $deps, $ver, $in_footer );
	}
}

if ( ! function_exists( 'greenlet_enqueue_inline_script' ) ) {
	/**
	 * Enqueue inline script.
	 *
	 * @since 2.0.0
	 * @param string $handle Script handle.
	 * @param string $data   CSS Data.
	 * @param array  $deps   An array of registered script handles.
	 */
	function greenlet_enqueue_inline_script( $handle, $data, $deps = array() ) {
		wp_register_script( $handle, false, $deps, GREENLET_VERSION, true );
		wp_enqueue_script( $handle );
		wp_add_inline_script( $handle, $data );
	}
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
		$width = gl_get_option( $option, $default );
		return ( '' === $width || false === $width ) ? $default : $width;
	}
}

if ( ! function_exists( 'greenlet_add_font' ) ) {
	/**
	 * Add font details to the fonts list.
	 *
	 * @since 1.1.0
	 * @param array $font Font details array.
	 */
	function greenlet_add_font( $font ) {
		global $greenlet_custom_fonts;
		if ( null === $greenlet_custom_fonts ) {
			$greenlet_custom_fonts = array();
		}
		$source = $font['source'];
		$family = $font['family'];
		$style  = ( 'normal' === $font['style'] ) ? '' : 'i';
		$weight = $font['weight'] . $style;
		if ( isset( $greenlet_custom_fonts[ $source ] ) ) {
			if ( isset( $greenlet_custom_fonts[ $source ][ $family ] ) ) {
				if ( ! in_array( $weight, $greenlet_custom_fonts[ $source ][ $family ], true ) ) {
					$greenlet_custom_fonts[ $source ][ $family ][] = $weight;
				}
			} else {
				$greenlet_custom_fonts[ $source ][ $family ] = array( $weight );
			}
		} else {
			$greenlet_custom_fonts[ $source ] = array(
				$family => array( $weight ),
			);
		}
	}
}

if ( ! function_exists( 'greenlet_add_style' ) ) {
	/**
	 * Add inline style declarations to global array.
	 *
	 * @since 1.1.0
	 * @param string       $selector       CSS Selector.
	 * @param string|array $style_property CSS Property or array of properties and values..
	 * @param string|array $style_value    CSS Values.
	 * @param string       $suffix         Value suffix.
	 * @param string       $media          Media query.
	 */
	function greenlet_add_style( $selector, $style_property, $style_value = '', $suffix = '', $media = '' ) {
		if ( false === $style_property ) {
			return;
		}

		global $greenlet_inline;
		if ( null === $greenlet_inline ) {
			$greenlet_inline = array( 'media' => array() );
		}

		if ( is_array( $style_property ) ) {
			foreach ( $style_property as $property_values ) {
				$suffix = isset( $property_values[2] ) ? $property_values[2] : '';
				$media  = isset( $property_values[3] ) ? $property_values[3] : '';
				greenlet_add_style( $selector, $property_values[0], $property_values[1], $suffix, $media );
			}
			return;
		}

		if ( 'font' === $style_property ) {
			if ( ! isset( $style_value['category'] ) ) {
				return;
			}
			$font_family  = ( 'Default' === $style_value['family'] ) ? 'system-ui' : $style_value['family'];
			$defaults     = greenlet_font_defaults();
			$all_fonts    = array_unique( array_merge( array( $font_family ), $defaults['fallback'][ $style_value['category'] ] ) );
			$font_family  = implode( ', ', $all_fonts );
			$declarations = array(
				'font-family: ' . $font_family . ';',
				'font-style: ' . $style_value['style'] . ';',
				'font-weight: ' . $style_value['weight'] . ';',
				'font-size: ' . $style_value['size'] . ';',
			);
			if ( isset( $style_value['source'] ) && 'system' !== $style_value['source'] ) {
				greenlet_add_font( $style_value );
			}
		} else {
			$declarations = array( $style_property . ': ' . $style_value . $suffix . ';' );
		}
		if ( '' !== $media ) {
			if ( isset( $greenlet_inline['media'][ $media ] ) ) {
				if ( isset( $greenlet_inline['media'][ $media ][ $selector ] ) ) {
					$greenlet_inline['media'][ $media ][ $selector ] = array_merge( $greenlet_inline['media'][ $media ][ $selector ], $declarations );
				} else {
					$greenlet_inline['media'][ $media ][ $selector ] = $declarations;
				}
			} else {
				$greenlet_inline['media'][ $media ] = array( $selector => $declarations );
			}
		} elseif ( isset( $greenlet_inline[ $selector ] ) ) {
			$greenlet_inline[ $selector ] = array_merge( $greenlet_inline[ $selector ], $declarations );
		} else {
			$greenlet_inline[ $selector ] = $declarations;
		}
	}
}

if ( ! function_exists( 'greenlet_print_inline_styles' ) ) {
	/**
	 * Print inline styles.
	 *
	 * @since 1.1.0
	 */
	function greenlet_print_inline_styles() {
		global $greenlet_inline;
		if ( is_array( $greenlet_inline ) ) {
			foreach ( $greenlet_inline as $selector => $declarations ) {
				if ( 'media' === $selector ) {
					foreach ( $declarations as $query => $query_styles ) {
						echo '@media (' . wp_kses( $query, null ) . ') {';
						foreach ( $query_styles as $media_selector => $media_declarations ) {
							echo wp_kses( $media_selector, null ) . '{';
							foreach ( $media_declarations as $media_declaration ) {
								echo wp_kses( $media_declaration, null );
							}
							echo '}';
						}
						echo '}';
					}
				} else {
					echo $selector . '{'; // phpcs:ignore
					foreach ( $declarations as $declaration ) {
						echo wp_kses( $declaration, null );
					}
					echo '}';
				}
			}
		}
	}
}

if ( ! function_exists( 'greenlet_enqueue_fonts' ) ) {
	/**
	 * Enqueue fonts.
	 *
	 * @since 1.1.0
	 */
	function greenlet_enqueue_fonts() {
		global $greenlet_custom_fonts;
		if ( ! is_array( $greenlet_custom_fonts ) ) {
			return;
		}
		foreach ( $greenlet_custom_fonts as $source => $fonts ) {
			if ( ! is_array( $fonts ) ) {
				return;
			}

			if ( 'google' === $source ) {
				$args = array();
				foreach ( $fonts as $family => $weights ) {
					$family = str_replace( ' ', '+', $family );
					$args[] = $family . ':' . implode( ',', $weights );
				}
				$font_args = array(
					'family'  => implode( '|', $args ),
					'display' => 'fallback',
				);
				$font_url  = add_query_arg( $font_args, '//fonts.googleapis.com/css' );
			} else {
				$font_url = apply_filters( "greenlet_{$source}_font_url", '', $fonts );
			}

			greenlet_enqueue_style( 'greenlet-google-fonts', $font_url );
		}
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
			scandir( GREENLET_TEMPLATE_DIR ),
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

if ( ! function_exists( 'greenlet_get_menus' ) ) {
	/**
	 * Get all menus.
	 */
	function greenlet_get_menus() {
		$menus     = array();
		$nav_menus = wp_get_nav_menus();
		foreach ( $nav_menus as $menu ) {
			$menus[ $menu->slug ] = $menu->name;
		}
		return $menus;
	}
}

if ( ! function_exists( 'greenlet_cover_layout_items' ) ) {
	/**
	 * Get cover layout items.
	 *
	 * @since 2.0.0
	 *
	 * @param  string $pos Cover layout position.
	 * @return array       Cover layout items Array.
	 */
	function greenlet_cover_layout_items( $pos = 'header' ) {
		$items = array(
			array(
				'id'        => 'logo',
				'name'      => __( 'Logo', 'greenlet' ),
				'type'      => 'logo',
				'template'  => 'templates/logo',
				'positions' => array( 'header', 'footer' ),
			),
			array(
				'id'        => 'menu',
				'name'      => __( 'Menu', 'greenlet' ),
				'template'  => 'templates/menu/menu',
				'positions' => array( 'header', 'footer' ),
				'meta'      => array(
					'slug'    => array(
						'name'  => __( 'Menu', 'greenlet' ),
						'type'  => 'select',
						'items' => greenlet_get_menus(),
					),
					'toggler' => array(
						'name'  => __( 'Mobile toggler', 'greenlet' ),
						'type'  => 'select',
						'items' => array(
							'enable'  => __( 'Enable', 'greenlet' ),
							'disable' => __( 'Disable', 'greenlet' ),
						),
					),
				),
			),
			array(
				'id'        => 'menu-toggler',
				'name'      => __( 'Menu Toggler', 'greenlet' ),
				'template'  => 'templates/menu/toggler',
				'positions' => array( 'header', 'footer' ),
				'meta'      => array(
					'target' => array(
						'name'  => __( 'Target', 'greenlet' ),
						'type'  => 'select',
						'items' => array_merge( get_registered_nav_menus(), array( 'query' => 'Query' ) ),
					),
					'query'  => array(
						'name' => __( 'Query', 'greenlet' ),
						'type' => 'input',
					),
					'effect' => array(
						'name'  => __( 'Effect', 'greenlet' ),
						'type'  => 'select',
						'items' => array(
							'from-top'    => __( 'From Top', 'greenlet' ),
							'from-bottom' => __( 'From Bottom', 'greenlet' ),
							'from-right'  => __( 'From Right', 'greenlet' ),
							'from-left'   => __( 'From Left', 'greenlet' ),
						),
					),
				),
			),
		);

		$items = apply_filters( 'greenlet_cover_layout_items', $items );

		$cover_items = array();
		foreach ( $items as $item ) {
			if ( ! isset( $item['positions'] ) || in_array( $pos, $item['positions'], true ) ) {
				$cover_items[ $item['id'] ] = $item;
			}
		}

		return $cover_items;
	}
}

if ( ! function_exists( 'greenlet_cover_layout_defaults' ) ) {
	/**
	 * Gets cover (header, footer) columns.
	 *
	 * @since  2.0.0
	 * @param  string $position Cover position.
	 * @return array            List of columns
	 */
	function greenlet_cover_layout_defaults( $position = 'header' ) {
		$header = array(
			array(
				'columns' => '3-9',
				'primary' => true,
				'items'   => array(
					1 => array( 'logo' ),
					2 => array(
						array(
							'id'   => 'menu',
							'meta' => array(
								'slug'    => false,
								'toggler' => 'enable',
							),
						),
					),
				),
			),
		);
		$footer = array(
			array(
				'columns' => '12',
				'primary' => true,
				'items'   => array(),
			),
		);
		return $$position;
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
