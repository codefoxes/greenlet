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
		$this->init_frontend();
	}

	/**
	 * Initialize WooCommerce Backend Setup.
	 *
	 * @since  1.1.0
	 */
	public function init_backend() {
		global $wp_customize;
		if ( is_admin() || isset( $wp_customize ) ) {
			require_once GREENLET_LIBRARY_DIR . '/support/woocommerce/backend/options.php';
		}
	}

	/**
	 * Initialize WooCommerce Frontend Setup.
	 *
	 * @since  1.1.0
	 */
	public function init_frontend() {
		require_once GREENLET_LIBRARY_DIR . '/support/woocommerce/frontend/helpers.php';
		require_once GREENLET_LIBRARY_DIR . '/support/woocommerce/frontend/class-woo-columns.php';
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_scripts' ) );
		add_filter( 'woocommerce_template_loader_files', array( $this, 'template_loader_files' ), 10, 2 );
		add_action( 'template_redirect', array( $this, 'adjust_woocommerce_actions' ) );
		add_filter( 'loop_shop_per_page', array( $this, 'get_archive_products_count' ), 20 );
		add_filter( 'loop_shop_columns', array( $this, 'get_archive_columns' ) );
		add_filter( 'woocommerce_add_to_cart_fragments', array( $this, 'add_to_cart_fragment' ) );
		add_filter( 'greenlet_cover_layout_items', array( $this, 'cart_layout_item' ) );
	}

	/**
	 * Enqueue Woocommerce support scripts.
	 */
	public function enqueue_scripts() {
		$min = ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ) ? '' : '.min';
		greenlet_enqueue_style( 'greenlet-shop', GREENLET_STYLE_URL . '/shop' . $min . '.css' );
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
				$cols_array = $cobj->cols_array();
				$width      = isset( $cols_array[ $pos ] ) ? $cols_array[ $pos ] : null;
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
	 * Get Archive Page Products Count.
	 *
	 * @since  1.1.0
	 */
	public function get_archive_products_count() {
		$number = (int) gl_get_option( 'archive_products_count' ) ? (int) gl_get_option( 'archive_products_count' ) : 8;

		if ( 'unlimited' === $number ) {
			$number = 999;
		}

		return $number;
	}

	/**
	 * Get Archive Page Products Columns.
	 *
	 * @since  1.1.0
	 */
	public function get_archive_columns() {
		$number = (int) gl_get_option( 'archive_products_columns' ) ? (int) gl_get_option( 'archive_products_columns' ) : 4;
		return $number;
	}

	/**
	 * Get changed cart contents.
	 *
	 * @param array $fragments Cart contents.
	 * @return array           Updated contents
	 */
	public function add_to_cart_fragment( $fragments ) {
		$cart = greenlet_cart_button( false );

		$fragments[ $cart[1] ] = $cart[0];
		return $fragments;
	}

	/**
	 * Add cart option to layout items.
	 *
	 * @since  2.0.0
	 * @param  array $items Layout items.
	 * @return array        Added items.
	 */
	public function cart_layout_item( $items ) {
		$items[] = array(
			'id'        => 'cart',
			'name'      => __( 'Shopping Cart', 'greenlet' ),
			'function'  => 'greenlet_cart_button',
			'positions' => array( 'header', 'footer' ),
		);

		return $items;
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
