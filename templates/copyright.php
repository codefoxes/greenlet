<?php
/**
 * Copyright Template.
 *
 * @package greenlet\templates
 */

$text  = sprintf( '<div %s><p>', greenlet_attr( 'copyright' ) );
$text .= sprintf(
	'&copy; %1$s &middot; <a href="%2$s">%3$s</a> &middot; %4$s <a href="https://greenletwp.com/" target="_blank" rel="nofollow noopener">%5$s</a></p></div>',
	date_i18n( __( 'Y', 'greenlet' ) ),
	esc_url( get_home_url() ),
	get_bloginfo( 'name' ),
	__( 'Powered By', 'greenlet' ),
	__( 'Greenlet', 'greenlet' )
);
echo wp_kses_post( apply_filters( 'greenlet_copyright', $text ) );
