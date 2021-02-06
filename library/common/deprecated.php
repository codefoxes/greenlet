<?php
/**
 * Deprecated functions.
 *
 * @package greenlet\library\common
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! function_exists( 'greenlet_attribute' ) ) {
	/**
	 * Get schema added attributes.
	 *
	 * Returns extra attributes array for schema, rel, role etc.
	 *
	 * @since 1.0.0
	 *
	 * @param  array  $attributes HTML attributes.
	 * @param  string $primary    HTML class.
	 * @return array              Schema added attributes.
	 */
	function greenlet_attribute( $attributes, $primary ) {
		_deprecated_function( __FUNCTION__, '2.5.0', 'greenlet_attributes()' );

		return greenlet_attributes( $attributes, $primary );
	}
}
