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
	$content_source = array(
		'widgets' => __( 'Widgets', 'greenlet' ),
		'manual'  => __( 'Manual Edit', 'greenlet' ),
	);

	$min_sidebars = greenlet_get_min_sidebars();

	$sidebars_qty = array();
	for ( $i = $min_sidebars; $i <= 12; $i++ ) {
		$sidebars_qty[ $i ] = $i;
	}

	$imagepath = ADMIN_URL . '/images/';

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
				'default'   => __( 'Greenlet Framework' ),
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
			'sanitize_callback' => array( 'Greenlet\Sanitizer', 'sanitize_css' ),
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
		'id'    => 'topbar_template',
		'sargs' => array(
			'default' => '',
		),
		'cargs' => array(
			'type'        => 'text',
			'section'     => 'header_layout',
			'label'       => __( 'Topbar Layout' ),
			'description' => __( 'Enter topbar columns in Format: 4-8 or 3-9-3 etc. (Separated by hyphen. Only integers. Sum should be 12.)' ),
			'input_attrs' => array(
				'placeholder' => __( '4-8' ),
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
			'label'   => __( 'Topbar Content Source' ),
			'choices' => $content_source,
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
			'description' => __( 'Enter header columns in Format: 4-8 or 3-9-3 etc.' ),
			'input_attrs' => array(
				'placeholder' => __( '4-8' ),
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
			'label'   => __( 'Header Content Source' ),
			'choices' => $content_source,
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
			'label'       => __( 'Logo Position' ),
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
			'label'       => __( 'Main Menu Position' ),
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
			'label'       => __( 'Secondary Menu Position' ),
			'description' => __( 'Column for the Secondary Menu to be displayed.', 'greenlet' ),
			'choices'     => $pagetop_columns,
		),
	);

	$options[] = array(
		'type' => 'section',
		'id'   => 'main_layout',
		'args' => array(
			'title' => __( 'Main Layout' ),
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
			'label'       => __( 'Number of Sidebars ( For Main Container )' ),
			'description' => sprintf(
				'How many sidebars you want ro register for main container of page ? ( Not for header or footer. They will be configured in "Header/Footer Layout".)
				Minimum sidebars required are "%s" according to your templates.',
				$min_sidebars
			),
			'choices'     => $sidebars_qty,
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'home_template',
		'sargs' => array(
			'default' => '12',
		),
		'cargs' => array(
			'type'    => 'radio-image',
			'section' => 'main_layout',
			'label'   => __( 'Home Page (Post List) Layout' ),
			'choices' => $templates_array,
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'home_sequence',
		'sargs' => array(
			'default' => array( 'main', 'sidebar-1' ),
		),
		'cargs' => array(
			'type'       => 'matcher',
			'section'    => 'main_layout',
			'label'      => __( 'Home (Post List) Content' ),
			'options'    => greenlet_column_options( 'home_template' ),
			'selections' => greenlet_column_content_options(),
		),
	);

	$options[] = array(
		'type' => 'section',
		'id'   => 'footer_layout',
		'args' => array(
			'title' => __( 'Footer Layout' ),
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
			'label'   => __( 'Show Semifooter' ),
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
			'label'       => __( 'Semi Footer Layout' ),
			'description' => __( 'Enter semifooter columns in Format: 4-8 or 3-9-3 etc.' ),
			'input_attrs' => array(
				'placeholder' => __( '3-3-3-3' ),
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
			'label'   => __( 'Semi Footer Content Source' ),
			'choices' => $content_source,
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
			'label'       => __( 'Footer Layout' ),
			'description' => __( 'Enter footer columns in Format: 4-8 or 3-9-3 etc.' ),
			'input_attrs' => array(
				'placeholder' => __( '12' ),
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
			'label'   => __( 'Footer Content Source' ),
			'choices' => $content_source,
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
			'label'       => __( 'Footer Menu Position' ),
			'description' => __( 'Column for the Footer Menu to be displayed.', 'greenlet' ),
			'choices'     => $pagebottom_columns,
		),
	);

	$options[] = array(
		'type' => 'section',
		'id'   => 'misc',
		'args' => array(
			'title'    => __( 'Misc Settings' ),
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
			'section'     => 'misc',
			'label'       => __( 'Schema Markup' ),
			'description' => __( 'Enable Schema Markup' ),
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
			'section'     => 'misc',
			'label'       => __( 'Breadcrumb' ),
			'description' => __( 'Enable breadcrumb navigation' ),
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'breadcrumb_sep',
		'sargs' => array(
			'default' => '»',
		),
		'cargs' => array(
			'type'        => 'text',
			'section'     => 'misc',
			'label'       => __( 'Breadcrumb Separator' ),
			'description' => __( 'Separator between links in breadcrumb. Eg: / or >' ),
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
			'section'     => 'misc',
			'label'       => __( 'Featured Image' ),
			'description' => __( 'Show featured image on post list and archives.' ),
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
			'section'     => 'misc',
			'label'       => __( 'Excerpt length' ),
			'description' => __( 'Number of characters in excerpts for post list.' ),
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
			'section'     => 'misc',
			'label'       => __( 'Pagination' ),
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
			'section' => 'misc',
			'label'   => __( 'Show Author Info' ),
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
			'section' => 'misc',
			'label'   => __( 'Show Comments' ),
			'choices' => array(
				'posts' => 'Posts',
				'pages' => 'Pages',
			),
		),
	);

	return $options;
}
