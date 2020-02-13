<?php
/**
 * Admin Helper functions.
 *
 * @package greenlet\library\admin
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! function_exists( 'greenlet_column_content_options' ) ) {
	/**
	 * Returns columns content array.
	 * Assigns Main content and sidebars into array and returns.
	 *
	 * @since  1.0.0
	 * @return array column content
	 */
	function greenlet_column_content_options() {

		$array['main'] = 'Main Content';

		foreach ( $GLOBALS['wp_registered_sidebars'] as $sidebar ) {
			$array[ $sidebar['id'] ] = $sidebar['name'];
		}

		return $array;
	}
}


if ( ! function_exists( 'greenlet_cover_columns' ) ) {
	/**
	 * Gets cover (header, footer) columns.
	 *
	 * @since  1.0.0
	 * @param  array $positions Cover positions.
	 * @return array            List of columns
	 */
	function greenlet_cover_columns( $positions = array( 'topbar', 'header', 'semifooter', 'footer' ) ) {

		$cover_columns = array( 'dont-show' => 'Do Not Show' );

		foreach ( $positions as $key => $position ) {
			$cols  = gl_get_option( "{$position}_template", top_bottom_default_columns( $position ) );
			$array = explode( '-', $cols );
			foreach ( $array as $id => $width ) {
				$id++;
				$cover_columns[ $position . '-' . $id ] = ucfirst( $position ) . ' Column ' . $id . ' (width = ' . $width . ')';
			}
		}

		return $cover_columns;
	}
}

if ( ! function_exists( 'greenlet_template_images' ) ) {
	/**
	 * Get Templates Images Array.
	 *
	 * @return array Templates Images Array.
	 */
	function greenlet_template_images() {
		$imagepath = LIBRARY_URL . '/backend/images/';

		return array(
			'12'    => $imagepath . '12.png',
			'8-4'   => $imagepath . '8-4.png',
			'4-8'   => $imagepath . '4-8.png',
			'9-3'   => $imagepath . '9-3.png',
			'3-9'   => $imagepath . '3-9.png',
			'3-6-3' => $imagepath . '3-6-3.png',
			'3-3-6' => $imagepath . '3-3-6.png',
			'6-3-3' => $imagepath . '6-3-3.png',
		);
	}
}

if ( ! function_exists( 'greenlet_is_editor' ) ) {
	/**
	 * Check if the current page is a post edit page.
	 *
	 * @since  1.1.0
	 * @param  string $type Whether new post or editing.
	 * @return boolean
	 */
	function greenlet_is_editor( $type = '' ) {
		global $pagenow;

		if ( 'edit' === $type ) {
			return in_array( $pagenow, array( 'post.php' ), true );
		} elseif ( 'new' === $type ) {
			return in_array( $pagenow, array( 'post-new.php' ), true );
		} else {
			return in_array( $pagenow, array( 'post.php', 'post-new.php' ), true );
		}
	}
}
