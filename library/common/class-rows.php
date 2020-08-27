<?php
/**
 * Greenlet Rows.
 *
 * @package greenlet\library
 */

namespace Greenlet;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Rows Class.
 *
 * Class to create rows based on the layout if set,
 * else based on various options like current template.
 *
 * @see greenlet_cover()
 *
 * @since   1.0.0
 * @global  object $wp_query Intricacies of single post or page.
 * @param   mixed  $cols     Columns as integer or string of integers separated by hyphen.
 */
class Rows {

	/**
	 * Rows in the template as integer or string of integers separated by hyphen.
	 *
	 * @since 1.0.0
	 * @var   mixed
	 */
	public $rows;

	/**
	 * Rows constructor.
	 *
	 * @since 1.0.0
	 * @param int $rows Number of rows.
	 */
	public function __construct( $rows = 1 ) {
		$this->rows = $rows;
	}
}
