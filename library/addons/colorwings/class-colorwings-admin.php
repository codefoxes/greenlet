<?php
/**
 * Color Wings Admin Manager.
 *
 * @package ColorWings
 */

namespace ColorWings;

/**
 * Class Color Wings Admin.
 *
 * @since 1.0.0
 */
class ColorWings_Admin {
	/**
	 * Holds the instances of this class.
	 *
	 * @since  1.0.0
	 * @access private
	 * @var    object
	 */
	private static $instance;

	/**
	 * Sets up Color Wings admin features.
	 *
	 * @since  1.0.0
	 * @access public
	 * @return void
	 */
	public function __construct() {
		$enable_color_wings = apply_filters( 'enable_color_wings', true );
		if ( ! $enable_color_wings ) {
			return;
		}

		add_action( 'customize_register', array( $this, 'require_control_classes' ) );
		add_action( 'customize_register', array( $this, 'register_controls' ) );
		add_action( 'customize_register', array( $this, 'add_controls' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_preview_scripts' ), 20 );
	}

	/**
	 * Require control classes.
	 *
	 * @since  1.0.0
	 */
	public function require_control_classes() {
		require_once dirname( __FILE__ ) . '/class-control-colorwings.php';
		require_once dirname( __FILE__ ) . '/class-control-link.php';
	}

	/**
	 * Enqueue Customizer Preview Scripts.
	 *
	 * @since  1.0.0
	 */
	public function enqueue_preview_scripts() {
		$min = ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ) ? '' : '.min';
		wp_enqueue_script( 'color-wings-preview', COLORWINGS_URL . '/js/color-wings-preview' . $min . '.js', array( 'react-dom', 'customize-preview' ), COLORWINGS_VERSION, true );

		$preview_object = array(
			'pages' => array(
				'is_front_page' => is_front_page(),
				'is_home'       => is_home(),
				'is_archive'    => is_archive(),
				'is_page'       => is_page(),
				'is_single'     => is_single(),
			),
			'page'  => array(
				'id'    => get_the_ID(),
				'title' => get_the_title(),
			),
		);
		wp_localize_script( 'color-wings-preview', 'cwPreviewObject', $preview_object );
	}

	/**
	 * Register Custom Control.
	 *
	 * @since 1.0.0
	 * @param object $wp_customize WP_Customize_Manager.
	 */
	public function register_controls( $wp_customize ) {
		$wp_customize->register_control_type( 'ColorWings\Control_ColorWings' );
		$wp_customize->register_control_type( 'ColorWings\Control_Link' );
	}

	/**
	 * Add Custom Control.
	 *
	 * @since 1.0.0
	 * @param object $wp_customize WP_Customize_Manager.
	 */
	public function add_controls( $wp_customize ) {
		$wp_customize->add_section(
			'extra_styles',
			array(
				'title'      => __( 'Extra Styles', 'greenlet' ),
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
				'validate_callback' => array( $this, 'validate' ),
				'default'           => array(
					get_stylesheet() => array(
						'global' => array(
							'type'   => 'global',
							'styles' => '',
						),
					),
				),
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
	 * Sanitize ColorWings Settings.
	 *
	 * @since  1.0.0
	 * @access public
	 * @param  array $settings ColorWings Settings.
	 *
	 * @return array           Sanitized settings.
	 */
	public static function sanitize( $settings ) {
		if ( ! isset( $settings[ get_stylesheet() ] ) ) {
			return array();
		}

		return $settings;
	}

	/**
	 * Validate ColorWings Settings.
	 *
	 * @since 1.0.0
	 * @access public
	 * @param \WP_Error $validity True if the input was validated, otherwise WP_Error.
	 * @param array     $settings ColorWings Settings.
	 *
	 * @return \WP_Error          Validity object.
	 */
	public static function validate( $validity, $settings ) {
		foreach ( $settings as $theme => $theme_data ) {
			foreach ( $theme_data as $type => $data ) {
				if ( isset( $data['styles'] ) && preg_match( '#</?\w+#', $data['styles'] ) ) {
					$validity->add( 'illegal_markup', __( 'Markup is not allowed in CSS.', 'greenlet' ) );
				}
			}
		}

		return $validity;
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
