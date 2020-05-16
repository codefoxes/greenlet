<?php
/**
 * Color Wings Manager.
 *
 * @package greenlet\library\addons
 */

namespace ColorWings;

/**
 * Class Color Wings.
 *
 * @since 1.3.0
 */
class ColorWings {
	/**
	 * Holds the instances of this class.
	 *
	 * @since  1.3.0
	 * @access private
	 * @var    object
	 */
	private static $instance;

	/**
	 * Sets up Color Wings Features.
	 *
	 * @since  1.3.0
	 * @access public
	 * @return void
	 */
	public function __construct() {
		global $wp_customize;
		if ( is_admin() || isset( $wp_customize ) ) {
			require_once dirname( __FILE__ ) . '/class-colorwings-admin.php';
			ColorWings_Admin::get_instance();
		}

		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_scripts' ) );
		add_filter( 'wp_get_custom_css', array( $this, 'append_styles' ) );
	}

	/**
	 * Enqueue scripts.
	 *
	 * @since  1.3.0
	 * @access public
	 * @return void
	 */
	public function enqueue_scripts() {
		$cw = get_option( 'color_wings' );
		if ( false === $cw ) {
			return;
		}

		global $cw_styles;
		$cw_styles = '';
		foreach ( $cw as $page => $value ) {
			if ( 'global' === $value['type'] ) {
				$cw_styles .= $value['styles'];
			} elseif ( 'template' === $value['type'] ) {
				if (
					( 'is_front_page' === $page && is_front_page() )
					|| ( 'is_home' === $page && is_home() )
					|| ( 'is_archive' === $page && is_archive() )
					|| ( 'is_page' === $page && is_page() )
					|| ( 'is_single' === $page && is_page() )
				) {
					$cw_styles .= $value['styles'];
				}
			}
		}
	}

	/**
	 * Append Color Wings styles.
	 *
	 * @since  1.3.0
	 * @param  string $css WP custom styles.
	 * @return string      CW Appended styles.
	 */
	public function append_styles( $css ) {
		global $cw_styles;
		$cw_styles = trim( $cw_styles );
		if ( '' === $cw_styles ) {
			return $css;
		}

		$css .= $cw_styles;
		return $css;
	}

	/**
	 * Returns the instance.
	 *
	 * @since  1.3.0
	 * @access public
	 * @return object
	 */
	public static function get_instance() {

		if ( ! self::$instance ) {
			self::$instance = new self();
		}

		return self::$instance;
	}
}

ColorWings::get_instance();
