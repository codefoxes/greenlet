<?php
/**
 * Customizer Manager.
 *
 * @package greenlet\library\admin\customizer
 */

namespace Greenlet;

/**
 * Sets up Customizer Options.
 *
 * @since  1.0.0
 */
class Customizer {

	/**
	 * Holds the instances of this class.
	 *
	 * @since  1.0.0
	 * @access private
	 * @var    object
	 */
	private static $instance;

	/**
	 * Holds the theme options array.
	 *
	 * @since  1.0.0
	 * @access private
	 * @var    array
	 */
	private static $options;

	/**
	 * Sets up needed actions/filters for the honeypot to initialize.
	 *
	 * @since  1.0.0
	 * @access public
	 * @return void
	 */
	public function __construct() {
		require_once ADMIN_DIR . '/customizer/custom-controls/class-control-multicheck.php';
		require_once ADMIN_DIR . '/customizer/custom-controls/class-control-radio-image.php';
		require_once ADMIN_DIR . '/customizer/custom-controls/class-control-template-selector.php';
		require_once ADMIN_DIR . '/customizer/class-sanitizer.php';

		// Todo: Load options.php from child theme if exists?
		require_once ADMIN_DIR . '/customizer/options.php';

		add_action( 'customize_register', array( $this, 'greenlet_add_custom_controls' ), 0 );
		add_action( 'customize_register', array( $this, 'greenlet_customize_register' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_scripts' ) );
	}

	/**
	 * Enqueue Customizer Scripts.
	 */
	public function enqueue_scripts() {
		wp_enqueue_style( 'wp-color-picker' );
		wp_enqueue_script( 'wp-color-picker' );
	}

	/**
	 * Register theme customizer.
	 *
	 * @since  1.0.0
	 * @access public
	 * @param object $wp_customize WP_Customize_Manager.
	 */
	public function greenlet_customize_register( $wp_customize ) {
		$options = greenlet_options();

		if ( ! is_array( $options ) ) {
			// Todo: throw Exception.
			return;
		}

		foreach ( $options as $option ) {
			if ( ! isset( $option['type'] ) ) {
				continue;
			}

			// Todo: Continue if args are not correct.

			if ( ! in_array( $option['type'], array( 'panel', 'section', 'setting', 'control', 'setting_control' ), true ) ) {
				continue;
			}

			if ( 'panel' === $option['type'] ) {
				$wp_customize->add_panel( $option['id'], $option['args'] );
			} elseif ( 'section' === $option['type'] ) {
				$wp_customize->add_section( $option['id'], $option['args'] );
			} elseif ( 'setting' === $option['type'] ) {
				$option['args']['type']       = 'theme_mod';
				$option['args']['capability'] = 'edit_theme_options';

				$wp_customize->add_setting( $option['id'], $option['args'] );
			} elseif ( 'control' === $option['type'] ) {
				$wp_customize->add_control( $option['id'], $option['args'] );
			} elseif ( 'setting_control' === $option['type'] ) {
				$option['sargs']['type']       = 'theme_mod';
				$option['sargs']['capability'] = 'edit_theme_options';

				$wp_customize->add_setting( $option['id'], $option['sargs'] );

				if ( 'multicheck' === $option['cargs']['type'] ) {
					$wp_customize->add_control( new Control_Multicheck( $wp_customize, $option['id'], $option['cargs'] ) );

				} elseif ( 'radio-image' === $option['cargs']['type'] ) {
					$wp_customize->add_control( new Control_Radio_Image( $wp_customize, $option['id'], $option['cargs'] ) );

				} elseif ( 'template-selector' === $option['cargs']['type'] ) {
					$wp_customize->add_control( new Control_Template_Selector( $wp_customize, $option['id'], $option['cargs'] ) );

				} else {
					$wp_customize->add_control( $option['id'], $option['cargs'] );
				}
			}
		}
	}

	/**
	 * Register Custom Controls.
	 *
	 * @return void
	 */
	public function greenlet_add_custom_controls() {
		global $wp_customize;

		$wp_customize->register_control_type( 'Greenlet\Control_Multicheck' );
		$wp_customize->register_control_type( 'Greenlet\Control_Radio_Image' );
		$wp_customize->register_control_type( 'Greenlet\Control_Template_Selector' );
	}

	/**
	 * Returns the instance.
	 *
	 * @since  1.0.0
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
	Customizer::get_instance();
}
