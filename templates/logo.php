<?php
/**
 * logo.php
 */

$logo = apply_filters( 'greenlet_logo', false );

printf( '<div %s role="banner">', greenlet_attr( 'site-logo' ) );

if ( $logo ) {
	printf( '<a %s href=', greenlet_attr( 'site-url' ) );
	echo esc_url( home_url( '/' ) ) . ' title="Home Page">';
	echo $logo;
	echo '</a><small>';
} else {
	printf( '<h1 %s><a %s href=', greenlet_attr( 'site-name' ), greenlet_attr( 'site-url' ) );
	echo esc_url( home_url( '/' ) ) . '>';
	bloginfo('name');
	echo '</a></h1><small>';
}

bloginfo('description');
echo '</small></div>';
