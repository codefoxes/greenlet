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

	$posts_count   = array_combine( range( 1, 40 ), range( 1, 40 ) );
	$posts_columns = array_combine( range( 1, 12 ), range( 1, 12 ) );

	$options = array();

	// Site Identity.

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
			'priority'    => 22,
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
			'choices' => greenlet_css_frameworks(),
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
		'type' => 'section',
		'id'   => 'header_section',
		'args' => array(
			'title' => __( 'Header Layout', 'greenlet' ),
			'panel' => 'layout',
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'header_layout',
		'sargs' => array(
			'default' => greenlet_cover_layout_defaults( 'header' ),
		),
		'cargs' => array(
			'type'     => 'cover-layout',
			'section'  => 'header_section',
			'label'    => __( 'Header Layout', 'greenlet' ),
			'position' => 'header',
			'choices'  => greenlet_template_images( 'cover' ),
			'items'    => greenlet_cover_layout_items( 'header' ),
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
			'label'       => __( 'Main Layout Sidebars', 'greenlet' ),
			'description' => __( 'Number of sidebars to register for the main container of the page', 'greenlet' ),
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
		'id'   => 'footer_section',
		'args' => array(
			'title' => __( 'Footer Layout', 'greenlet' ),
			'panel' => 'layout',
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'footer_layout',
		'sargs' => array(
			'default' => greenlet_cover_layout_defaults( 'footer' ),
		),
		'cargs' => array(
			'type'     => 'cover-layout',
			'section'  => 'footer_section',
			'label'    => __( 'Footer Layout', 'greenlet' ),
			'position' => 'footer',
			'choices'  => greenlet_template_images( 'cover' ),
			'items'    => greenlet_cover_layout_items( 'footer' ),
		),
	);

	// Blog Settings.
	$options[] = array(
		'type' => 'panel',
		'id'   => 'blog',
		'args' => array(
			'title'       => __( 'Blog Settings', 'greenlet' ),
			'description' => __( 'Blog posts settings.', 'greenlet' ),
			'priority'    => 24,
		),
	);

	$options[] = array(
		'type' => 'section',
		'id'   => 'blog_list',
		'args' => array(
			'title' => __( 'Post List', 'greenlet' ),
			'panel' => 'blog',
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'posts_count',
		'sargs' => array(
			'default' => 10,
		),
		'cargs' => array(
			'type'        => 'select',
			'section'     => 'blog_list',
			'label'       => __( 'Posts per page', 'greenlet' ),
			'description' => __( 'Number of posts in post list page.', 'greenlet' ),
			'choices'     => $posts_count,
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'post_list_layout',
		'sargs' => array(
			'default' => 'list',
		),
		'cargs' => array(
			'type'        => 'radio',
			'section'     => 'blog_list',
			'label'       => __( 'Post List Layout', 'greenlet' ),
			'description' => __( 'Layout variation for Post list.', 'greenlet' ),
			'choices'     => greenlet_post_list_layouts(),
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'posts_columns',
		'sargs' => array(
			'default' => 3,
		),
		'cargs' => array(
			'type'        => 'select',
			'section'     => 'blog_list',
			'label'       => __( 'Posts per row', 'greenlet' ),
			'description' => __( 'Number of posts in a single row (columns).', 'greenlet' ),
			'choices'     => $posts_columns,
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'content_layout_list',
		'sargs' => array(
			'default' => greenlet_content_layout_defaults(),
		),
		'cargs' => array(
			'type'    => 'content-layout',
			'section' => 'blog_list',
			'label'   => __( 'Post Sections', 'greenlet' ),
			'groups'  => array( 'above', 'top', 'middle', 'bottom', 'below' ),
			'items'   => greenlet_content_layout_items(),
		),
	);

	$options[] = array(
		'type' => 'section',
		'id'   => 'blog_single',
		'args' => array(
			'title' => __( 'Single Post', 'greenlet' ),
			'panel' => 'blog',
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'content_layout',
		'sargs' => array(
			'default' => greenlet_content_layout_defaults( 'single' ),
		),
		'cargs' => array(
			'type'    => 'content-layout',
			'section' => 'blog_single',
			'label'   => __( 'Post Sections', 'greenlet' ),
			'groups'  => array( 'above', 'top', 'middle', 'bottom', 'below' ),
			'items'   => greenlet_content_layout_items(),
		),
	);

	$options[] = array(
		'type' => 'section',
		'id'   => 'blog_page',
		'args' => array(
			'title' => __( 'Single Page', 'greenlet' ),
			'panel' => 'blog',
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'content_layout_page',
		'sargs' => array(
			'default' => greenlet_content_layout_defaults( 'page' ),
		),
		'cargs' => array(
			'type'    => 'content-layout',
			'section' => 'blog_page',
			'label'   => __( 'Page Sections', 'greenlet' ),
			'groups'  => array( 'above', 'top', 'middle', 'bottom', 'below' ),
			'items'   => greenlet_content_layout_items(),
		),
	);

	$options[] = array(
		'type' => 'section',
		'id'   => 'blog_extra',
		'args' => array(
			'title' => __( 'Others', 'greenlet' ),
			'panel' => 'blog',
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
			'section'     => 'blog_extra',
			'label'       => __( 'Schema Markup', 'greenlet' ),
			'description' => __( 'Enable Schema Markup', 'greenlet' ),
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'search_submit',
		'sargs' => array(
			'default' => 'icon',
		),
		'cargs' => array(
			'type'        => 'radio',
			'section'     => 'blog_extra',
			'label'       => __( 'Search button', 'greenlet' ),
			'description' => __( 'Search form submit button content.', 'greenlet' ),
			'choices'     => array(
				'text' => __( 'Text', 'greenlet' ),
				'icon' => __( 'Icon', 'greenlet' ),
			),
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'to_top',
		'sargs' => array(
			'default'   => '1',
			'transport' => 'postMessage',
		),
		'cargs' => array(
			'type'        => 'checkbox',
			'section'     => 'blog_extra',
			'label'       => __( 'Back to top', 'greenlet' ),
			'description' => __( 'Show back to top scroll button.', 'greenlet' ),
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'to_top_at',
		'sargs' => array(
			'default'   => '100px',
			'transport' => 'postMessage',
		),
		'cargs' => array(
			'type'    => 'length',
			'section' => 'blog_extra',
			'label'   => __( 'Show back to top button at position.', 'greenlet' ),
			'units'    => array( 'px' => array( 'step' => 1, 'min' => 0, 'max' => 2000 ), '%' => array( 'step' => 1, 'min' => 0, 'max' => 100 ) ) // phpcs:ignore
		),
	);

	$options[] = array(
		'type'  => 'setting_control',
		'id'    => 'editor_styles',
		'sargs' => array(
			'default'   => false,
			'transport' => 'postMessage',
		),
		'cargs' => array(
			'type'        => 'checkbox',
			'section'     => 'blog_extra',
			'label'       => __( 'Editor Styles', 'greenlet' ),
			'description' => __( 'Match the Post editor styles to the frontend styles.', 'greenlet' ),
			'priority'    => 900,
		),
	);

	$options[] = array(
		'type' => 'section',
		'id'   => 'performance',
		'args' => array(
			'title'    => __( 'Performance', 'greenlet' ),
			'priority' => 26,
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
		'type'  => 'setting_control',
		'id'    => 'inline_block_css',
		'sargs' => array(
			'default' => '1',
		),
		'cargs' => array(
			'type'        => 'checkbox',
			'section'     => 'performance',
			'label'       => __( 'Inline WP Block Editor CSS', 'greenlet' ),
			'description' => __( 'Load WP Block Editor CSS files inline, saves network requests.', 'greenlet' ),
		),
	);

	$options[] = array(
		'type' => 'section',
		'id'   => 'presets',
		'args' => array(
			'title'    => __( 'Presets', 'greenlet' ),
			'priority' => 28,
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
