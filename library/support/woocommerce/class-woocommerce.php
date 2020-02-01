<?php
/**
 * WooCommerce Support.
 *
 * @package greenlet\library\support\woocommerce
 */

namespace Greenlet\Support;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * WooCommerce Manager.
 *
 * @since  1.1.0
 * @access public
 */
class WooCommerce {
	/**
	 * Holds the instances of this class.
	 *
	 * @since  1.1.0
	 * @access private
	 * @var    object
	 */
	private static $instance;

	/**
	 * WooCommerce constructor.
	 *
	 * @since  1.1.0
	 */
	public function __construct() {
		// Do nothing if WooCommerce is not activated.
		if ( ! in_array( 'woocommerce/woocommerce.php', apply_filters( 'active_plugins', get_option( 'active_plugins' ) ), true ) ) {
			return;
		}

		$this->init_backend();

		require_once LIBRARY_DIR . '/support/woocommerce/class-woo-columns.php';
		add_filter( 'woocommerce_template_loader_files', array( $this, 'template_loader_files' ), 10, 2 );
		add_action( 'template_redirect', array( $this, 'adjust_woocommerce_actions' ) );
	}

	/**
	 * Initialize WooCommerce Backend Setup.
	 *
	 * @since  1.1.0
	 */
	public function init_backend() {
		global $wp_customize;
		if ( is_admin() || isset( $wp_customize ) ) {
			require_once LIBRARY_DIR . '/support/woocommerce/backend/options.php';
		}
	}

	/**
	 * Get theme specific WooCommerce template files.
	 *
	 * @since  1.1.0
	 *
	 * @param array  $templates    Input files array.
	 * @param string $default_file Default template file.
	 * @return array               Theme specific template file.
	 */
	public function template_loader_files( $templates, $default_file ) {
		if ( is_woocommerce() ) {
			$templates = 'templates/woocommerce.php';
		}

		if ( empty( $templates ) ) {
			return array( $default_file );
		}

		return array( $templates );
	}

	/**
	 * Adjust actions for WooCommerce.
	 *
	 * @since  1.1.0
	 */
	public function adjust_woocommerce_actions() {
		if ( ! is_woocommerce() ) {
			return;
		}

		remove_action( 'greenlet_main_container', 'greenlet_do_main_container' );
		add_action( 'greenlet_main_container', array( $this, 'greenlet_woocommerce_main_container' ) );
	}

	/**
	 * Render Woocommerce main container.
	 *
	 * @since  1.1.0
	 */
	public function greenlet_woocommerce_main_container() {
		$cobj = new Woo_Columns();

		if ( $cobj->sequence ) {
			foreach ( $cobj->sequence as $pos => $column ) {
				$width = $cobj->cols_array()[ $pos ];
				if ( 'main' === $column ) {
					do_action( 'greenlet_after_left_sidebar' );

					// Attribute arguments for main content.
					$args = array(
						'primary' => 'main',
						'width'   => $width,
					);

					greenlet_markup( 'main', greenlet_attr( $args ) );
					greenlet_markup( 'main-wrap', greenlet_attr( 'wrap' ) );

					do_action( 'woocommerce_before_main_content' );
					woocommerce_content();
					do_action( 'woocommerce_after_main_content' );

					greenlet_markup_close( 2 );

					do_action( 'greenlet_before_right_sidebar' );
				} else {
					// If sidebar is active, Display it.
					if ( is_active_sidebar( $column ) ) {

						// Attribute arguments for sidebar.
						$args = array(
							'primary' => 'sidebar',
							'width'   => $width,
						);

						greenlet_markup( 'sidebar', greenlet_attr( $args ) );
						greenlet_markup( 'side-wrap', greenlet_attr( 'wrap' ) );
						dynamic_sidebar( $column );
						greenlet_markup_close( 2 );
					}
				}
			}
		}
	}

	/**
	 * Returns the instance.
	 *
	 * @since  1.1.0
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

WooCommerce::get_instance();
