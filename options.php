<?php
/**
 * Greenlet Theme Options.
 *
 * Defines theme options array.
 *
 * @package Options Framework
 */

/**
 * A unique identifier is defined to store the options in the database and reference them from the theme.
 */
function optionsframework_option_name() {
	// Change this to use your theme slug.
	return 'greenlet-options';
}

/**
 * Define options.
 *
 * Defines an array of options that will be used to generate the settings page and be saved in the database.
 * When creating the 'id' fields, make sure to use all lowercase and no spaces and each ids unique.
 *
 * @since 1.0.0
 */
function optionsframework_options() {

	$separator = array(
		'desc'  => '<hr>',
		'type'  => 'info',
		'class' => 'no-hidden',
	);

	// If using image radio buttons, define a directory path.
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

	$min_sidebars = greenlet_get_min_sidebars();

	$sidebars_qty = array();
	for ( $i = $min_sidebars; $i <= 12; $i++ ) {
		$sidebars_qty[ $i ] = $i;
	}

	// Start creating options array.
	$options = apply_filters( 'greenlet_before_options', array() );

	$options[] = array(
		'name' => __( 'Main Layout', 'greenlet' ),
		'type' => 'heading',
	);

	$options[] = array(
		'name'    => __( 'Home Page (Post List) Layout', 'greenlet' ),
		'desc'    => __(
			'Select Layout for your home page or post list page. If you set a "static page" as home page instead of "post list" then your home page layout will be
			"Default Page Layout" below.',
			'greenlet'
		),
		'id'      => 'home_template',
		'std'     => '12',
		'type'    => 'images',
		'options' => $templates_array,
	);

	$options[] = array(
		'name'       => __( 'Home (Post List) Content', 'greenlet' ),
		'desc'       => __( 'Select content for each columns in Home (Post List) page Layout.', 'greenlet' ),
		'id'         => 'home_sequence',
		'type'       => 'matcher',
		'options'    => greenlet_column_options( 'home_template' ),
		'selections' => greenlet_column_content_options(),
	);

	$options[] = $separator;

	$options[] = array(
		'name'    => __( 'Default Page Layout', 'greenlet' ),
		'desc'    => __( 'Select default layout for all pages. Templates for each page can be set while you create or edit a page.', 'greenlet' ),
		'id'      => 'default_template',
		'std'     => '12',
		'type'    => 'images',
		'options' => $templates_array,
	);

	$options[] = array(
		'name'       => __( 'Page Content', 'greenlet' ),
		'desc'       => __( 'Select content for each columns in Default Page Layout.', 'greenlet' ),
		'id'         => 'default_sequence',
		'type'       => 'matcher',
		'options'    => greenlet_column_options( 'default_template' ),
		'selections' => greenlet_column_content_options(),
	);

	$options[] = $separator;

	$options[] = array(
		'name'    => __( 'Single Post Layout', 'greenlet' ),
		'desc'    => __( 'Select default layout for all posts. Templates for each post can be set while you create or edit a post.', 'greenlet' ),
		'id'      => 'default_post_template',
		'std'     => '12',
		'type'    => 'images',
		'options' => $templates_array,
	);

	$options[] = array(
		'name'       => __( 'Single Post Content', 'greenlet' ),
		'desc'       => __( 'Select content for each columns in Single Post Layout.', 'greenlet' ),
		'id'         => 'default_post_sequence',
		'type'       => 'matcher',
		'options'    => greenlet_column_options( 'default_post_template' ),
		'selections' => greenlet_column_content_options(),
	);

	$options[] = $separator;

	$options[] = array(
		'name'    => 'Archive Layout',
		'desc'    => __( 'Select default layout for all archives.', 'greenlet' ),
		'id'      => 'archive_template',
		'std'     => '12',
		'type'    => 'images',
		'options' => $templates_array,
	);

	$options[] = array(
		'name'       => __( 'Archives Content', 'greenlet' ),
		'desc'       => __( 'Select content for each columns in Archives Layout.', 'greenlet' ),
		'id'         => 'archive_sequence',
		'type'       => 'matcher',
		'options'    => greenlet_column_options( 'archive_template' ),
		'selections' => greenlet_column_content_options(),
	);

	$options[] = array(
		'name' => __( 'Misc Settings', 'greenlet' ),
		'type' => 'heading',
	);

	$options[] = array(
		'name'    => __( 'Show Author Info?', 'greenlet' ),
		'desc'    => __( 'Check to enable Author Information in Post footer .', 'greenlet' ),
		'id'      => 'show_author',
		'std'     => array(
			'name'  => '1',
			'image' => '1',
			'bio'   => '1',
		),
		'type'    => 'multicheck',
		'options' => array(
			'name'  => 'Name',
			'image' => 'Avatar',
			'bio'   => 'Biographical Info',
		),
	);

	$options[] = array(
		'name'    => __( 'Show Comments On:', 'greenlet' ),
		'desc'    => __( 'Check to enable comments.', 'greenlet' ),
		'id'      => 'show_comments',
		'std'     => array(
			'posts' => '1',
			'pages' => '1',
		),
		'type'    => 'multicheck',
		'options' => array(
			'posts' => 'Posts',
			'pages' => 'Pages',
		),
	);

	return apply_filters( 'greenlet_after_options', $options );
}
