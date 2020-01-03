<?php
/**
 * header.php
 *
 * The header for the theme.
 */

do_action( 'greenlet_head' );

wp_head(); ?>
</head>
<?php

printf( '<body %s>', greenlet_attr( 'body ' . implode( ' ', get_body_class() ) ) );

do_action( 'greenlet_before_topbar' );
do_action( 'greenlet_topbar' );
do_action( 'greenlet_after_topbar' );

do_action( 'greenlet_before_header' );
do_action( 'greenlet_header' );
do_action( 'greenlet_after_header' );

greenlet_markup( 'site-content',	greenlet_attr( 'site-content container' ) );
echo '<div class="row">';
