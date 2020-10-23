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

		$array['main'] = __( 'Main Content', 'greenlet' );

		foreach ( $GLOBALS['wp_registered_sidebars'] as $sidebar ) {
			if ( 0 === strpos( $sidebar['id'], 'sidebar-' ) ) {
				$array[ $sidebar['id'] ] = $sidebar['name'];
			}
		}

		return $array;
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

if ( ! function_exists( 'greenlet_add_script_dependencies' ) ) {
	/**
	 * Add dependency to registered script.
	 *
	 * @since  1.3.5
	 * @param  string $handle Script handle.
	 * @param  array  $deps   Dependencies array.
	 * @return bool           Whether addition is successful.
	 */
	function greenlet_add_script_dependencies( $handle, $deps = array() ) {
		global $wp_scripts;

		$script = $wp_scripts->query( $handle, 'registered' );
		if ( ! $script ) {
			return false;
		}

		foreach ( $deps as $dep ) {
			if ( ! in_array( $dep, $script->deps, true ) ) {
				$script->deps[] = $dep;
			}
		}

		return true;
	}
}
