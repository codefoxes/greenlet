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
			if ( 0 === strpos( $sidebar['id'], 'sidebar-' ) ) {
				$array[ $sidebar['id'] ] = $sidebar['name'];
			}
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
	 * @param  string $section Section for which to fetch images.
	 * @return array  Templates Images Array.
	 */
	function greenlet_template_images( $section = 'main' ) {
		$imagepath = GL_LIBRARY_URL . '/backend/assets/images/main/';

		if ( 'cover' === $section ) {
			$imagepath = GL_LIBRARY_URL . '/backend/assets/images/cover/';

			$templates = array(
				'12'      => $imagepath . '12.svg',
				'8-4'     => $imagepath . '8-4.svg',
				'4-8'     => $imagepath . '4-8.svg',
				'9-3'     => $imagepath . '9-3.svg',
				'3-9'     => $imagepath . '3-9.svg',
				'2-10'    => $imagepath . '2-10.svg',
				'10-2'    => $imagepath . '10-2.svg',
				'6-6'     => $imagepath . '6-6.svg',
				'4-4-4'   => $imagepath . '4-4-4.svg',
				'3-3-3-3' => $imagepath . '3-3-3-3.svg',
				'3-6-3'   => $imagepath . '3-6-3.svg',
				'3-3-6'   => $imagepath . '3-3-6.svg',
			);
		} else {
			$templates = array(
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

		return $templates;
	}
}

if ( ! function_exists( 'greenlet_get_presets' ) ) {
	/**
	 * Get All presets.
	 *
	 * @since  1.2.0
	 *
	 * @return array Presets array.
	 */
	function greenlet_get_presets() {
		$presets_file = GL_LIBRARY_DIR . '/backend/customizer/presets.json';
		$presets      = greenlet_get_file_contents( $presets_file );
		return json_decode( $presets, true );
	}
}

if ( ! function_exists( 'greenlet_preset_images' ) ) {
	/**
	 * Get Preset Images Array.
	 *
	 * @since 1.2.0
	 *
	 * @return array  Preset Images Array.
	 */
	function greenlet_preset_images() {
		$imagepath = GL_LIBRARY_URL . '/backend/assets/images/presets/';
		$presets   = greenlet_get_presets();
		$images    = array();

		foreach ( $presets as $preset => $preset_data ) {
			$image_name = strtolower( str_replace( ' ', '-', $preset ) ) . '.svg';

			$images[ $preset ] = $imagepath . $image_name;
		}
		return $images;
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
