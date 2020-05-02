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
		$enable_color_wings = apply_filters( 'enable_color_wings', true );
		if ( ! $enable_color_wings ) {
			return;
		}

		require_once dirname( __FILE__ ) . '/class-control-colorwings.php';

		add_action( 'customize_register', array( $this, 'add_controls' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_preview_scripts' ), 20 );
	}

	/**
	 * Enqueue Customizer Preview Scripts.
	 *
	 * @since  1.3.0
	 */
	public function enqueue_preview_scripts() {
		$pages = array(
			'is_front_page' => is_front_page(),
			'is_home'       => is_home(),
			'is_archive'    => is_archive(),
			'is_page'       => is_page(),
			'is_single'     => is_single(),
		);
		wp_localize_script( 'greenlet-preview', 'previewObject', $pages );
	}

	/**
	 * Add Custom Control.
	 *
	 * @since 1.3.0
	 * @param object $wp_customize WP_Customize_Manager.
	 */
	public function add_controls( $wp_customize ) {
		$wp_customize->register_control_type( 'ColorWings\Control_ColorWings' );

		$wp_customize->add_section(
			'extra_styles',
			array(
				'title'      => __( 'Extra Styles' ),
				'priority'   => 900,
				'capability' => 'edit_theme_options',
			)
		);

		$wp_customize->add_setting(
			'color_wings',
			array(
				'type'              => 'option',
				'capability'        => 'edit_theme_options',
				'transport'         => 'postMessage',
				'sanitize_callback' => array( $this, 'sanitize' ),
			)
		);

		$wp_customize->add_control(
			new Control_ColorWings(
				$wp_customize,
				'color_wings',
				array( 'section' => 'extra_styles' )
			)
		);
	}

	/**
	 * Sanitizes ColorWings Settings.
	 *
	 * @since  1.3.0
	 * @access public
	 * @param  array $settings ColorWings Settings.
	 *
	 * @return array Sanitized Settings.
	 */
	public static function sanitize( $settings ) {
		return $settings;
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

global $wp_customize;
if ( is_admin() || isset( $wp_customize ) ) {
	ColorWings::get_instance();
}
