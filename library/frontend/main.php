<?php
/**
 * Frontend Main functions.
 *
 * @package greenlet\library\frontend
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_action( 'wp_ajax_greenlet_get_paginated', 'greenlet_get_paginated' );
add_action( 'wp_ajax_nopriv_greenlet_get_paginated', 'greenlet_get_paginated' );


if ( ! function_exists( 'greenlet' ) ) {
	/**
	 * Greenlet function.
	 *
	 * Gets header and footer.
	 * Creates main action hooks.
	 *
	 * @since 1.0.0
	 *
	 * @see wp-includes/general-template.php.
	 * @see wp-includes/plugin.php.
	 */
	function greenlet() {

		get_header();

		do_action( 'greenlet_before_main_container' );

		// see library/main-structure.php for default actions for this hook.
		do_action( 'greenlet_main_container' );

		do_action( 'greenlet_after_main_container' );

		get_footer();
	}
}


if ( ! function_exists( 'greenlet_cover' ) ) {
	/**
	 * Greenlet Cover function.
	 *
	 * Get templates for Topbar, Header, Semifooter, Footer.
	 * Get templates for logo and registered menus.
	 *
	 * @since 1.0.0
	 * @see wp-includes/general-template.php.
	 *
	 * @param string $pos column position.
	 */
	function greenlet_cover( $pos = 'header' ) {

		// Set variables.
		$layout_option = $pos . '_template';
		$source_option = $pos . '_content_source';

		// Get logo and menu positions from options, else set default values.
		$logo_position  = gl_get_option( 'logo_position', 'header-1' );
		$mmenu_position = gl_get_option( 'mmenu_position', 'header-2' );
		$smenu_position = gl_get_option( 'smenu_position', 'dont-show' );
		$fmenu_position = gl_get_option( 'fmenu_position', 'dont-show' );
		$layout         = gl_get_option( $layout_option, top_bottom_default_columns( $pos ) );
		$source         = gl_get_option( $source_option, 'manual' );

		$layout = ( '' === $layout ) ? top_bottom_default_columns( $pos ) : $layout;

		// Create new column object with current layout as parameter.
		// @see library/classes.php.
		$cobj = new ColumnObject( $layout );

		// For each columns in the array.
		$i = 1;
		foreach ( $cobj->array as $col ) {

			$args = array(
				'primary' => "{$pos}-{$i} {$pos}-column",
				'width'   => $col,
			);

			printf( '<div %s>', wp_kses( greenlet_attr( $args ), null ) );

			do_action( "greenlet_before_{$pos}_{$i}_content" );

			// If current position has logo or menu, get template part.
			switch ( $pos . '-' . $i ) {

				case $logo_position:
					get_template_part( 'templates/logo' );
					break;

				case $mmenu_position:
					get_template_part( 'templates/menu/main' );
					break;

				case $smenu_position:
					get_template_part( 'templates/menu/secondary' );
					break;

				case $fmenu_position:
					get_template_part( 'templates/menu/footer' );
					break;
			}

			// Get content from the option source.
			switch ( $source ) {

				case 'widgets':
					// Get dynamic sidebar.
					dynamic_sidebar( $pos . '-sidebar-' . $i );
					break;

				case 'manual':
					// Get current column template.
					get_template_part( 'templates/' . $pos . '/column', ( $i ) );
					break;
			}

			do_action( "greenlet_after_{$pos}_{$i}_content" );

			echo '</div>';
			$i++;
		}
	}
}