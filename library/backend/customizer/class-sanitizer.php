<?php
/**
 * Sanitizer for Customizer.
 *
 * @package greenlet\library\admin\customizer
 */

namespace Greenlet;

/**
 * Sanitizer for Customizer.
 *
 * @since  1.0.0
 */
class Sanitizer {

	/**
	 * Sanitizes css string.
	 *
	 * @since  1.0.0
	 * @access public
	 * @param  string $css CSS String.
	 *
	 * @return string Sanitized CSS.
	 */
	public static function sanitize_css( $css ) {
		return $css;
	}

	/**
	 * Sanitizes multiple checkbox control.
	 *
	 * @since  1.0.0
	 * @param  string $value Checkbox values.
	 * @return array
	 */
	public static function sanitize_multicheck( $value ) {
		$value = json_decode( $value );

		if ( json_last_error() !== JSON_ERROR_NONE ) {
			return array();
		}

		return ( ! empty( $value ) ) ? array_map( 'sanitize_text_field', $value ) : array();
	}

	/**
	 * Sanitizes template selector control.
	 *
	 * @since  1.0.0
	 * @param  string $value Template and Sequence Values.
	 * @return array
	 */
	public static function sanitize_template_selector( $value ) {
		$value = json_decode( $value, true );

		if ( json_last_error() !== JSON_ERROR_NONE ) {
			return array();
		}

		return ( ! empty( $value ) ) ? $value : array();
	}

	/**
	 * Sanitize rgba and hex colors.
	 *
	 * @since  1.1.0
	 * @param  string $color Input color.
	 * @return string        Sanitized color.
	 */
	public static function sanitize_color( $color ) {
		if ( empty( $color ) || is_array( $color ) ) {
			return '';
		}

		if ( false === strpos( $color, 'rgba' ) ) {
			return sanitize_hex_color( $color );
		}

		$color = str_replace( ' ', '', $color );
		sscanf( $color, 'rgba(%d,%d,%d,%f)', $red, $green, $blue, $alpha );
		return 'rgba(' . $red . ',' . $green . ',' . $blue . ',' . $alpha . ')';
	}
}
