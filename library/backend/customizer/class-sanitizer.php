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
	 * Sanitizes multiple checkbox control.
	 *
	 * @since  1.0.0
	 * @param  array $value Checkbox values.
	 * @return array
	 */
	public static function sanitize_multicheck( $value ) {
		return ( ! empty( $value ) ) ? array_map( 'sanitize_text_field', $value ) : array();
	}

	/**
	 * Sanitizes template selector control.
	 *
	 * @since  1.0.0
	 * @param  array $value Template and Sequence Values.
	 * @return array
	 */
	public static function sanitize_template_selector( $value ) {
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

	/**
	 * Sanitize cover layout item.
	 *
	 * @since  2.0.0
	 * @param  mixed $item Cover layout single item.
	 */
	public static function sanitize_cover_item( &$item ) {
		if ( 'string' === gettype( $item ) ) {
			$item = wp_kses_post( $item );
		}
	}

	/**
	 * Sanitize cover layout value.
	 *
	 * @since  2.0.0
	 * @param  array $value Input layout.
	 * @return array        Sanitized layout.
	 */
	public static function sanitize_cover( $value ) {
		array_walk_recursive( $value, array( 'Greenlet\Sanitizer', 'sanitize_cover_item' ) );
		return $value;
	}
}
