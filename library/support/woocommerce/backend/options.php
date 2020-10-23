<?php
/**
 * Customizer WooCommerce options.
 *
 * @package greenlet\library\support\woocommerce\backend
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Greenlet WooCommerce customizer options.
 *
 * @since  1.0.0
 * @param array $options Default options array.
 * @return array         Updated options array.
 */
function greenlet_woo_options( $options ) {
	$archive_count = array_combine( range( 1, 40 ), range( 1, 40 ) );
	array_push( $archive_count, 'unlimited' );

	$archive_columns = array_combine( range( 1, 12 ), range( 1, 12 ) );

	$options[] = array(
		'type' => 'section',
		'id'   => 'shop_layout',
		'args' => array(
			'title' => __( 'Shop Layout', 'greenlet' ),
			'panel' => 'woocommerce',
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'product_page_template',
		'sargs' => array(
			'default'           => array(
				'template' => '8-4',
				'sequence' => array( 'main', 'sidebar-1' ),
			),
			'sanitize_callback' => array( 'Greenlet\Sanitizer', 'sanitize_template_selector' ),
		),
		'cargs' => array(
			'type'      => 'template-sequence',
			'section'   => 'shop_layout',
			'label'     => __( 'Product Page Layout', 'greenlet' ),
			'templates' => greenlet_template_images(),
			'columns'   => greenlet_column_content_options(),
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'product_archive_template',
		'sargs' => array(
			'default'           => array(
				'template' => '8-4',
				'sequence' => array( 'main', 'sidebar-1' ),
			),
			'sanitize_callback' => array( 'Greenlet\Sanitizer', 'sanitize_template_selector' ),
		),
		'cargs' => array(
			'type'      => 'template-sequence',
			'section'   => 'shop_layout',
			'label'     => __( 'Product Archive (Shop) Layout', 'greenlet' ),
			'templates' => greenlet_template_images(),
			'columns'   => greenlet_column_content_options(),
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'product_category_template',
		'sargs' => array(
			'default'           => array(
				'template' => '8-4',
				'sequence' => array( 'main', 'sidebar-1' ),
			),
			'sanitize_callback' => array( 'Greenlet\Sanitizer', 'sanitize_template_selector' ),
		),
		'cargs' => array(
			'type'      => 'template-sequence',
			'section'   => 'shop_layout',
			'label'     => __( 'Product Category Layout', 'greenlet' ),
			'templates' => greenlet_template_images(),
			'columns'   => greenlet_column_content_options(),
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'product_tag_template',
		'sargs' => array(
			'default'           => array(
				'template' => '8-4',
				'sequence' => array( 'main', 'sidebar-1' ),
			),
			'sanitize_callback' => array( 'Greenlet\Sanitizer', 'sanitize_template_selector' ),
		),
		'cargs' => array(
			'type'      => 'template-sequence',
			'section'   => 'shop_layout',
			'label'     => __( 'Product Tags Layout', 'greenlet' ),
			'templates' => greenlet_template_images(),
			'columns'   => greenlet_column_content_options(),
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'product_search_template',
		'sargs' => array(
			'default'           => array(
				'template' => '8-4',
				'sequence' => array( 'main', 'sidebar-1' ),
			),
			'sanitize_callback' => array( 'Greenlet\Sanitizer', 'sanitize_template_selector' ),
		),
		'cargs' => array(
			'type'      => 'template-sequence',
			'section'   => 'shop_layout',
			'label'     => __( 'Product Search Results Layout', 'greenlet' ),
			'templates' => greenlet_template_images(),
			'columns'   => greenlet_column_content_options(),
		),
	);

	$options[] = array(
		'type' => 'section',
		'id'   => 'shop_design',
		'args' => array(
			'title' => __( 'Shop Design', 'greenlet' ),
			'panel' => 'woocommerce',
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'archive_products_count',
		'sargs' => array(
			'default' => 8,
		),
		'cargs' => array(
			'type'        => 'select',
			'section'     => 'shop_design',
			'label'       => __( 'Archive page Products Count.', 'greenlet' ),
			'description' => __( 'Number of Products in product archives page.', 'greenlet' ),
			'choices'     => $archive_count,
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'archive_products_columns',
		'sargs' => array(
			'default' => 4,
		),
		'cargs' => array(
			'type'        => 'select',
			'section'     => 'shop_design',
			'description' => __( 'Number of products in one row. (Number of columns).', 'greenlet' ),
			'choices'     => $archive_columns,
		),
	);

	return $options;
}

add_filter( 'greenlet_options', 'greenlet_woo_options' );
