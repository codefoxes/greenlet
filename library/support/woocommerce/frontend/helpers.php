<?php
/**
 * Woocommerce Frontend Helper functions.
 *
 * @package greenlet\library\support\woocommerce
 */

/**
 * Retrieve or print cart button.
 *
 * @param  bool $echo Whether to print.
 * @return array|mixed|string|void
 */
function greenlet_cart_button( $echo = true ) {
	global $woocommerce;
	$ajax_class = 'a.cart-button';

	$cart  = '<a class="cart-button" href="';
	$cart .= wc_get_cart_url() . '" title="';
	$cart .= esc_attr__( 'View shopping cart', 'greenlet' ) . '"><div class="cart-icon">';
	$cart .= greenlet_get_file_contents( GREENLET_LIBRARY_DIR . '/support/woocommerce/frontend/cart.svg' );
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
