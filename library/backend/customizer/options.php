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
	$min_sidebars = greenlet_get_min_sidebars();

	$sidebars_qty = array();
	for ( $i = $min_sidebars; $i <= 12; $i++ ) {
		$sidebars_qty[ $i ] = $i;
	}

	// Page top and bottom columns.
	$pagetop_columns    = greenlet_cover_columns( array( 'header', 'topbar' ) );
	$pagebottom_columns = greenlet_cover_columns( array( 'semifooter', 'footer' ) );

	$logo_width  = 0;
	$logo_height = 0;
	$logo        = greenlet_get_logo();
	if ( $logo ) {
		list( $logo_width, $logo_height ) = getimagesize( esc_url( $logo ) );
	}

	$options = array();

	// Site Identity.
	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'logo_width',
		'sargs' => array(
			'default'   => $logo_width . 'px',
			'transport' => 'postMessage',
		),
		'cargs' => array(
			'type'        => 'length',
			'section'     => 'title_tagline',
			'description' => __( 'Logo Width', 'greenlet' ),
			'input_attrs' => array(
				'min' => 0,
				'max' => 500,
			),
			'priority'    => 8,
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'logo_height',
		'sargs' => array(
			'default'   => $logo_height . 'px',
			'transport' => 'postMessage',
		),
		'cargs' => array(
			'type'        => 'length',
			'section'     => 'title_tagline',
			'description' => __( 'Logo Height', 'greenlet' ),
			'input_attrs' => array(
				'min' => 0,
				'max' => 500,
			),
			'priority'    => 8,
		),
	);

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
			'default' => false,
		),
		'cargs' => array(
			'type'    => 'checkbox',
			'section' => 'title_tagline',
			'label'   => __( 'Show Tagline', 'greenlet' ),
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'logo_font',
		'sargs' => array(
			'default'   => array(
				'size'   => '3.6rem',
				'weight' => '300',
			),
			'transport' => 'postMessage',
		),
		'cargs' => array(
			'type'    => 'font',
			'section' => 'title_tagline',
			'label'   => __( 'Title Typography', 'greenlet' ),
		),
	);

	// Layout.
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
		'id'   => 'framework',
		'args' => array(
			'title' => __( 'Framework', 'greenlet' ),
			'panel' => 'layout',
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
			'default'   => '',
			'transport' => 'postMessage',
		),
		'cargs' => array(
			'type'    => 'length',
			'section' => 'framework',
			'label'   => __( 'Container Width', 'greenlet' ),
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
			'type'        => 'template',
			'section'     => 'header_layout',
			'label'       => __( 'Topbar Layout', 'greenlet' ),
			'description' => __( 'Select Topbar Columns Layout', 'greenlet' ),
			'choices'     => greenlet_template_images( 'cover' ),
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'topbar_width',
		'sargs' => array(
			'default'   => '',
			'transport' => 'postMessage',
		),
		'cargs' => array(
			'type'    => 'length',
			'section' => 'header_layout',
			'label'   => __( 'Topbar Width', 'greenlet' ),
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'topbar_container',
		'sargs' => array(
			'default'   => '',
			'transport' => 'postMessage',
		),
		'cargs' => array(
			'type'    => 'length',
			'section' => 'header_layout',
			'label'   => __( 'Topbar container Width', 'greenlet' ),
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
			'type'        => 'template',
			'section'     => 'header_layout',
			'label'       => __( 'Header Layout', 'greenlet' ),
			'description' => __( 'Select Header Columns Layout', 'greenlet' ),
			'choices'     => greenlet_template_images( 'cover' ),
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'header_width',
		'sargs' => array(
			'default'   => '',
			'transport' => 'postMessage',
		),
		'cargs' => array(
			'type'    => 'length',
			'section' => 'header_layout',
			'label'   => __( 'Header Width', 'greenlet' ),
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'header_container',
		'sargs' => array(
			'default'   => '',
			'transport' => 'postMessage',
		),
		'cargs' => array(
			'type'    => 'length',
			'section' => 'header_layout',
			'label'   => __( 'Header Container Width', 'greenlet' ),
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
			'description' => __( 'How many sidebars to register for main container of page ? (Not for header or footer.)', 'greenlet' ),
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
			'type'      => 'template-sequence',
			'section'   => 'main_layout',
			'label'     => __( 'Home Page (Post List) Layout', 'greenlet' ),
			'templates' => greenlet_template_images(),
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
			'type'      => 'template-sequence',
			'section'   => 'main_layout',
			'label'     => __( 'Default Page Layout', 'greenlet' ),
			'templates' => greenlet_template_images(),
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
			'type'      => 'template-sequence',
			'section'   => 'main_layout',
			'label'     => __( 'Single Post Layout', 'greenlet' ),
			'templates' => greenlet_template_images(),
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
			'type'      => 'template-sequence',
			'section'   => 'main_layout',
			'label'     => __( 'Archive Layout', 'greenlet' ),
			'templates' => greenlet_template_images(),
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
			'default'   => '',
			'transport' => 'postMessage',
		),
		'cargs' => array(
			'type'        => 'length',
			'section'     => 'main_layout',
			'description' => __( 'Content Width', 'greenlet' ),
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'main_container',
		'sargs' => array(
			'default'   => '',
			'transport' => 'postMessage',
		),
		'cargs' => array(
			'type'        => 'length',
			'section'     => 'main_layout',
			'description' => __( 'Content container width', 'greenlet' ),
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
			'type'        => 'template',
			'section'     => 'footer_layout',
			'label'       => __( 'Semi Footer Layout', 'greenlet' ),
			'description' => __( 'Select Semi Footer Columns Layout', 'greenlet' ),
			'choices'     => greenlet_template_images( 'cover' ),
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'semifooter_width',
		'sargs' => array(
			'default'   => '',
			'transport' => 'postMessage',
		),
		'cargs' => array(
			'type'    => 'length',
			'section' => 'footer_layout',
			'label'   => __( 'Semifooter Width', 'greenlet' ),
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'semifooter_container',
		'sargs' => array(
			'default'   => '',
			'transport' => 'postMessage',
		),
		'cargs' => array(
			'type'    => 'length',
			'section' => 'footer_layout',
			'label'   => __( 'Semifooter container width', 'greenlet' ),
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
			'type'        => 'template',
			'section'     => 'footer_layout',
			'label'       => __( 'Footer Layout', 'greenlet' ),
			'description' => __( 'Select Footer Columns Layout', 'greenlet' ),
			'choices'     => greenlet_template_images( 'cover' ),
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'footer_width',
		'sargs' => array(
			'default'   => '',
			'transport' => 'postMessage',
		),
		'cargs' => array(
			'type'    => 'length',
			'section' => 'footer_layout',
			'label'   => __( 'Footer Width', 'greenlet' ),
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'footer_container',
		'sargs' => array(
			'default'   => '',
			'transport' => 'postMessage',
		),
		'cargs' => array(
			'type'    => 'length',
			'section' => 'footer_layout',
			'label'   => __( 'Footer container width', 'greenlet' ),
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

	// Global.
	$options[] = array(
		'type' => 'panel',
		'id'   => 'global',
		'args' => array(
			'title'       => __( 'Global Design', 'greenlet' ),
			'description' => 'Site Layout.',
			'priority'    => 35,
		),
	);

	// Typography.
	$options[] = array(
		'type' => 'section',
		'id'   => 'typography',
		'args' => array(
			'title' => __( 'Typography', 'greenlet' ),
			'panel' => 'global',
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'base_font',
		'sargs' => array(
			'transport' => 'postMessage',
		),
		'cargs' => array(
			'type'    => 'font',
			'section' => 'typography',
			'label'   => __( 'Base Typography', 'greenlet' ),
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'header_font',
		'sargs' => array(
			'transport' => 'postMessage',
		),
		'cargs' => array(
			'type'    => 'font',
			'section' => 'typography',
			'label'   => __( 'Header Typography', 'greenlet' ),
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'content_font',
		'sargs' => array(
			'transport' => 'postMessage',
		),
		'cargs' => array(
			'type'    => 'font',
			'section' => 'typography',
			'label'   => __( 'Content Section Typography', 'greenlet' ),
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'footer_font',
		'sargs' => array(
			'transport' => 'postMessage',
		),
		'cargs' => array(
			'type'    => 'font',
			'section' => 'typography',
			'label'   => __( 'Footer Typography', 'greenlet' ),
		),
	);

	// Colors.
	$options[] = array(
		'type' => 'section',
		'id'   => 'colors',
		'args' => array(
			'title' => __( 'Colors', 'greenlet' ),
			'panel' => 'global',
		),
	);

	// Colors.
	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'site_bg',
		'sargs' => array(
			'default'           => '#f5f5f5',
			'transport'         => 'postMessage',
			'sanitize_callback' => array( 'Greenlet\Sanitizer', 'sanitize_color' ),
		),
		'cargs' => array(
			'type'    => 'gl-color',
			'section' => 'colors',
			'label'   => __( 'Site Background', 'greenlet' ),
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'site_color',
		'sargs' => array(
			'default'           => '#383838',
			'transport'         => 'postMessage',
			'sanitize_callback' => array( 'Greenlet\Sanitizer', 'sanitize_color' ),
		),
		'cargs' => array(
			'type'    => 'gl-color',
			'section' => 'colors',
			'label'   => __( 'Site Text Color', 'greenlet' ),
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'topbar_bg',
		'sargs' => array(
			'default'           => '#ffffff',
			'transport'         => 'postMessage',
			'sanitize_callback' => array( 'Greenlet\Sanitizer', 'sanitize_color' ),
		),
		'cargs' => array(
			'type'    => 'gl-color',
			'section' => 'colors',
			'label'   => __( 'Topbar Background', 'greenlet' ),
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'topbar_color',
		'sargs' => array(
			'default'           => '#212121',
			'transport'         => 'postMessage',
			'sanitize_callback' => array( 'Greenlet\Sanitizer', 'sanitize_color' ),
		),
		'cargs' => array(
			'type'    => 'gl-color',
			'section' => 'colors',
			'label'   => __( 'Topbar Text Color', 'greenlet' ),
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'header_bg',
		'sargs' => array(
			'default'           => '#ffffff',
			'transport'         => 'postMessage',
			'sanitize_callback' => array( 'Greenlet\Sanitizer', 'sanitize_color' ),
		),
		'cargs' => array(
			'type'    => 'gl-color',
			'section' => 'colors',
			'label'   => __( 'Header Background', 'greenlet' ),
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'header_color',
		'sargs' => array(
			'default'           => '#383838',
			'transport'         => 'postMessage',
			'sanitize_callback' => array( 'Greenlet\Sanitizer', 'sanitize_color' ),
		),
		'cargs' => array(
			'type'    => 'gl-color',
			'section' => 'colors',
			'label'   => __( 'Header Text Color', 'greenlet' ),
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'header_link_hover',
		'sargs' => array(
			'default'           => '#01579B',
			'transport'         => 'postMessage',
			'sanitize_callback' => array( 'Greenlet\Sanitizer', 'sanitize_color' ),
		),
		'cargs' => array(
			'type'    => 'gl-color',
			'section' => 'colors',
			'label'   => __( 'Header Link Hover Color', 'greenlet' ),
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'main_bg',
		'sargs' => array(
			'default'           => '#f5f5f5',
			'transport'         => 'postMessage',
			'sanitize_callback' => array( 'Greenlet\Sanitizer', 'sanitize_color' ),
		),
		'cargs' => array(
			'type'    => 'gl-color',
			'section' => 'colors',
			'label'   => __( 'Content Section Background', 'greenlet' ),
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'content_bg',
		'sargs' => array(
			'default'           => '#ffffff',
			'transport'         => 'postMessage',
			'sanitize_callback' => array( 'Greenlet\Sanitizer', 'sanitize_color' ),
		),
		'cargs' => array(
			'type'    => 'gl-color',
			'section' => 'colors',
			'label'   => __( 'Content Background', 'greenlet' ),
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'semifooter_bg',
		'sargs' => array(
			'default'           => '#ffffff',
			'transport'         => 'postMessage',
			'sanitize_callback' => array( 'Greenlet\Sanitizer', 'sanitize_color' ),
		),
		'cargs' => array(
			'type'    => 'gl-color',
			'section' => 'colors',
			'label'   => __( 'Semifooter Background', 'greenlet' ),
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'semifooter_color',
		'sargs' => array(
			'default'           => '#212121',
			'transport'         => 'postMessage',
			'sanitize_callback' => array( 'Greenlet\Sanitizer', 'sanitize_color' ),
		),
		'cargs' => array(
			'type'    => 'gl-color',
			'section' => 'colors',
			'label'   => __( 'Semifooter Text Color', 'greenlet' ),
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'footer_bg',
		'sargs' => array(
			'default'           => '#212121',
			'transport'         => 'postMessage',
			'sanitize_callback' => array( 'Greenlet\Sanitizer', 'sanitize_color' ),
		),
		'cargs' => array(
			'type'    => 'gl-color',
			'section' => 'colors',
			'label'   => __( 'Footer Background', 'greenlet' ),
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'footer_color',
		'sargs' => array(
			'default'           => '#ffffff',
			'transport'         => 'postMessage',
			'sanitize_callback' => array( 'Greenlet\Sanitizer', 'sanitize_color' ),
		),
		'cargs' => array(
			'type'    => 'gl-color',
			'section' => 'colors',
			'label'   => __( 'Footer Text Color', 'greenlet' ),
		),
	);

	// Components.
	$options[] = array(
		'type' => 'panel',
		'id'   => 'components',
		'args' => array(
			'title'       => __( 'Components', 'greenlet' ),
			'description' => 'Components Styles',
			'priority'    => 75,
		),
	);

	$options[] = array(
		'type' => 'section',
		'id'   => 'headings',
		'args' => array(
			'title' => __( 'Headings', 'greenlet' ),
			'panel' => 'components',
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'heading_color',
		'sargs' => array(
			'default'           => '#383838',
			'transport'         => 'postMessage',
			'sanitize_callback' => array( 'Greenlet\Sanitizer', 'sanitize_color' ),
		),
		'cargs' => array(
			'type'    => 'gl-color',
			'section' => 'headings',
			'label'   => __( 'Heading Color', 'greenlet' ),
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'heading_hover_color',
		'sargs' => array(
			'default'           => '#000000',
			'transport'         => 'postMessage',
			'sanitize_callback' => array( 'Greenlet\Sanitizer', 'sanitize_color' ),
		),
		'cargs' => array(
			'type'    => 'gl-color',
			'section' => 'headings',
			'label'   => __( 'Heading Hover Color', 'greenlet' ),
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'heading_font',
		'sargs' => array(
			'default'   => array(
				'size'   => '4.0rem',
				'weight' => '300',
			),
			'transport' => 'postMessage',
		),
		'cargs' => array(
			'type'    => 'font',
			'section' => 'headings',
			'label'   => __( 'Heading Typography', 'greenlet' ),
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'h1_font',
		'sargs' => array(
			'default'   => array(
				'size'   => '4.0rem',
				'weight' => '300',
			),
			'transport' => 'postMessage',
		),
		'cargs' => array(
			'type'    => 'font',
			'section' => 'headings',
			'label'   => __( 'H1 Typography', 'greenlet' ),
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'h2_font',
		'sargs' => array(
			'default'   => array(
				'size'   => '3.6rem',
				'weight' => '300',
			),
			'transport' => 'postMessage',
		),
		'cargs' => array(
			'type'    => 'font',
			'section' => 'headings',
			'label'   => __( 'H2 Typography', 'greenlet' ),
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'h3_font',
		'sargs' => array(
			'default'   => array(
				'size'   => '3rem',
				'weight' => '300',
			),
			'transport' => 'postMessage',
		),
		'cargs' => array(
			'type'    => 'font',
			'section' => 'headings',
			'label'   => __( 'H3 Typography', 'greenlet' ),
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'h4_font',
		'sargs' => array(
			'default'   => array(
				'size'   => '2.4rem',
				'weight' => '300',
			),
			'transport' => 'postMessage',
		),
		'cargs' => array(
			'type'    => 'font',
			'section' => 'headings',
			'label'   => __( 'H4 Typography', 'greenlet' ),
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'h5_font',
		'sargs' => array(
			'default'   => array(
				'size'   => '1.8rem',
				'weight' => '300',
			),
			'transport' => 'postMessage',
		),
		'cargs' => array(
			'type'    => 'font',
			'section' => 'headings',
			'label'   => __( 'H5 Typography', 'greenlet' ),
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'h6_font',
		'sargs' => array(
			'default'   => array(
				'size'   => '1.5rem',
				'weight' => '300',
			),
			'transport' => 'postMessage',
		),
		'cargs' => array(
			'type'    => 'font',
			'section' => 'headings',
			'label'   => __( 'H6 Typography', 'greenlet' ),
		),
	);

	$options[] = array(
		'type' => 'section',
		'id'   => 'buttons',
		'args' => array(
			'title' => __( 'Buttons', 'greenlet' ),
			'panel' => 'components',
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'button_bg',
		'sargs' => array(
			'default'   => '#ffffff',
			'transport' => 'postMessage',
		),
		'cargs' => array(
			'type'    => 'gl-color',
			'section' => 'buttons',
			'label'   => __( 'Button Background', 'greenlet' ),
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'button_color',
		'sargs' => array(
			'default'   => '#555555',
			'transport' => 'postMessage',
		),
		'cargs' => array(
			'type'    => 'gl-color',
			'section' => 'buttons',
			'label'   => __( 'Button Text Color', 'greenlet' ),
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'button_hover_bg',
		'sargs' => array(
			'default'   => '#ffffff',
			'transport' => 'postMessage',
		),
		'cargs' => array(
			'type'    => 'gl-color',
			'section' => 'buttons',
			'label'   => __( 'Button Hover Background', 'greenlet' ),
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'button_hover_color',
		'sargs' => array(
			'default'   => '#333333',
			'transport' => 'postMessage',
		),
		'cargs' => array(
			'type'    => 'gl-color',
			'section' => 'buttons',
			'label'   => __( 'Button Hover Text', 'greenlet' ),
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'button_border',
		'sargs' => array(
			'default'   => '1px solid #bbbbbb',
			'transport' => 'postMessage',
		),
		'cargs' => array(
			'type'    => 'border',
			'section' => 'buttons',
			'label'   => __( 'Button Border', 'greenlet' ),
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'button_hover_border',
		'sargs' => array(
			'default'   => '1px solid #888888',
			'transport' => 'postMessage',
		),
		'cargs' => array(
			'type'    => 'border',
			'section' => 'buttons',
			'label'   => __( 'Button Hover Border', 'greenlet' ),
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'button_radius',
		'sargs' => array(
			'default'   => '0px',
			'transport' => 'postMessage',
		),
		'cargs' => array(
			'type'     => 'length',
			'sub_type' => 'radius',
			'section'  => 'buttons',
			'label'    => __( 'Button Border Radius', 'greenlet' ),
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'button_font',
		'sargs' => array(
			'transport' => 'postMessage',
		),
		'cargs' => array(
			'type'    => 'font',
			'section' => 'buttons',
			'label'   => __( 'Button Typography', 'greenlet' ),
		),
	);

	$options[] = array(
		'type' => 'section',
		'id'   => 'links',
		'args' => array(
			'title' => __( 'Links', 'greenlet' ),
			'panel' => 'components',
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'link_color',
		'sargs' => array(
			'default'           => '#0277BD',
			'transport'         => 'postMessage',
			'sanitize_callback' => array( 'Greenlet\Sanitizer', 'sanitize_color' ),
		),
		'cargs' => array(
			'type'    => 'gl-color',
			'section' => 'links',
			'label'   => __( 'Link Color', 'greenlet' ),
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'link_hover',
		'sargs' => array(
			'default'           => '#01579B',
			'transport'         => 'postMessage',
			'sanitize_callback' => array( 'Greenlet\Sanitizer', 'sanitize_color' ),
		),
		'cargs' => array(
			'type'    => 'gl-color',
			'section' => 'links',
			'label'   => __( 'Link Hover Color', 'greenlet' ),
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'link_font',
		'sargs' => array(
			'transport' => 'postMessage',
		),
		'cargs' => array(
			'type'    => 'font',
			'section' => 'links',
			'label'   => __( 'Link Typography', 'greenlet' ),
		),
	);

	$options[] = array(
		'type' => 'section',
		'id'   => 'inputs',
		'args' => array(
			'title' => __( 'Inputs', 'greenlet' ),
			'panel' => 'components',
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'input_bg',
		'sargs' => array(
			'default'   => '#ffffff',
			'transport' => 'postMessage',
		),
		'cargs' => array(
			'type'    => 'gl-color',
			'section' => 'inputs',
			'label'   => __( 'Input Background', 'greenlet' ),
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'input_focus_bg',
		'sargs' => array(
			'default'   => '#ffffff',
			'transport' => 'postMessage',
		),
		'cargs' => array(
			'type'    => 'gl-color',
			'section' => 'inputs',
			'label'   => __( 'Input Focus Background', 'greenlet' ),
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'input_color',
		'sargs' => array(
			'default'   => '#383838',
			'transport' => 'postMessage',
		),
		'cargs' => array(
			'type'    => 'gl-color',
			'section' => 'inputs',
			'label'   => __( 'Input Text Color', 'greenlet' ),
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'input_focus_color',
		'sargs' => array(
			'default'   => '#ffffff',
			'transport' => 'postMessage',
		),
		'cargs' => array(
			'type'    => 'gl-color',
			'section' => 'inputs',
			'label'   => __( 'Input Focus Text', 'greenlet' ),
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'input_placeholder',
		'sargs' => array(
			'default'   => '#999999',
			'transport' => 'postMessage',
		),
		'cargs' => array(
			'type'    => 'gl-color',
			'section' => 'inputs',
			'label'   => __( 'Input Placeholder', 'greenlet' ),
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'input_focus_placeholder',
		'sargs' => array(
			'default'   => '#999999',
			'transport' => 'postMessage',
		),
		'cargs' => array(
			'type'    => 'gl-color',
			'section' => 'inputs',
			'label'   => __( 'Input Focus Placeholder', 'greenlet' ),
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'input_border',
		'sargs' => array(
			'default'   => '1px solid #bbbbbb',
			'transport' => 'postMessage',
		),
		'cargs' => array(
			'type'    => 'border',
			'section' => 'inputs',
			'label'   => __( 'Input Border', 'greenlet' ),
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'input_focus_border',
		'sargs' => array(
			'default'   => '1px solid #888888',
			'transport' => 'postMessage',
		),
		'cargs' => array(
			'type'    => 'border',
			'section' => 'inputs',
			'label'   => __( 'Input Focus Border', 'greenlet' ),
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'input_radius',
		'sargs' => array(
			'default'   => '0px',
			'transport' => 'postMessage',
		),
		'cargs' => array(
			'type'     => 'length',
			'sub_type' => 'radius',
			'section'  => 'inputs',
			'label'    => __( 'Input Border Radius', 'greenlet' ),
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'input_font',
		'sargs' => array(
			'transport' => 'postMessage',
		),
		'cargs' => array(
			'type'    => 'font',
			'section' => 'inputs',
			'label'   => __( 'Input Typography', 'greenlet' ),
		),
	);

	$options[] = array(
		'type' => 'section',
		'id'   => 'paragraphs',
		'args' => array(
			'title' => __( 'Paragraphs', 'greenlet' ),
			'panel' => 'components',
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'para_color',
		'sargs' => array(
			'default'   => '#383838',
			'transport' => 'postMessage',
		),
		'cargs' => array(
			'type'    => 'gl-color',
			'section' => 'paragraphs',
			'label'   => __( 'Paragraph Color', 'greenlet' ),
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'para_font',
		'sargs' => array(
			'transport' => 'postMessage',
		),
		'cargs' => array(
			'type'    => 'font',
			'section' => 'paragraphs',
			'label'   => __( 'Paragraph Typography', 'greenlet' ),
		),
	);

	$options[] = array(
		'type' => 'section',
		'id'   => 'code',
		'args' => array(
			'title' => __( 'Code', 'greenlet' ),
			'panel' => 'components',
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'code_bg',
		'sargs' => array(
			'default'           => '#f1f1f1',
			'transport'         => 'postMessage',
			'sanitize_callback' => array( 'Greenlet\Sanitizer', 'sanitize_color' ),
		),
		'cargs' => array(
			'type'    => 'gl-color',
			'section' => 'code',
			'label'   => __( 'Code Background', 'greenlet' ),
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'code_color',
		'sargs' => array(
			'default'   => '#383838',
			'transport' => 'postMessage',
		),
		'cargs' => array(
			'type'    => 'gl-color',
			'section' => 'code',
			'label'   => __( 'Code Color', 'greenlet' ),
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'code_border',
		'sargs' => array(
			'default'   => '1px solid #e1e1e1',
			'transport' => 'postMessage',
		),
		'cargs' => array(
			'type'    => 'border',
			'section' => 'code',
			'label'   => __( 'Code Border', 'greenlet' ),
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'code_font',
		'sargs' => array(
			'transport' => 'postMessage',
		),
		'cargs' => array(
			'type'    => 'font',
			'section' => 'code',
			'label'   => __( 'Code Typography', 'greenlet' ),
		),
	);

	$options[] = array(
		'type' => 'section',
		'id'   => 'other_components',
		'args' => array(
			'title' => __( 'Others', 'greenlet' ),
			'panel' => 'components',
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'icons_color',
		'sargs' => array(
			'default'   => '#999999',
			'transport' => 'postMessage',
		),
		'cargs' => array(
			'type'    => 'gl-color',
			'section' => 'other_components',
			'label'   => __( 'Meta Icons Color', 'greenlet' ),
		),
	);

	$options[] = array(
		'type' => 'section',
		'id'   => 'articles',
		'args' => array(
			'title' => __( 'Article Cards', 'greenlet' ),
			'panel' => 'components',
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'article_radius',
		'sargs' => array(
			'default'   => '0px',
			'transport' => 'postMessage',
		),
		'cargs' => array(
			'type'     => 'length',
			'sub_type' => 'radius',
			'section'  => 'articles',
			'label'    => __( 'Article Border Radius', 'greenlet' ),
		),
	);

	$options[] = array(
		'type' => 'section',
		'id'   => 'sidebars',
		'args' => array(
			'title' => __( 'Sidebars', 'greenlet' ),
			'panel' => 'components',
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'sidebar_radius',
		'sargs' => array(
			'default'   => '0px',
			'transport' => 'postMessage',
		),
		'cargs' => array(
			'type'     => 'length',
			'sub_type' => 'radius',
			'section'  => 'sidebars',
			'label'    => __( 'Sidebar Border Radius', 'greenlet' ),
		),
	);

	$options[] = array(
		'type' => 'section',
		'id'   => 'breadcrumb',
		'args' => array(
			'title' => __( 'Breadcrumb', 'greenlet' ),
			'panel' => 'components',
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'breadcrumb_radius',
		'sargs' => array(
			'default'   => '0px',
			'transport' => 'postMessage',
		),
		'cargs' => array(
			'type'     => 'length',
			'sub_type' => 'radius',
			'section'  => 'breadcrumb',
			'label'    => __( 'Breadcrumb Border Radius', 'greenlet' ),
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
		'id'    => 'show_meta',
		'sargs' => array(
			'default'           => array( 'sticky', 'author', 'date', 'cats', 'tags', 'reply' ),
			'sanitize_callback' => array( 'Greenlet\Sanitizer', 'sanitize_multicheck' ),
		),
		'cargs' => array(
			'type'    => 'multicheck',
			'section' => 'blog',
			'label'   => __( 'Show Meta Info', 'greenlet' ),
			'choices' => array(
				'sticky' => 'Featured (Sticky)',
				'author' => 'Author',
				'date'   => 'Published Date',
				'mod'    => 'Updated Date',
				'cats'   => 'Categories',
				'tags'   => 'Tags',
				'reply'  => 'Comments',
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
		'type' => 'section',
		'id'   => 'performance',
		'args' => array(
			'title'    => __( 'Performance', 'greenlet' ),
			'priority' => 250,
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
			'section'     => 'performance',
			'label'       => __( 'Defer CSS', 'greenlet' ),
			'description' => __( 'Load theme CSS files after page load.', 'greenlet' ),
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
			'section'     => 'performance',
			'input_attrs' => array(
				'placeholder' => __( 'Leave Blank to not add Critical CSS.', 'greenlet' ),
			),
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

	$options[] = array(
		'type' => 'section',
		'id'   => 'presets',
		'args' => array(
			'title'    => __( 'Presets', 'greenlet' ),
			'priority' => 300,
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'theme_presets',
		'sargs' => array(
			'default'   => 'default',
			'transport' => 'postMessage',
		),
		'cargs' => array(
			'type'    => 'preset',
			'section' => 'presets',
			'label'   => __( 'Theme Presets', 'greenlet' ),
			'choices' => greenlet_preset_images(),
		),
	);

	return apply_filters( 'greenlet_options', $options );
}
