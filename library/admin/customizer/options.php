<?php
/**
 * Customizer options.
 *
 * @package greenlet\library\admin\customizer
 */

/**
 * Greenlet customizer options.
 *
 * @return array
 */
function greenlet_options() {
	$options = array();

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'show_title',
		'sargs' => array(
			'default' => '1',
		),
		'cargs' => array(
			'type'    => 'checkbox',
			'section' => 'title_tagline',
			'label'   => __( 'Show Title' ),
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'show_tagline',
		'sargs' => array(
			'default' => '1',
		),
		'cargs' => array(
			'type'    => 'checkbox',
			'section' => 'title_tagline',
			'label'   => __( 'Show Tagline' ),
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'site_bg',
		'sargs' => array(
			'default'           => '#f5f5f5',
			'sanitize_callback' => 'sanitize_hex_color',
		),
		'cargs' => array(
			'type'    => 'color',
			'section' => 'colors',
			'label'   => __( 'Site Background' ),
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'header_bg',
		'sargs' => array(
			'default'           => '#7CB342',
			'sanitize_callback' => 'sanitize_hex_color',
		),
		'cargs' => array(
			'type'    => 'color',
			'section' => 'colors',
			'label'   => __( 'Header Background' ),
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'header_color',
		'sargs' => array(
			'default'           => '#fff',
			'sanitize_callback' => 'sanitize_hex_color',
		),
		'cargs' => array(
			'type'    => 'color',
			'section' => 'colors',
			'label'   => __( 'Header Text Color' ),
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'footer_bg',
		'sargs' => array(
			'default'           => '#212121',
			'sanitize_callback' => 'sanitize_hex_color',
		),
		'cargs' => array(
			'type'    => 'color',
			'section' => 'colors',
			'label'   => __( 'Footer Background' ),
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'footer_color',
		'sargs' => array(
			'default'           => '#fff',
			'sanitize_callback' => 'sanitize_hex_color',
		),
		'cargs' => array(
			'type'    => 'color',
			'section' => 'colors',
			'label'   => __( 'Footer Text Color' ),
		),
	);

	$options[] = array(
		'type' => 'section',
		'id'   => 'framework',
		'args' => array(
			'title'    => __( 'Framework' ),
			'priority' => 30,
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'css_framework',
		'sargs' => array(
			'default' => 'default',
		),
		'cargs' => array(
			'type'    => 'radio',
			'section' => 'framework',
			'label'   => __( 'CSS Framework' ),
			'choices' => array(
				'default'  => __( 'Greenlet Framework' ),
				'bootstrap' => __( 'Bootstrap 4.4.1' ),
			),
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'css_path',
		'sargs' => array(
			'default' => '',
		),
		'cargs' => array(
			'type'        => 'url',
			'section'     => 'framework',
			'description' => __( 'Different CDN or CSS Framework? Enter local or cdn path. ( Optional )' ),
			'input_attrs' => array(
				'placeholder' => __( 'https://somecdn.com/css_framework.css' ),
			),
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'defer_css',
		'sargs' => array(
			'default' => '1',
		),
		'cargs' => array(
			'type'        => 'checkbox',
			'section'     => 'framework',
			'label'       => __( 'Defer CSS' ),
			'description' => __( 'Load the above CSS framework after page load to increase page speed.' ),
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'critical_css',
		'sargs' => array(
			'sanitize_callback' => array( 'Greenlet\Sanitizer', 'sanitize_css'),
		),
		'cargs' => array(
			'label'       => __( 'Critical CSS' ),
			'description' => __( 'If CSS files are defered enter the critical css here.' ),
			'type'        => 'textarea',
			'section'     => 'framework',
			'input_attrs' => array(
				'placeholder' => __( 'Leave Blank to not add Critical CSS.' ),
			),
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'load_js',
		'sargs' => array(
			'default' => false,
		),
		'cargs' => array(
			'type'        => 'checkbox',
			'section'     => 'framework',
			'label'       => __( 'Load Respective JS' ),
			'description' => __( 'Eg: If you select Bootstrap above, check this option to also load Bootstrap JS.' ),
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'container_width',
		'sargs' => array(
			'default' => '',
		),
		'cargs' => array(
			'type'        => 'text',
			'section'     => 'framework',
			'label'       => __( 'Container Width' ),
			'description' => __( 'Enter container width in percentage or pixels. Eg: 1170px or 80% ( Optional )' ),
			'input_attrs' => array(
				'placeholder' => __( 'Default' ),
			),
		),
	);

	$options[] = array(
		'type' => 'panel',
		'id'   => 'layout',
		'args' => array(
			'title'       => __( 'Layout' ),
			'description' => 'Site Layout.',
			'priority'    => 35,
		),
	);

	$options[] = array(
		'type' => 'section',
		'id'   => 'header_layout',
		'args' => array(
			'title' => __( 'Header Layout' ),
			'panel' => 'layout',
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'show_topbar',
		'sargs' => array(
			'default' => false,
		),
		'cargs' => array(
			'type'    => 'checkbox',
			'section' => 'header_layout',
			'label'   => __( 'Show Topbar' ),
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'fixed_topbar',
		'sargs' => array(
			'default' => '1',
		),
		'cargs' => array(
			'type'    => 'checkbox',
			'section' => 'header_layout',
			'label'   => __( 'Fixed Topbar' ),
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'header_template',
		'sargs' => array(
			'default' => '',
		),
		'cargs' => array(
			'type'        => 'text',
			'section'     => 'header_layout',
			'label'       => __( 'Header Layout' ),
			'description' => __( 'Enter header columns in Format: 4-8 or 3-9-3 etc. (Separated by hyphen. Only integers. Sum should be 12.)' ),
			'input_attrs' => array(
				'placeholder' => __( '8-4' ),
			),
		),
	);

	return $options;
}
