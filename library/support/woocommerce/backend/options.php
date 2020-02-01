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
	$options[] = array(
		'type' => 'section',
		'id'   => 'shop_layout',
		'args' => array(
			'title' => __( 'Shop Layout', 'greenlet' ),
			'panel' => 'layout',
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
			'type'      => 'template-selector',
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
			'type'      => 'template-selector',
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
			'type'      => 'template-selector',
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
			'type'      => 'template-selector',
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
			'type'      => 'template-selector',
			'section'   => 'shop_layout',
			'label'     => __( 'Product Search Results Layout', 'greenlet' ),
			'templates' => greenlet_template_images(),
			'columns'   => greenlet_column_content_options(),
		),
	);

	return $options;
}

add_filter( 'greenlet_options', 'greenlet_woo_options' );
