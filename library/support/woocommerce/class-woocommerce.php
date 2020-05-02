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
			require_once GL_LIBRARY_DIR . '/support/woocommerce/backend/options.php';
		}
	}

	/**
	 * Initialize WooCommerce Frontend Setup.
	 *
	 * @since  1.1.0
	 */
	public function init_frontend() {
		require_once GL_LIBRARY_DIR . '/support/woocommerce/frontend/class-woo-columns.php';
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_scripts' ) );
		add_filter( 'woocommerce_template_loader_files', array( $this, 'template_loader_files' ), 10, 2 );
		add_action( 'template_redirect', array( $this, 'adjust_woocommerce_actions' ) );
		add_filter( 'loop_shop_per_page', array( $this, 'get_archive_products_count' ), 20 );
		add_filter( 'loop_shop_columns', array( $this, 'get_archive_columns' ) );
		add_filter( 'woocommerce_add_to_cart_fragments', array( $this, 'add_to_cart_fragment' ) );

		$this->hook_cart_button();
	}

	/**
	 * Enqueue Woocommerce support scripts.
	 */
	public function enqueue_scripts() {
		$min = ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ) ? '' : '.min';
		greenlet_enqueue_style( 'greenlet-shop', GL_STYLES_URL . '/shop' . $min . '.css' );
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
	 * Hook Shopping cart button.
	 *
	 * @since  1.1.0
	 */
	public function hook_cart_button() {
		// If cart position is set, hook dynamic action to that position.
		$cart_pos = gl_get_option( 'cart_position' ) ? gl_get_option( 'cart_position' ) : 'dont-show';
		if ( 'dont-show' !== $cart_pos ) {
			$cart_pos = str_replace( '-', '_', $cart_pos );
			add_action( "greenlet_after_{$cart_pos}_content", array( $this, 'get_cart_button' ), 20, 0 );
		}
	}

	/**
	 * Retrieve or print cart button.
	 *
	 * @param bool $echo Whether to print.
	 * @return array|mixed|string|void
	 */
	public function get_cart_button( $echo = true ) {
		global $woocommerce;
		$ajax_class = 'a.cart-button';

		$cart  = '<a class="cart-button" href="';
		$cart .= wc_get_cart_url() . '" title="';
		$cart .= esc_attr__( 'View shopping cart', 'greenlet' ) . '"><div class="cart-icon">';
		$cart .= greenlet_get_file_contents( GL_LIBRARY_DIR . '/support/woocommerce/frontend/cart.svg' );
		$cart .= '</div><div class="cart-contents">';
		// translators: %d: Cart contents count.
		$cart .= sprintf( _n( '%d Item', '%d Items', $woocommerce->cart->cart_contents_count, 'greenlet' ), $woocommerce->cart->cart_contents_count ) . ' - ';
		$cart .= $woocommerce->cart->get_cart_total() . '</div></a>';
		$cart  = array( $cart, $ajax_class );

		/**
		 * Filter to change Cart Button Content.
		 * Hook a function to this filter and return an array of
		 * cart content and ajax class as strings (see format above)
		 * to change cart button content.
		 */
		$cart = apply_filters( 'greenlet_cart_button_contents', $cart );
		if ( true !== $echo ) {
			return $cart;
		}

		echo $cart[0]; // phpcs:ignore
	}

	/**
	 * Get changed cart contents.
	 *
	 * @param array $fragments Cart contents.
	 * @return array           Updated contents
	 */
	public function add_to_cart_fragment( $fragments ) {
		$cart = $this->get_cart_button( false );

		$fragments[ $cart[1] ] = $cart[0];
		return $fragments;
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
