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

	$css_frameworks = array(
		'default'   => 'Greenlet CSS Framework',
		'bootstrap' => 'Bootstrap ( v4.4.1 & stackpath )',
	);

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

	$content_source = array(
		'ceditor' => __( 'Content Editor', 'greenlet' ),
		'widgets' => __( 'Widgets', 'greenlet' ),
		'manual'  => __( 'Manual Edit', 'greenlet' ),
	);

	$min_sidebars = greenlet_get_min_sidebars();

	$sidebars_qty = array();
	for ( $i = $min_sidebars; $i <= 12; $i++ ) {
		$sidebars_qty[ $i ] = $i;
	}

	// Page top and bottom columns.
	$pagetop_columns    = greenlet_cover_columns( array( 'header', 'topbar' ) );
	$pagebottom_columns = greenlet_cover_columns( array( 'semifooter', 'footer' ) );

	$tcols   = of_get_option( 'topbar_template' );
	$hcols   = of_get_option( 'header_template' );
	$sfcols  = of_get_option( 'semifooter_template' );
	$fcols   = of_get_option( 'footer_template' );
	$tarray  = explode( '-', $tcols );
	$harray  = explode( '-', $hcols );
	$sfarray = explode( '-', $sfcols );
	$farray  = explode( '-', $fcols );

	$wp_editor_settings = array(
		'wpautop'       => true,
		'textarea_rows' => 5,
		'tinymce'       => array( 'plugins' => 'wordpress' ),
	);

	// Start creating options array.
	$options = apply_filters( 'greenlet_before_options', array() );

	$options[] = array(
		'name' => __( 'Main Layout', 'greenlet' ),
		'type' => 'heading',
	);

	$options[] = array(
		'name'    => 'Number of Sidebars ( For Main Container )',
		'desc'    => sprintf(
			'How many sidebars you want ro register for main container of page ? ( Not for header or footer. They will be configured in "Header/Footer Layout".)
			Minimum sidebars required are "%s" according to your templates.',
			$min_sidebars
		),
		'id'      => 'sidebars_qty',
		'class'   => 'mini',
		'std'     => '3',
		'type'    => 'select',
		'options' => $sidebars_qty,
	);

	$options[] = $separator;

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
		'name' => __( 'Header/ Footer Layout', 'greenlet' ),
		'type' => 'heading',
	);

	$options[] = array(
		'name'  => __( 'Show Top Bar?', 'greenlet' ),
		'desc'  => __( 'Check to show topbar. Uncheck to hide.', 'greenlet' ),
		'id'    => 'show_topbar',
		'class' => 'hidden-control',
		'type'  => 'checkbox',
	);

	$options[] = array(
		'name' => __( 'Fixed Topbar?', 'greenlet' ),
		'desc' => __( 'Check to fixed topbar. Uncheck otherwise.', 'greenlet' ),
		'id'   => 'fixed_topbar',
		'type' => 'checkbox',
	);

	$options[] = array(
		'name'  => __( 'Topbar Layout', 'greenlet' ),
		'desc'  => __( 'Enter topbar columns in Format: 4-8  or 3-9-3 etc. (Separated by hyphen. Only integers. Sum should be 12.)', 'greenlet' ),
		'id'    => 'topbar_template',
		'std'   => '6-6',
		'class' => 'mini',
		'type'  => 'text',
	);

	$options[] = array(
		'name'    => __( 'Topbar Content Source', 'greenlet' ),
		'desc'    => __( 'Select Source of content for topbar.', 'greenlet' ),
		'id'      => 'topbar_content_source',
		'std'     => 'ceditor',
		'type'    => 'radio',
		'options' => $content_source,
	);

	$options[] = array(
		'name'  => __( 'Topbar Height', 'greenlet' ),
		'desc'  => __( 'Eg: 50px.', 'greenlet' ),
		'id'    => 'topbar_height',
		'std'   => '50px',
		'class' => 'mini',
		'type'  => 'text',
	);

	$options[] = $separator;

	$options[] = array(
		'name'  => __( 'Header Layout', 'greenlet' ),
		'desc'  => __( 'Enter header columns in Format: 4-8  or 3-9-3 etc. (Separated by hyphen. Only integers. Sum should be 12.)', 'greenlet' ),
		'id'    => 'header_template',
		'std'   => '4-8',
		'class' => 'mini',
		'type'  => 'text',
	);

	$options[] = array(
		'name'    => __( 'Header Content Source', 'greenlet' ),
		'desc'    => __( 'Select Source of content for header.', 'greenlet' ),
		'id'      => 'header_content_source',
		'std'     => 'ceditor',
		'type'    => 'radio',
		'options' => $content_source,
	);

	$options[] = $separator;

	$options[] = array(
		'name'    => __( 'Logo Position', 'greenlet' ),
		'desc'    => __( 'Column for the logo to be displayed. Save options to get columns according to the topbar & header layout.', 'greenlet' ),
		'id'      => 'logo_position',
		'type'    => 'select',
		'options' => $pagetop_columns,
	);

	$options[] = array(
		'name'    => __( 'Main Menu Position', 'greenlet' ),
		'desc'    => __( 'Column for the Main Menu to be displayed. Save options to get columns according to the topbar & header layout.', 'greenlet' ),
		'id'      => 'mmenu_position',
		'type'    => 'select',
		'options' => $pagetop_columns,
	);

	$options[] = array(
		'name'    => __( 'Secondary Menu Position', 'greenlet' ),
		'desc'    => __( 'Column for the Secondary Menu to be displayed. Save options to get columns according to the topbar & header layout.', 'greenlet' ),
		'id'      => 'smenu_position',
		'type'    => 'select',
		'options' => $pagetop_columns,
	);

	$options[] = $separator;

	$options[] = array(
		'name'  => __( 'Show Semi Footer?', 'greenlet' ),
		'desc'  => __( 'Check to show Semi Footer. Uncheck to hide.', 'greenlet' ),
		'id'    => 'show_semifooter',
		'class' => 'hidden-control',
		'type'  => 'checkbox',
	);

	$options[] = array(
		'name'  => __( 'Semi Footer Layout', 'greenlet' ),
		'desc'  => __( 'Enter Semi Footer columns in Format: 4-4-4  or 3-6-3 etc. (Separated by hyphen. Only integers. Sum should be 12.)', 'greenlet' ),
		'id'    => 'semifooter_template',
		'std'   => '3-3-3-3',
		'class' => 'mini',
		'type'  => 'text',
	);

	$options[] = array(
		'name'    => __( 'Semi Footer Content Source', 'greenlet' ),
		'desc'    => __( 'Select Source of content for semi footer.', 'greenlet' ),
		'id'      => 'semifooter_content_source',
		'std'     => 'ceditor',
		'type'    => 'radio',
		'options' => $content_source,
	);

	$options[] = $separator;

	$options[] = array(
		'name'  => __( 'Footer Layout', 'greenlet' ),
		'desc'  => __( 'Enter Footer columns in Format: 6-6  or 12 etc. (Separated by hyphen. Only integers. Sum should be 12.)', 'greenlet' ),
		'id'    => 'footer_template',
		'std'   => '12',
		'class' => 'mini',
		'type'  => 'text',
	);

	$options[] = array(
		'name'    => __( 'Footer Content Source', 'greenlet' ),
		'desc'    => __( 'Select Source of content for footer.', 'greenlet' ),
		'id'      => 'footer_content_source',
		'std'     => 'ceditor',
		'type'    => 'radio',
		'options' => $content_source,
	);

	$options[] = $separator;

	$options[] = array(
		'name'    => __( 'Footer Menu Position', 'greenlet' ),
		'desc'    => __( 'Column for the Footer Menu to be displayed. Save options to get columns according to the semi footer & footer layout.', 'greenlet' ),
		'id'      => 'fmenu_position',
		'type'    => 'select',
		'options' => $pagebottom_columns,
	);

	$options[] = array(
		'name' => __( 'Content Editor', 'greenlet' ),
		'type' => 'heading',
	);

	if ( of_get_option( 'show_topbar' ) === 1 ) {
		$col_id = 1;
		foreach ( $tarray as $width ) {
			$options[] = array(
				// translators: %1$s: Column Position. %2$s: Column width.
				'name'     => sprintf( __( 'Topbar Column %1$s (width = %2$s) Content:', 'greenlet' ), $col_id, $width ),
				'id'       => 'topbar_' . $col_id . '_textarea',
				'std'      => 'Topbar Column ' . $col_id . ' Content',
				'type'     => 'editor',
				'settings' => $wp_editor_settings,
			);
			$col_id++;
		}
	}

	$col_id = 1;
	foreach ( $harray as $width ) {
		$options[] = array(
			// translators: %1$s: Column Position. %2$s: Column width.
			'name'     => sprintf( __( 'Header Column %1$s (width = %2$s) Content:', 'greenlet' ), $col_id, $width ),
			'id'       => 'header_' . $col_id . '_textarea',
			'std'      => 'Header Column ' . $col_id . ' Content',
			'type'     => 'editor',
			'settings' => $wp_editor_settings,
		);
		$col_id++;
	}

	if ( of_get_option( 'show_semifooter' ) === 1 ) {
		$col_id = 1;
		foreach ( $sfarray as $width ) {
			$options[] = array(
				// translators: %1$s: Column Position. %2$s: Column width.
				'name'     => sprintf( __( 'Semi Footer Column %1$s (width = %2$s) Content:', 'greenlet' ), $col_id, $width ),
				'id'       => 'semifooter_' . $col_id . '_textarea',
				'std'      => 'Semi Footer Column ' . $col_id . ' Content',
				'type'     => 'editor',
				'settings' => $wp_editor_settings,
			);
			$col_id++;
		}
	}

	$col_id = 1;
	foreach ( $farray as $width ) {
		$options[] = array(
			// translators: %1$s: Column Position. %2$s: Column width.
			'name'     => sprintf( __( 'Footer Column %1$s (width = %2$s) Content:', 'greenlet' ), $col_id, $width ),
			'id'       => 'footer_' . $col_id . '_textarea',
			'std'      => 'Footer Column ' . $col_id . ' Content',
			'type'     => 'editor',
			'settings' => $wp_editor_settings,
		);
		$col_id++;
	}

	$options[] = array(
		'name' => __( 'Misc Settings', 'greenlet' ),
		'type' => 'heading',
	);

	$options[] = array(
		'name' => __( 'Markup Language', 'greenlet' ),
		'desc' => __( 'Check to use HTML 5 (Current Standard). Uncheck for XHTML (Legacy). ( <a href="http://codex.wordpress.org/HTML_to_XHTML" target="_blank">More info</a> )', 'greenlet' ),
		'id'   => 'is_html5',
		'std'  => 1,
		'type' => 'checkbox',
	);

	$options[] = array(
		'name' => __( 'Schema Markup', 'greenlet' ),
		'desc' => __( 'Check to enable schema.org markup. Uncheck to disable. ( <a href="http://schema.org" target="_blank">More info</a> )', 'greenlet' ),
		'id'   => 'schema',
		'std'  => 1,
		'type' => 'checkbox',
	);

	$options[] = array(
		'name' => __( 'Breadcrumb', 'greenlet' ),
		'desc' => __( 'Check to enable breadcrumb navigation. Uncheck to disable.', 'greenlet' ),
		'id'   => 'breadcrumb',
		'std'  => 1,
		'type' => 'checkbox',
	);

	$options[] = array(
		'name'  => __( 'Breadcrumb Separator', 'greenlet' ),
		'desc'  => __( 'Enter separator between links in breadcrumb. Eg: / or >', 'greenlet' ),
		'id'    => 'breadcrumb_sep',
		'class' => 'mini',
		'std'   => '&raquo;',
		'type'  => 'text',
	);

	$options[] = array(
		'name' => __( 'Show Featured Image in Post List?', 'greenlet' ),
		'desc' => __( 'Check to show featured image on post list and archives. (If exists)', 'greenlet' ),
		'id'   => 'featured_image',
		'std'  => 1,
		'type' => 'checkbox',
	);

	$options[] = array(
		'name'     => __( 'Excerpt length in Post List', 'greenlet' ),
		'desc'     => __( 'Enter number of characters in excerpts for post list and archives.', 'greenlet' ),
		'id'       => 'excerpt_length',
		'std'      => 55,
		'type'     => 'number',
		'settings' => array( 'min' => 0 ),
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

	$options[] = array(
		'name'    => __( 'Pagination', 'greenlet' ),
		'desc'    => __( 'Paging Navigation display format.', 'greenlet' ),
		'id'      => 'paging_nav',
		'std'     => 'number',
		'type'    => 'radio',
		'options' => array(
			'simple'   => 'Simple',
			'number'   => 'Numbered',
			'ajax'     => 'Numbered (Ajax)',
			'load'     => 'Load More Button',
			'infinite' => 'Infinite Scroll',
		),
	);

	return apply_filters( 'greenlet_after_options', $options );
}
