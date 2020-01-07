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
	 * @param string $css CSS String.
	 *
	 * @return string Sanitized CSS.
	 */
	public static function sanitize_css( $css ) {
		// Todo: Sanitize css.
		return $css;
	}

	/**
	 * Sanitizes multiple checkbox control.
	 *
	 * @param string $value Checkbox values.
	 * @return array
	 */
	public static function sanitize_multicheck( $value ) {
		$value = json_decode( $value );

		if ( json_last_error() !== JSON_ERROR_NONE ) {
			return array();
		}

		return ( ! empty( $value ) ) ? array_map( 'sanitize_text_field', $value ) : array();
	}
}
