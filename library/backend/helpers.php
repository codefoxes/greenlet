<?php
/**
 * Admin Helper functions.
 *
 * @package greenlet\library\admin
 */

if ( ! function_exists( 'greenlet_column_content_options' ) ) {
	/**
	 * Returns columns content array.
	 * Assigns Main content and sidebars into array and returns.
	 *
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
