<?php
/**
 * Color Wings Manager.
 *
 * @package greenlet\library\addons
 */

namespace Greenlet;

/**
 * Class Color Wings.
 *
 * @since 1.3.0
 */
class ColorWingsOld {
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
		$enable_color_wings = apply_filters( 'enable_color_wings', true );
		if ( ! $enable_color_wings || ! current_user_can( 'edit_theme_options' ) ) {
			return;
		}

		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_scripts' ) );
		add_action( 'after_setup_theme', array( $this, 'remove_admin_bar' ) );
	}

	/**
	 * Enqueue Customizer Preview Scripts.
	 *
	 * @since 1.3.0
	 */
	public function enqueue_scripts() {
		$min = ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ) ? '' : '.min';
		wp_enqueue_script( 'greenlet-preview', LIBRARY_URL . '/backend/assets/js/greenlet-preview' . $min . '.js', array( 'react-dom' ), GREENLET_VERSION, true );
		wp_enqueue_style( 'greenlet-preview', LIBRARY_URL . '/backend/assets/css/greenlet-preview' . $min . '.css', array(), GREENLET_VERSION );
	}

	/**
	 * Remove admin bar for color Wings.
	 *
	 * @since 1.3.0
	 */
	public function remove_admin_bar() {
		show_admin_bar( false );
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

if ( isset( $_GET['color_wings_enable'] ) && 'true' === $_GET['color_wings_enable'] ) { // phpcs:disable
	ColorWingsOld::get_instance();
}
