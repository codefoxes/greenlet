<?php
/**
 * WooCommerce Columns.
 *
 * @package greenlet\library\support\woocommerce
 */

namespace Greenlet\Support;

use Greenlet\Columns as GreenletColumns;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Woocommerce Columns Class.
 *
 * Class to create columns based on the layout if set,
 * else based on various options like current template.
 */
class Woo_Columns extends GreenletColumns {
	/**
	 * WooCommerce Columns constructor.
	 *
	 * @since 1.0.0
	 * @param int $cols Number of columns.
	 */
	public function __construct( $cols = 0 ) {
		// The wp query.
		global $wp_query;

		$default_layout = array(
			'template' => '8-4',
			'sequence' => array( 'main', 'sidebar-1' ),
		);

		// If is single page or product.
		if ( is_page() || is_product() ) {

			// Get template_name from post meta.
			$this->template_name = get_post_meta( $wp_query->post->ID, '_wp_page_template', true );
			$this->template_name = $this->template_name ? $this->template_name : 'default';

			if ( 'default' === $this->template_name ) {
				if ( is_product() ) {

					// Get columns, column sequence from options.
					$layout = gl_get_option( 'product_page_template', $default_layout );

					$this->columns  = isset( $layout['template'] ) ? $layout['template'] : '12';
					$this->sequence = isset( $layout['sequence'] ) ? $layout['sequence'] : array( 'main' );
				} else {

					$layout = gl_get_option( 'default_template', $default_layout );

					$this->columns  = isset( $layout['template'] ) ? $layout['template'] : '12';
					$this->sequence = isset( $layout['sequence'] ) ? $layout['sequence'] : array( 'main' );
				}
			} else {

				// Get template name from template file, sequence from post meta.
				$this->columns  = str_replace( '.php', '', basename( $this->template_name ) );
				$this->sequence = get_post_meta( $wp_query->post->ID, '_template_sequence', true );
			}
		} elseif ( is_archive() ) {
			if ( is_product_category() ) {

				$layout = gl_get_option( 'product_category_template', $default_layout );

				$this->columns  = isset( $layout['template'] ) ? $layout['template'] : '12';
				$this->sequence = isset( $layout['sequence'] ) ? $layout['sequence'] : array( 'main' );
			} elseif ( is_product_tag() ) {

				$layout = gl_get_option( 'product_tag_template', $default_layout );

				$this->columns  = isset( $layout['template'] ) ? $layout['template'] : '12';
				$this->sequence = isset( $layout['sequence'] ) ? $layout['sequence'] : array( 'main' );
			} elseif ( is_search() ) {

				$layout = gl_get_option( 'product_search_template', $default_layout );

				$this->columns  = isset( $layout['template'] ) ? $layout['template'] : '12';
				$this->sequence = isset( $layout['sequence'] ) ? $layout['sequence'] : array( 'main' );
			} else {

				$layout = gl_get_option( 'product_archive_template', $default_layout );

				$this->columns  = isset( $layout['template'] ) ? $layout['template'] : '12';
				$this->sequence = isset( $layout['sequence'] ) ? $layout['sequence'] : array( 'main' );
			}
		}
	}
}
