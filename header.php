<?php
/**
 * Header Template.
 *
 * The header for the theme.
 *
 * @package greenlet
 */

do_action( 'greenlet_head' );

wp_head(); ?>
</head>
<?php

$body_attribute = greenlet_attr( 'body ' . implode( ' ', get_body_class() ) );
printf( '<body %s>', wp_kses( $body_attribute, null ) );
wp_body_open();

do_action( 'greenlet_before_header' );
do_action( 'greenlet_header' );
do_action( 'greenlet_after_header' );

greenlet_markup( 'site-content', greenlet_attr( 'site-content' ) );
greenlet_markup( 'div', greenlet_attr( 'container' ) );
greenlet_markup( 'div', greenlet_attr( 'row' ) );
