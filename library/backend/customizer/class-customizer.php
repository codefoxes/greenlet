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
	 * Sets up needed actions/filters for the honeypot to initialize.
	 *
	 * @since  1.0.0
	 * @access public
	 * @return void
	 */
	public function __construct() {
		require_once GREENLET_LIBRARY_DIR . '/backend/customizer/custom-controls/class-control-multicheck.php';
		require_once GREENLET_LIBRARY_DIR . '/backend/customizer/custom-controls/class-control-radio-image.php';
		require_once GREENLET_LIBRARY_DIR . '/backend/customizer/custom-controls/class-control-template.php';
		require_once GREENLET_LIBRARY_DIR . '/backend/customizer/custom-controls/class-control-template-sequence.php';
		require_once GREENLET_LIBRARY_DIR . '/backend/customizer/custom-controls/class-control-cover-layout.php';
		require_once GREENLET_LIBRARY_DIR . '/backend/customizer/custom-controls/class-control-divider.php';
		require_once GREENLET_LIBRARY_DIR . '/backend/customizer/custom-controls/class-control-color.php';
		require_once GREENLET_LIBRARY_DIR . '/backend/customizer/custom-controls/class-control-border.php';
		require_once GREENLET_LIBRARY_DIR . '/backend/customizer/custom-controls/class-control-font.php';
		require_once GREENLET_LIBRARY_DIR . '/backend/customizer/custom-controls/class-control-length.php';
		require_once GREENLET_LIBRARY_DIR . '/backend/customizer/custom-controls/class-control-preset.php';
		require_once GREENLET_LIBRARY_DIR . '/backend/customizer/class-sanitizer.php';
		require_once GREENLET_LIBRARY_DIR . '/backend/customizer/options.php';

		add_action( 'customize_register', array( $this, 'greenlet_add_custom_controls' ), 0 );
		add_action( 'customize_register', array( $this, 'greenlet_customize_register' ) );
		add_action( 'customize_controls_enqueue_scripts', array( $this, 'enqueue_scripts' ), 9 );
		add_action( 'customize_preview_init', array( $this, 'enqueue_preview_scripts' ) );
	}

	/**
	 * Enqueue Customizer Scripts.
	 *
	 * @since  1.0.0
	 */
	public function enqueue_scripts() {
		$min = ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ) ? '' : '.min';
		wp_enqueue_script( 'greenlet-controls', GREENLET_LIBRARY_URL . '/backend/assets/js/greenlet-controls' . $min . '.js', array( 'wp-i18n', 'jquery', 'color-wings-controls' ), GREENLET_VERSION, true );
		wp_enqueue_style( 'greenlet-controls', GREENLET_LIBRARY_URL . '/backend/assets/css/greenlet-controls.css', array(), GREENLET_VERSION );
		$control_data = array(
			'ext'     => ( defined( 'GLPRO' ) && ( false !== GLPRO ) ),
			'extText' => __( 'More options with Greenlet Pro', 'greenlet' ),
		);
		$control_data = apply_filters( 'greenlet_control_l10n', $control_data );
		wp_localize_script( 'greenlet-controls', 'glControlData', $control_data );
		if ( function_exists( 'wp_set_script_translations' ) ) {
			wp_set_script_translations( 'greenlet-controls', 'greenlet' );
		}
	}

	/**
	 * Enqueue Customizer Preview Scripts.
	 *
	 * @since  1.1.0
	 */
	public function enqueue_preview_scripts() {
		$min = ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ) ? '' : '.min';
		wp_enqueue_script( 'greenlet-preview', GREENLET_LIBRARY_URL . '/backend/assets/js/greenlet-preview' . $min . '.js', array( 'customize-preview', 'react-dom', 'wp-i18n' ), GREENLET_VERSION, true );
		if ( function_exists( 'wp_set_script_translations' ) ) {
			wp_set_script_translations( 'greenlet-preview', 'greenlet' );
		}
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
			return;
		}

		foreach ( $options as $option ) {
			if ( ! isset( $option['type'] ) ) {
				continue;
			}

			if ( ! in_array( $option['type'], array( 'panel', 'section', 'setting', 'control', 'setting_control' ), true ) ) {
				continue;
			}

			if ( 'panel' === $option['type'] ) {
				$wp_customize->add_panel( $option['id'], $option['args'] );
			} elseif ( 'section' === $option['type'] ) {
				$wp_customize->add_section( $option['id'], $option['args'] );
			} elseif ( 'setting' === $option['type'] ) {
				$wp_customize->add_setting(
					$option['id'],
					array(
						'type'                 => 'theme_mod',
						'capability'           => 'edit_theme_options',
						'default'              => $this->get_setting_param( 'default', $option['args'] ),
						'transport'            => $this->get_setting_param( 'transport', $option['args'] ),
						'sanitize_callback'    => $this->get_setting_param( 'sanitize_callback', $option['args'] ),
						'sanitize_js_callback' => $this->get_setting_param( 'sanitize_js_callback', $option['args'] ),
					)
				);

			} elseif ( 'control' === $option['type'] ) {
				if ( 'divider' === $option['args']['type'] ) {
					$wp_customize->add_control( new Control_Divider( $wp_customize, $option['id'], $option['args'] ) );
				} else {
					$wp_customize->add_control( $option['id'], $option['args'] );
				}
			} elseif ( 'setting_control' === $option['type'] ) {
				$wp_customize->add_setting(
					$option['id'],
					array(
						'type'                 => 'theme_mod',
						'capability'           => 'edit_theme_options',
						'default'              => $this->get_setting_param( 'default', $option['sargs'] ),
						'transport'            => $this->get_setting_param( 'transport', $option['sargs'] ),
						'sanitize_callback'    => $this->get_setting_param( 'sanitize_callback', $option['sargs'] ),
						'sanitize_js_callback' => $this->get_setting_param( 'sanitize_js_callback', $option['sargs'] ),
					)
				);

				if ( 'multicheck' === $option['cargs']['type'] ) {
					$wp_customize->add_control( new Control_Multicheck( $wp_customize, $option['id'], $option['cargs'] ) );

				} elseif ( 'radio-image' === $option['cargs']['type'] ) {
					$wp_customize->add_control( new Control_Radio_Image( $wp_customize, $option['id'], $option['cargs'] ) );

				} elseif ( 'template' === $option['cargs']['type'] ) {
					$wp_customize->add_control( new Control_Template( $wp_customize, $option['id'], $option['cargs'] ) );

				} elseif ( 'template-sequence' === $option['cargs']['type'] ) {
					$wp_customize->add_control( new Control_Template_Sequence( $wp_customize, $option['id'], $option['cargs'] ) );

				} elseif ( 'cover-layout' === $option['cargs']['type'] ) {
					$wp_customize->add_control( new Control_Cover_Layout( $wp_customize, $option['id'], $option['cargs'] ) );

				} elseif ( 'gl-color' === $option['cargs']['type'] ) {
					$wp_customize->add_control( new Control_Color( $wp_customize, $option['id'], $option['cargs'] ) );

				} elseif ( 'border' === $option['cargs']['type'] ) {
					$wp_customize->add_control( new Control_Border( $wp_customize, $option['id'], $option['cargs'] ) );

				} elseif ( 'font' === $option['cargs']['type'] ) {
					$wp_customize->add_control( new Control_Font( $wp_customize, $option['id'], $option['cargs'] ) );

				} elseif ( 'length' === $option['cargs']['type'] ) {
					$wp_customize->add_control( new Control_Length( $wp_customize, $option['id'], $option['cargs'] ) );

				} elseif ( 'preset' === $option['cargs']['type'] ) {
					$wp_customize->add_control( new Control_Preset( $wp_customize, $option['id'], $option['cargs'] ) );

				} elseif ( 'cw-link' === $option['cargs']['type'] ) {
					class_exists( 'ColorWings\Control_Link' ) && $wp_customize->add_control( new \ColorWings\Control_Link( $wp_customize, $option['id'], $option['cargs'] ) );
				} else {
					$wp_customize->add_control( $option['id'], $option['cargs'] );
				}
			}

			if ( isset( $option['pargs'] ) ) {
				$wp_customize->selective_refresh->add_partial(
					$option['id'] . '_partial',
					array(
						'selector'            => $option['pargs']['selector'],
						'settings'            => array( $option['id'] ),
						'render_callback'     => $option['pargs']['render_callback'],
						'container_inclusive' => $option['pargs']['container_inclusive'],
					)
				);
			}
		}
	}

	/**
	 * Register Custom Controls.
	 *
	 * @since  1.0.0
	 * @return void
	 */
	public function greenlet_add_custom_controls() {
		global $wp_customize;

		$wp_customize->register_control_type( 'Greenlet\Control_Multicheck' );
		$wp_customize->register_control_type( 'Greenlet\Control_Radio_Image' );
		$wp_customize->register_control_type( 'Greenlet\Control_Template' );
		$wp_customize->register_control_type( 'Greenlet\Control_Template_Sequence' );
		$wp_customize->register_control_type( 'Greenlet\Control_Cover_Layout' );
		$wp_customize->register_control_type( 'Greenlet\Control_Divider' );
		$wp_customize->register_control_type( 'Greenlet\Control_Color' );
		$wp_customize->register_control_type( 'Greenlet\Control_Border' );
		$wp_customize->register_control_type( 'Greenlet\Control_Font' );
		$wp_customize->register_control_type( 'Greenlet\Control_Length' );
		$wp_customize->register_control_type( 'Greenlet\Control_Preset' );
	}

	/**
	 * Get Setting Argument Parameter.
	 *
	 * @since  1.0.0
	 * @param string $prop        Property name.
	 * @param array  $setting_arg Argument array.
	 *
	 * @return mixed Parameter value.
	 */
	private function get_setting_param( $prop, $setting_arg ) {
		if ( ! isset( $setting_arg[ $prop ] ) ) {
			if ( 'default' === $prop ) {
				return '';
			} elseif ( 'transport' === $prop ) {
				return 'refresh';
			} elseif ( 'sanitize_callback' === $prop ) {
				return '';
			} elseif ( 'sanitize_js_callback' === $prop ) {
				return '';
			}
		}
		return $setting_arg[ $prop ];
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

Customizer::get_instance();
