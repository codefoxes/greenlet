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
		'sargs' => array(),
		'cargs' => array(
			'type'    => 'cw-link',
			'section' => 'title_tagline',
			'label'   => __( 'Title Styles', 'greenlet' ),
			'options' => array(
				'selector' => 'a.site-url',
			),
		),
	);

	// Layout.
	$options[] = array(
		'type' => 'panel',
		'id'   => 'layout',
		'args' => array(
			'title'       => __( 'Layout', 'greenlet' ),
			'description' => __( 'Site Layout.', 'greenlet' ),
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
		'sargs' => array(),
		'cargs' => array(
			'type'    => 'cw-link',
			'section' => 'header_layout',
			'label'   => __( 'Topbar Styles', 'greenlet' ),
			'options' => array(
				'selector' => '.topbar',
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
		'sargs' => array(),
		'cargs' => array(
			'type'    => 'cw-link',
			'section' => 'header_layout',
			'label'   => __( 'Header Styles', 'greenlet' ),
			'options' => array(
				'selector' => '.site-header',
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
		'sargs' => array(),
		'cargs' => array(
			'type'    => 'cw-link',
			'section' => 'main_layout',
			'label'   => __( 'Main Layout Styles', 'greenlet' ),
			'options' => array(
				'selector' => '.site-content',
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
		'sargs' => array(),
		'cargs' => array(
			'type'    => 'cw-link',
			'section' => 'footer_layout',
			'label'   => __( 'Semi Footer Styles', 'greenlet' ),
			'options' => array(
				'selector' => '.semifooter',
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
		'sargs' => array(),
		'cargs' => array(
			'type'    => 'cw-link',
			'section' => 'footer_layout',
			'label'   => __( 'Footer Styles', 'greenlet' ),
			'options' => array(
				'selector' => '.site-footer',
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

	// Blog Settings.
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
		'type'  => 'setting_control',
		'id'    => 'editor_styles',
		'sargs' => array(
			'default'   => '1',
			'transport' => 'postMessage',
		),
		'cargs' => array(
			'type'        => 'checkbox',
			'section'     => 'blog',
			'label'       => __( 'Editor Styles', 'greenlet' ),
			'description' => __( 'Match the Post editor styles to the frontend styles.', 'greenlet' ),
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
		'id'    => 'inline_css',
		'sargs' => array(
			'default' => '1',
		),
		'cargs' => array(
			'type'        => 'checkbox',
			'section'     => 'performance',
			'label'       => __( 'Inline CSS', 'greenlet' ),
			'description' => __( 'Load theme CSS files inline, saves network requests.', 'greenlet' ),
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
		'id'    => 'inline_js',
		'sargs' => array(
			'default' => '1',
		),
		'cargs' => array(
			'type'        => 'checkbox',
			'section'     => 'performance',
			'label'       => __( 'Inline Javascript', 'greenlet' ),
			'description' => __( 'Load theme JS files inline, saves a network request.', 'greenlet' ),
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
		'type'  => 'setting_control',
		'id'    => 'defer_block_css',
		'sargs' => array(
			'default' => '1',
		),
		'cargs' => array(
			'type'        => 'checkbox',
			'section'     => 'performance',
			'label'       => __( 'Defer WP Block Editor CSS', 'greenlet' ),
			'description' => __( 'Load Block Editor CSS files after page load.', 'greenlet' ),
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
