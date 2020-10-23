<?php
/**
 * Greenlet Columns.
 *
 * @package greenlet\library
 */

namespace Greenlet;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Columns Class.
 *
 * Class to create columns based on the layout if set,
 * else based on various options like current template.
 *
 * @see greenlet_widget_init()
 * @see greenlet_cover()
 * @see greenlet_do_main_container()
 *
 * @since   1.0.0
 * @global  object $wp_query Intricacies of single post or page.
 * @param   mixed  $cols     Columns as integer or string of integers separated by hyphen.
 */
class Columns {

	/**
	 * Template name from options or template files.
	 *
	 * @since 1.0.0
	 * @var   string
	 */
	public $template_name;

	/**
	 * Columns in the template as integer or string of integers separated by hyphen.
	 *
	 * @since 1.0.0
	 * @var   mixed
	 */
	public $columns;

	/**
	 * Array of each columns (width) in the template.
	 *
	 * @since 1.0.0
	 * @var   array
	 */
	public $array;

	/**
	 * Width of the main column.
	 *
	 * @since 1.0.0
	 * @var   integer
	 */
	public $main_column;

	/**
	 * Total count of the columns array.
	 *
	 * @since 1.0.0
	 * @var   integer
	 */
	public $total;

	/**
	 * Sequence of main and sidebar columns in the template.
	 *
	 * @since 1.0.0
	 * @var   array
	 */
	public $sequence;

	/**
	 * Columns constructor.
	 *
	 * @since 1.0.0
	 * @param int $cols Number of columns.
	 */
	public function __construct( $cols = 0 ) {

		$this->columns = $cols;

		// If cols variable is not set.
		if ( 0 === $cols ) {

			// The wp query.
			global $wp_query;

			$default_layout = array(
				'template' => '12',
				'sequence' => array( 'main' ),
			);

			$default_home_layout = array(
				'template' => '8-4',
				'sequence' => array( 'main', 'sidebar-1' ),
			);

			if ( is_page() || is_single() ) {
				// If is single page or post.

				// Get template_name from post meta.
				$layout = get_post_meta( $wp_query->post->ID, 'greenlet_layout', true );

				$this->template_name = isset( $layout['template'] ) ? $layout['template'] : 'default';

				$this->columns  = isset( $layout['template'] ) ? $layout['template'] : '12';
				$this->sequence = isset( $layout['sequence'] ) ? $layout['sequence'] : array( 'main' );

				// If template_name is default.
				if ( 'default' === $this->template_name ) {

					if ( is_page() ) {

						// Get columns, column sequence from options.
						$layout = gl_get_option( 'default_template', $default_layout );

						$this->columns  = isset( $layout['template'] ) ? $layout['template'] : '12';
						$this->sequence = isset( $layout['sequence'] ) ? $layout['sequence'] : array( 'main' );
					}

					if ( is_single() ) {
						$layout = gl_get_option( 'post_template', $default_layout );

						$this->columns  = isset( $layout['template'] ) ? $layout['template'] : '12';
						$this->sequence = isset( $layout['sequence'] ) ? $layout['sequence'] : array( 'main' );
					}
				}
			} elseif ( is_home() ) {
				// If is home (post list) page.

				$layout = gl_get_option( 'home_template', $default_home_layout );

				$this->columns  = isset( $layout['template'] ) ? $layout['template'] : '9-3';
				$this->sequence = isset( $layout['sequence'] ) ? $layout['sequence'] : array( 'main', 'sidebar-1' );
			} elseif ( is_archive() || is_search() ) {
				// If is archive page.

				$layout = gl_get_option( 'archive_template', $default_layout );

				$this->columns  = isset( $layout['template'] ) ? $layout['template'] : '12';
				$this->sequence = isset( $layout['sequence'] ) ? $layout['sequence'] : array( 'main' );
			} else {
				$layout = gl_get_option( 'default_template', $default_layout );

				$this->columns  = isset( $layout['template'] ) ? $layout['template'] : '12';
				$this->sequence = isset( $layout['sequence'] ) ? $layout['sequence'] : array( 'main' );
			}
		}

		// Array of each columns from options for template.
		$this->array = explode( '-', $this->columns );

		// Detect column of maximum width.
		$this->main_column = max( $this->array );

		// Calculate total number of columns.
		$this->total = count( $this->array );
	}

	/**
	 * Convert Columns String into Array.
	 *
	 * @since  1.0.0
	 * @return array
	 */
	public function cols_array() {
		return explode( '-', $this->columns );
	}
}
