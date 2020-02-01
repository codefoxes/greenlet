<?php
/**
 * Customizer options.
 *
 * @package greenlet\library\admin\customizer
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Greenlet customizer options.
 *
 * @since  1.0.0
 * @return array
 */
function greenlet_options() {
	$content_source = array(
		'widgets' => __( 'Widgets', 'greenlet' ),
		'manual'  => __( 'Manual Edit', 'greenlet' ),
	);

	$min_sidebars = greenlet_get_min_sidebars();

	$sidebars_qty = array();
	for ( $i = $min_sidebars; $i <= 12; $i++ ) {
		$sidebars_qty[ $i ] = $i;
	}

	$imagepath = LIBRARY_URL . '/backend/images/';

	$templates_array = array(
		'12'    => $imagepath . '12.png',
		'8-4'   => $imagepath . '8-4.png',
		'4-8'   => $imagepath . '4-8.png',
		'9-3'   => $imagepath . '9-3.png',
		'3-9'   => $imagepath . '3-9.png',
		'3-6-3' => $imagepath . '3-6-3.png',
		'3-3-6' => $imagepath . '3-3-6.png',
		'6-3-3' => $imagepath . '6-3-3.png',
	);

	// Page top and bottom columns.
	$pagetop_columns    = greenlet_cover_columns( array( 'header', 'topbar' ) );
	$pagebottom_columns = greenlet_cover_columns( array( 'semifooter', 'footer' ) );

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
			'label'   => __( 'Show Title', 'greenlet' ),
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
			'label'   => __( 'Show Tagline', 'greenlet' ),
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
			'label'   => __( 'Site Background', 'greenlet' ),
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'site_color',
		'sargs' => array(
			'default'           => '#383838',
			'sanitize_callback' => 'sanitize_hex_color',
		),
		'cargs' => array(
			'type'    => 'color',
			'section' => 'colors',
			'label'   => __( 'Site Text Color', 'greenlet' ),
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'topbar_bg',
		'sargs' => array(
			'default'           => '#ffffff',
			'sanitize_callback' => 'sanitize_hex_color',
		),
		'cargs' => array(
			'type'    => 'color',
			'section' => 'colors',
			'label'   => __( 'Topbar Background', 'greenlet' ),
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'topbar_color',
		'sargs' => array(
			'default'           => '#212121',
			'sanitize_callback' => 'sanitize_hex_color',
		),
		'cargs' => array(
			'type'    => 'color',
			'section' => 'colors',
			'label'   => __( 'Topbar Text Color', 'greenlet' ),
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'header_bg',
		'sargs' => array(
			'default'           => '#ffffff',
			'sanitize_callback' => 'sanitize_hex_color',
		),
		'cargs' => array(
			'type'    => 'color',
			'section' => 'colors',
			'label'   => __( 'Header Background', 'greenlet' ),
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'header_color',
		'sargs' => array(
			'default'           => '#33691e',
			'sanitize_callback' => 'sanitize_hex_color',
		),
		'cargs' => array(
			'type'    => 'color',
			'section' => 'colors',
			'label'   => __( 'Header Text Color', 'greenlet' ),
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'header_link_hover',
		'sargs' => array(
			'default'           => '#000000',
			'sanitize_callback' => 'sanitize_hex_color',
		),
		'cargs' => array(
			'type'    => 'color',
			'section' => 'colors',
			'label'   => __( 'Header Link Hover Color', 'greenlet' ),
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'main_bg',
		'sargs' => array(
			'default'           => '#f5f5f5',
			'sanitize_callback' => 'sanitize_hex_color',
		),
		'cargs' => array(
			'type'    => 'color',
			'section' => 'colors',
			'label'   => __( 'Content Section Background', 'greenlet' ),
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'content_bg',
		'sargs' => array(
			'default'           => '#ffffff',
			'sanitize_callback' => 'sanitize_hex_color',
		),
		'cargs' => array(
			'type'    => 'color',
			'section' => 'colors',
			'label'   => __( 'Content Background', 'greenlet' ),
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'semifooter_bg',
		'sargs' => array(
			'default'           => '#ffffff',
			'sanitize_callback' => 'sanitize_hex_color',
		),
		'cargs' => array(
			'type'    => 'color',
			'section' => 'colors',
			'label'   => __( 'Semifooter Background', 'greenlet' ),
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'semifooter_color',
		'sargs' => array(
			'default'           => '#212121',
			'sanitize_callback' => 'sanitize_hex_color',
		),
		'cargs' => array(
			'type'    => 'color',
			'section' => 'colors',
			'label'   => __( 'Semifooter Text Color', 'greenlet' ),
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
			'label'   => __( 'Footer Background', 'greenlet' ),
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'footer_color',
		'sargs' => array(
			'default'           => '#ffffff',
			'sanitize_callback' => 'sanitize_hex_color',
		),
		'cargs' => array(
			'type'    => 'color',
			'section' => 'colors',
			'label'   => __( 'Footer Text Color', 'greenlet' ),
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'heading_color',
		'sargs' => array(
			'default'           => '#383838',
			'sanitize_callback' => 'sanitize_hex_color',
		),
		'cargs' => array(
			'type'    => 'color',
			'section' => 'colors',
			'label'   => __( 'Heading Color', 'greenlet' ),
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'link_color',
		'sargs' => array(
			'default'           => '#1565C0',
			'sanitize_callback' => 'sanitize_hex_color',
		),
		'cargs' => array(
			'type'    => 'color',
			'section' => 'colors',
			'label'   => __( 'Link Color', 'greenlet' ),
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'link_hover',
		'sargs' => array(
			'default'           => '#0D47A1',
			'sanitize_callback' => 'sanitize_hex_color',
		),
		'cargs' => array(
			'type'    => 'color',
			'section' => 'colors',
			'label'   => __( 'Link Hover Color', 'greenlet' ),
		),
	);

	$options[] = array(
		'type' => 'section',
		'id'   => 'framework',
		'args' => array(
			'title'    => __( 'Framework', 'greenlet' ),
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
			'label'   => __( 'CSS Framework', 'greenlet' ),
			'choices' => array(
				'default'   => __( 'Greenlet Framework', 'greenlet' ),
				'bootstrap' => __( 'Bootstrap 4.4.1', 'greenlet' ),
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
			'description' => __( 'Enter URL if different CDN or CSS Framework', 'greenlet' ),
			'input_attrs' => array(
				'placeholder' => __( 'https://somecdn.com/css_framework.css', 'greenlet' ),
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
			'label'       => __( 'Defer CSS', 'greenlet' ),
			'description' => __( 'Load the CSS framework after page load.', 'greenlet' ),
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'critical_css',
		'sargs' => array(
			'sanitize_callback' => array( 'Greenlet\Sanitizer', 'sanitize_css' ),
		),
		'cargs' => array(
			'label'       => __( 'Critical CSS', 'greenlet' ),
			'description' => __( 'If CSS files are defered enter the critical css here.', 'greenlet' ),
			'type'        => 'textarea',
			'section'     => 'framework',
			'input_attrs' => array(
				'placeholder' => __( 'Leave Blank to not add Critical CSS.', 'greenlet' ),
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
			'label'       => __( 'Load Respective JS', 'greenlet' ),
			'description' => __( 'Eg: Load Bootstrap JS if loaded Bootstrap CSS.', 'greenlet' ),
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
			'label'       => __( 'Container Width', 'greenlet' ),
			'description' => __( 'Enter container width. Eg: 1170px or 80% (Optional)', 'greenlet' ),
			'input_attrs' => array(
				'placeholder' => __( 'Default', 'greenlet' ),
			),
		),
	);

	$options[] = array(
		'type' => 'panel',
		'id'   => 'layout',
		'args' => array(
			'title'       => __( 'Layout', 'greenlet' ),
			'description' => 'Site Layout.',
			'priority'    => 35,
		),
	);

	$options[] = array(
		'type' => 'section',
		'id'   => 'header_layout',
		'args' => array(
			'title' => __( 'Header Layout', 'greenlet' ),
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
			'label'   => __( 'Show Topbar', 'greenlet' ),
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
			'label'   => __( 'Fixed Topbar', 'greenlet' ),
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'topbar_template',
		'sargs' => array(
			'default' => '',
		),
		'cargs' => array(
			'type'        => 'text',
			'section'     => 'header_layout',
			'label'       => __( 'Topbar Layout', 'greenlet' ),
			'description' => __( 'Enter topbar columns in Format: 4-8 or 3-9-3 etc. (Separated by hyphen. Only integers. Sum should be 12.)', 'greenlet' ),
			'input_attrs' => array(
				'placeholder' => __( '4-8', 'greenlet' ),
			),
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'topbar_content_source',
		'sargs' => array(
			'default' => 'widgets',
		),
		'cargs' => array(
			'type'    => 'radio',
			'section' => 'header_layout',
			'label'   => __( 'Topbar Content Source', 'greenlet' ),
			'choices' => $content_source,
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'topbar_width',
		'sargs' => array(
			'default' => '',
		),
		'cargs' => array(
			'type'        => 'text',
			'section'     => 'header_layout',
			'label'       => __( 'Topbar Width', 'greenlet' ),
			'description' => __( 'Topbar width in % or px or em.', 'greenlet' ),
			'input_attrs' => array(
				'placeholder' => __( '100%', 'greenlet' ),
			),
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'topbar_container',
		'sargs' => array(
			'default' => '',
		),
		'cargs' => array(
			'type'        => 'text',
			'section'     => 'header_layout',
			'description' => __( 'Topbar container width in % or px or em.', 'greenlet' ),
			'input_attrs' => array(
				'placeholder' => __( 'Default', 'greenlet' ),
			),
		),
	);

	$options[] = array(
		'type' => 'control',
		'id'   => 'header_divider',
		'args' => array(
			'type'     => 'divider',
			'settings' => array(),
			'section'  => 'header_layout',
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
			'label'       => __( 'Header Layout', 'greenlet' ),
			'description' => __( 'Enter header columns in Format: 4-8 or 3-9-3 etc.', 'greenlet' ),
			'input_attrs' => array(
				'placeholder' => __( '3-9', 'greenlet' ),
			),
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'header_content_source',
		'sargs' => array(
			'default' => 'widgets',
		),
		'cargs' => array(
			'type'    => 'radio',
			'section' => 'header_layout',
			'label'   => __( 'Header Content Source', 'greenlet' ),
			'choices' => $content_source,
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'header_width',
		'sargs' => array(
			'default' => '',
		),
		'cargs' => array(
			'type'        => 'text',
			'section'     => 'header_layout',
			'label'       => __( 'Header Width', 'greenlet' ),
			'description' => __( 'Enter header width in % or px or em.', 'greenlet' ),
			'input_attrs' => array(
				'placeholder' => __( '100%', 'greenlet' ),
			),
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'header_container',
		'sargs' => array(
			'default' => '',
		),
		'cargs' => array(
			'type'        => 'text',
			'section'     => 'header_layout',
			'label'       => __( 'Header Container Width', 'greenlet' ),
			'description' => __( 'Enter container width in % or px or em.', 'greenlet' ),
			'input_attrs' => array(
				'placeholder' => __( 'Default', 'greenlet' ),
			),
		),
	);

	$options[] = array(
		'type' => 'control',
		'id'   => 'logo_divider',
		'args' => array(
			'type'     => 'divider',
			'settings' => array(),
			'section'  => 'header_layout',
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'logo_position',
		'sargs' => array(
			'default' => 'header-1',
		),
		'cargs' => array(
			'type'        => 'select',
			'section'     => 'header_layout',
			'label'       => __( 'Logo Position', 'greenlet' ),
			'description' => __( 'Column for the logo to be displayed.', 'greenlet' ),
			'choices'     => $pagetop_columns,
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'mmenu_position',
		'sargs' => array(
			'default' => 'header-2',
		),
		'cargs' => array(
			'type'        => 'select',
			'section'     => 'header_layout',
			'label'       => __( 'Main Menu Position', 'greenlet' ),
			'description' => __( 'Column for the Main Menu to be displayed.', 'greenlet' ),
			'choices'     => $pagetop_columns,
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'smenu_position',
		'sargs' => array(
			'default' => 'dont-show',
		),
		'cargs' => array(
			'type'        => 'select',
			'section'     => 'header_layout',
			'label'       => __( 'Secondary Menu Position', 'greenlet' ),
			'description' => __( 'Column for the Secondary Menu to be displayed.', 'greenlet' ),
			'choices'     => $pagetop_columns,
		),
	);

	$options[] = array(
		'type' => 'section',
		'id'   => 'main_layout',
		'args' => array(
			'title' => __( 'Main Layout', 'greenlet' ),
			'panel' => 'layout',
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'sidebars_qty',
		'sargs' => array(
			'default' => '3',
		),
		'cargs' => array(
			'type'        => 'select',
			'section'     => 'main_layout',
			'label'       => __( 'Number of Sidebars ( For Main Container )', 'greenlet' ),
			'description' => __( 'How many sidebars ro register for main container of page ? (Not for header or footer.)', 'greenlet' ),
			'choices'     => $sidebars_qty,
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'home_template',
		'sargs' => array(
			'default'           => array(
				'template' => '8-4',
				'sequence' => array( 'main', 'sidebar-1' ),
			),
			'sanitize_callback' => array( 'Greenlet\Sanitizer', 'sanitize_template_selector' ),
		),
		'cargs' => array(
			'type'      => 'template-selector',
			'section'   => 'main_layout',
			'label'     => __( 'Home Page (Post List) Layout', 'greenlet' ),
			'templates' => $templates_array,
			'columns'   => greenlet_column_content_options(),
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'default_template',
		'sargs' => array(
			'default'           => array(
				'template' => '12',
				'sequence' => array( 'main' ),
			),
			'sanitize_callback' => array( 'Greenlet\Sanitizer', 'sanitize_template_selector' ),
		),
		'cargs' => array(
			'type'      => 'template-selector',
			'section'   => 'main_layout',
			'label'     => __( 'Default Page Layout', 'greenlet' ),
			'templates' => $templates_array,
			'columns'   => greenlet_column_content_options(),
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'post_template',
		'sargs' => array(
			'default'           => array(
				'template' => '12',
				'sequence' => array( 'main' ),
			),
			'sanitize_callback' => array( 'Greenlet\Sanitizer', 'sanitize_template_selector' ),
		),
		'cargs' => array(
			'type'      => 'template-selector',
			'section'   => 'main_layout',
			'label'     => __( 'Single Post Layout', 'greenlet' ),
			'templates' => $templates_array,
			'columns'   => greenlet_column_content_options(),
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'archive_template',
		'sargs' => array(
			'default'           => array(
				'template' => '12',
				'sequence' => array( 'main' ),
			),
			'sanitize_callback' => array( 'Greenlet\Sanitizer', 'sanitize_template_selector' ),
		),
		'cargs' => array(
			'type'      => 'template-selector',
			'section'   => 'main_layout',
			'label'     => __( 'Archive Layout', 'greenlet' ),
			'templates' => $templates_array,
			'columns'   => greenlet_column_content_options(),
		),
	);

	$options[] = array(
		'type' => 'control',
		'id'   => 'main_divider',
		'args' => array(
			'type'     => 'divider',
			'settings' => array(),
			'section'  => 'main_layout',
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'main_width',
		'sargs' => array(
			'default' => '',
		),
		'cargs' => array(
			'type'        => 'text',
			'section'     => 'main_layout',
			'description' => __( 'Content Width in % or px or em.', 'greenlet' ),
			'input_attrs' => array(
				'placeholder' => __( '100%', 'greenlet' ),
			),
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'main_container',
		'sargs' => array(
			'default' => '',
		),
		'cargs' => array(
			'type'        => 'text',
			'section'     => 'main_layout',
			'description' => __( 'Content container width in % or px or em.', 'greenlet' ),
			'input_attrs' => array(
				'placeholder' => __( 'Default', 'greenlet' ),
			),
		),
	);

	$options[] = array(
		'type' => 'section',
		'id'   => 'footer_layout',
		'args' => array(
			'title' => __( 'Footer Layout', 'greenlet' ),
			'panel' => 'layout',
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'show_semifooter',
		'sargs' => array(
			'default' => false,
		),
		'cargs' => array(
			'type'    => 'checkbox',
			'section' => 'footer_layout',
			'label'   => __( 'Show Semifooter', 'greenlet' ),
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'semifooter_template',
		'sargs' => array(
			'default' => '',
		),
		'cargs' => array(
			'type'        => 'text',
			'section'     => 'footer_layout',
			'label'       => __( 'Semi Footer Layout', 'greenlet' ),
			'description' => __( 'Enter semifooter columns in Format: 4-8 or 3-9-3 etc.', 'greenlet' ),
			'input_attrs' => array(
				'placeholder' => __( '4-4-4', 'greenlet' ),
			),
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'semifooter_content_source',
		'sargs' => array(
			'default' => 'widgets',
		),
		'cargs' => array(
			'type'    => 'radio',
			'section' => 'footer_layout',
			'label'   => __( 'Semi Footer Content Source', 'greenlet' ),
			'choices' => $content_source,
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'semifooter_width',
		'sargs' => array(
			'default' => '',
		),
		'cargs' => array(
			'type'        => 'text',
			'section'     => 'footer_layout',
			'description' => __( 'Semifooter Width in % or px or em.', 'greenlet' ),
			'input_attrs' => array(
				'placeholder' => __( '100%', 'greenlet' ),
			),
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'semifooter_container',
		'sargs' => array(
			'default' => '',
		),
		'cargs' => array(
			'type'        => 'text',
			'section'     => 'footer_layout',
			'description' => __( 'Semifooter container width in % or px or em.', 'greenlet' ),
			'input_attrs' => array(
				'placeholder' => __( 'Default', 'greenlet' ),
			),
		),
	);

	$options[] = array(
		'type' => 'control',
		'id'   => 'footer_divider',
		'args' => array(
			'type'     => 'divider',
			'settings' => array(),
			'section'  => 'footer_layout',
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'footer_template',
		'sargs' => array(
			'default' => '',
		),
		'cargs' => array(
			'type'        => 'text',
			'section'     => 'footer_layout',
			'label'       => __( 'Footer Layout', 'greenlet' ),
			'description' => __( 'Enter footer columns in Format: 4-8 or 3-9-3 etc.', 'greenlet' ),
			'input_attrs' => array(
				'placeholder' => '12',
			),
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'footer_content_source',
		'sargs' => array(
			'default' => 'widgets',
		),
		'cargs' => array(
			'type'    => 'radio',
			'section' => 'footer_layout',
			'label'   => __( 'Footer Content Source', 'greenlet' ),
			'choices' => $content_source,
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'footer_width',
		'sargs' => array(
			'default' => '',
		),
		'cargs' => array(
			'type'        => 'text',
			'section'     => 'footer_layout',
			'description' => __( 'Semifooter Width in % or px or em.', 'greenlet' ),
			'input_attrs' => array(
				'placeholder' => __( '100%', 'greenlet' ),
			),
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'footer_container',
		'sargs' => array(
			'default' => '',
		),
		'cargs' => array(
			'type'        => 'text',
			'section'     => 'footer_layout',
			'description' => __( 'Semifooter container width in % or px or em.', 'greenlet' ),
			'input_attrs' => array(
				'placeholder' => __( 'Default', 'greenlet' ),
			),
		),
	);

	$options[] = array(
		'type' => 'control',
		'id'   => 'fmenu_divider',
		'args' => array(
			'type'     => 'divider',
			'settings' => array(),
			'section'  => 'footer_layout',
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'fmenu_position',
		'sargs' => array(
			'default' => 'dont-show',
		),
		'cargs' => array(
			'type'        => 'select',
			'section'     => 'footer_layout',
			'label'       => __( 'Footer Menu Position', 'greenlet' ),
			'description' => __( 'Column for the Footer Menu to be displayed.', 'greenlet' ),
			'choices'     => $pagebottom_columns,
		),
	);

	$options[] = array(
		'type' => 'section',
		'id'   => 'blog',
		'args' => array(
			'title'    => __( 'Blog Settings', 'greenlet' ),
			'priority' => 200,
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'schema',
		'sargs' => array(
			'default' => '1',
		),
		'cargs' => array(
			'type'        => 'checkbox',
			'section'     => 'blog',
			'label'       => __( 'Schema Markup', 'greenlet' ),
			'description' => __( 'Enable Schema Markup', 'greenlet' ),
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'breadcrumb',
		'sargs' => array(
			'default' => '1',
		),
		'cargs' => array(
			'type'        => 'checkbox',
			'section'     => 'blog',
			'label'       => __( 'Breadcrumb', 'greenlet' ),
			'description' => __( 'Enable breadcrumb navigation', 'greenlet' ),
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'breadcrumb_sep',
		'sargs' => array(
			'default' => '&raquo;',
		),
		'cargs' => array(
			'type'        => 'text',
			'section'     => 'blog',
			'label'       => __( 'Breadcrumb Separator', 'greenlet' ),
			'description' => __( 'Separator between links in breadcrumb. Eg: / or >', 'greenlet' ),
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'featured_image',
		'sargs' => array(
			'default' => '1',
		),
		'cargs' => array(
			'type'        => 'checkbox',
			'section'     => 'blog',
			'label'       => __( 'Featured Image', 'greenlet' ),
			'description' => __( 'Show featured image on post list and archives.', 'greenlet' ),
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'excerpt_length',
		'sargs' => array(
			'default' => 55,
		),
		'cargs' => array(
			'type'        => 'text',
			'section'     => 'blog',
			'label'       => __( 'Excerpt length', 'greenlet' ),
			'description' => __( 'Number of characters in excerpts for post list.', 'greenlet' ),
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'paging_nav',
		'sargs' => array(
			'default' => 'number',
		),
		'cargs' => array(
			'type'        => 'radio',
			'section'     => 'blog',
			'label'       => __( 'Pagination', 'greenlet' ),
			'description' => __( 'Paging Navigation display format.', 'greenlet' ),
			'choices'     => array(
				'simple'   => 'Simple',
				'number'   => 'Numbered',
				'ajax'     => 'Numbered (Ajax)',
				'load'     => 'Load More Button',
				'infinite' => 'Infinite Scroll',
			),
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'show_author',
		'sargs' => array(
			'default'           => array( 'name', 'image', 'bio' ),
			'sanitize_callback' => array( 'Greenlet\Sanitizer', 'sanitize_multicheck' ),
		),
		'cargs' => array(
			'type'    => 'multicheck',
			'section' => 'blog',
			'label'   => __( 'Show Author Info', 'greenlet' ),
			'choices' => array(
				'name'  => 'Name',
				'image' => 'Avatar',
				'bio'   => 'Biographical Info',
			),
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'show_comments',
		'sargs' => array(
			'default'           => array( 'posts', 'pages' ),
			'sanitize_callback' => array( 'Greenlet\Sanitizer', 'sanitize_multicheck' ),
		),
		'cargs' => array(
			'type'    => 'multicheck',
			'section' => 'blog',
			'label'   => __( 'Show Comments', 'greenlet' ),
			'choices' => array(
				'posts' => 'Posts',
				'pages' => 'Pages',
			),
		),
	);

	$options[] = array(
		'type' => 'section',
		'id'   => 'performance',
		'args' => array(
			'title'    => __( 'Performance', 'greenlet' ),
			'priority' => 250,
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'disable_emojis',
		'sargs' => array(
			'default' => false,
		),
		'cargs' => array(
			'type'        => 'checkbox',
			'section'     => 'performance',
			'label'       => __( 'Disable WP Emojis', 'greenlet' ),
			'description' => __( 'Posts with emojis may break, disable with caution.', 'greenlet' ),
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'disable_block_editor',
		'sargs' => array(
			'default' => false,
		),
		'cargs' => array(
			'type'        => 'checkbox',
			'section'     => 'performance',
			'label'       => __( 'Disable WP Block Editor Style', 'greenlet' ),
			'description' => __( 'Posts created with WP Block Editor may break, disable with caution.', 'greenlet' ),
		),
	);

	return $options;
}
