<?php
/**
 * ColumnObject.
 *
 * @package greenlet\library
 */

/**
 * ColumnObject Class.
 *
 * Class to create columns based on the layout if set,
 * else based on various options like current template.
 *
 * @since   1.0.0
 * @global  object $wp_query Intricacies of single post or page.
 * @param   mixed  $cols     Columns as integer or string of integers separated by hyphen.
 */
class ColumnObject {

	/**
	 * Template name from options or template files.
	 *
	 * @var string
	 */
	public $template_name;

	/**
	 * Columns in the template as integer or string of integers separated by hyphen.
	 *
	 * @var mixed
	 */
	public $columns;

	/**
	 * Array of each columns (width) in the template.
	 *
	 * @var array
	 */
	public $array;

	/**
	 * Width of the main column.
	 *
	 * @var integer
	 */
	public $main_column;

	/**
	 * Total count of the columns array.
	 *
	 * @var integer
	 */
	public $total;

	/**
	 * Sequence of main and sidebar columns in the template.
	 *
	 * @var array
	 */
	public $sequence;

	/**
	 * ColumnObject constructor.
	 *
	 * @param int $cols Number of columns.
	 */
	public function __construct( $cols = 0 ) {

		$this->columns = $cols;

		// If cols variable is not set.
		if ( 0 === $cols ) {

			// The wp query.
			global $wp_query;

			if ( is_page() || is_single() ) {
				// If is single page or post.

				// Get template_name from post meta.
				$this->template_name = get_post_meta( $wp_query->post->ID, '_wp_page_template', true );
				$this->template_name = $this->template_name ? $this->template_name : 'default';

				// If template_name is default.
				if ( 'default' === $this->template_name ) {

					if ( is_page() ) {

						// Get columns, column sequence from options.
						$this->columns  = of_get_option( 'default_template' ) ? of_get_option( 'default_template' ) : '12';
						$this->sequence = of_get_option( 'default_sequence' ) ? of_get_option( 'default_sequence' ) : array( 'main' );
					}

					if ( is_single() ) {

						$this->columns  = of_get_option( 'default_post_template' ) ? of_get_option( 'default_post_template' ) : '12';
						$this->sequence = of_get_option( 'default_post_sequence' ) ? of_get_option( 'default_post_sequence' ) : array( 'main' );
					}
				} else {

					// Get template name from template file, sequence from post meta.
					$this->columns  = str_replace( '.php', '', basename( $this->template_name ) );
					$this->sequence = get_post_meta( $wp_query->post->ID, '_template_sequence', true );
				}
			} elseif ( is_home() ) {
				// If is home (post list) page.

				$this->columns  = of_get_option( 'home_template' ) ? of_get_option( 'home_template' ) : '12';
				$this->sequence = of_get_option( 'home_sequence' ) ? of_get_option( 'home_sequence' ) : array( 'main' );
			} elseif ( is_archive() || is_search() ) {
				// If is archive page.

				$this->columns  = of_get_option( 'archive_template' ) ? of_get_option( 'archive_template' ) : '12';
				$this->sequence = of_get_option( 'archive_sequence' ) ? of_get_option( 'archive_sequence' ) : array( 'main' );
			} else {
				$this->columns  = of_get_option( 'default_template' ) ? of_get_option( 'default_template' ) : '12';
				$this->sequence = of_get_option( 'default_sequence' ) ? of_get_option( 'default_sequence' ) : array( 'main' );
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
	 * @todo   Check if string is convertible.
	 * @return array
	 */
	public function cols_array() {
		return explode( '-', $this->columns );
	}
}
