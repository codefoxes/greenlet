<?php
/**
 * CSS Parser.
 *
 * @package greenlet\library\backend\helpers
 */

namespace Greenlet;

/**
 * Class Cssparser
 *
 * @package Greenlet
 */
class Cssparser {
	/**
	 * Raw CSS.
	 *
	 * @var $raw_css
	 */
	protected $raw_css;

	/**
	 * CSS.
	 *
	 * @var $css
	 */
	public $css;

	/**
	 * Parse CSS from string.
	 *
	 * @param string $str CSS string.
	 * @throws \Exception If empty string.
	 */
	public function parse_string( $str ) {
		if ( ! empty( $str ) ) {
			$this->raw_css = $str;
			$this->parse_css();
		} else {
			throw new \Exception( __( 'String is empty.', 'greenlet' ) );
		}
	}

	/**
	 * Parse CSS.
	 *
	 * @throws \Exception If css is not parsable.
	 */
	private function parse_css() {
		preg_match_all( '/(.+?)\s?{\s?(.+?)\s?}/', $this->raw_css, $level1 );
		unset( $this->raw_css );
		if ( 3 === count( $level1 ) ) {
			$parent       = count( $level1[1] );
			$parent_value = count( $level1[2] );

			if ( $parent === $parent_value ) {
				for ( $i = 0; $i < $parent; $i++ ) {
					$level2 = explode( ';', trim( $level1[2][ $i ] ) );
					foreach ( $level2 as $l2 ) {
						if ( ! empty( $l2 ) ) {
							$level3 = explode( ':', trim( $l2 ) );
							$this->css[ $this->clean( $level1[1][ $i ] ) ][ $this->clean( $level3[0] ) ] = $this->clean( $level3[1] );
							unset( $level3 );
						}
					}
					unset( $level2, $l2 );
				}
			} else {
				throw new \Exception( __( 'css is not parsable.', 'greenlet' ) );
			}
			unset( $level1 );
		} else {
			throw new \Exception( __( 'css is not parsable.', 'greenlet' ) );
		}
	}

	/**
	 * Find exact selector rule.
	 *
	 * @param string $parent Selector.
	 * @return array
	 */
	public function find_parent( $parent ) {
		$parent = $this->clean( $parent );
		if ( isset( $this->css[ $parent ] ) ) {
			return $this->css[ $parent ];
		} else {
			return array();
		}
	}

	/**
	 * Check if is correct selector.
	 *
	 * @param string $key      Selector key.
	 * @param string $selector Selector.
	 * @return bool
	 */
	public function is_correct_selector( $key, $selector ) {
		if ( $key === $selector ) {
			return true;
		}
		$sel_array = explode( ',', $key );
		$sel_array = explode( ' ', $sel_array[ key( preg_grep( '/' . $selector . '/i', $sel_array ) ) ] );
		$sel_array = explode( '>', $sel_array[ count( $sel_array ) - 1 ] );
		$sel_array = explode( '+', $sel_array[ count( $sel_array ) - 1 ] );
		$sel_array = explode( '~', $sel_array[ count( $sel_array ) - 1 ] );

		$key = $sel_array[ count( $sel_array ) - 1 ];

		if ( $key === $selector ) {
			return true;
		}

		if ( false === strpos( $key, $selector ) ) {
			return false;
		} else {
			// Else $key can be different target than $selector.
			return true;
		}
	}

	/**
	 * Find selector rule.
	 *
	 * @param string $selector Selector.
	 * @return array
	 */
	public function find_selector( $selector ) {
		$results  = array();
		$selector = $this->clean( $selector );
		foreach ( $this->css as $key1 => $css ) {
			if ( false !== strpos( $key1, $selector ) ) {
				if ( ! $this->is_correct_selector( $key1, $selector ) ) {
					continue;
				}
				if ( isset( $results[ $selector ] ) ) {
					$results[ $selector ] = array_merge( $results[ $selector ], $this->css[ $key1 ] );
				} else {
					$results[ $selector ] = $this->css[ $key1 ];
				}
			}
		}
		return $results;
	}

	/**
	 * Clean a CSS string.
	 *
	 * @param string $value String.
	 * @return string
	 */
	private function clean( $value ) {
		return addslashes( trim( $value ) );
	}
}
