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
				'type'       => 'theme_mod',
				'capability' => 'edit_theme_options',
				'transport'  => 'postMessage',
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
