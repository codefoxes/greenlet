<?php
/**
 * Logo Template.
 *
 * @package greenlet\templates
 */

$logo = apply_filters( 'greenlet_logo', false );

printf( '<div %s role="banner">', wp_kses( greenlet_attr( 'site-logo' ), null ) );

if ( $logo ) {
	printf( '<a %s href=', wp_kses( greenlet_attr( 'site-url' ), null ) );
	echo esc_url( home_url( '/' ) ) . ' title="Home Page">';
	echo esc_html( $logo );
	echo '</a><small>';
} else {
	printf( '<h1 %s><a %s href=', wp_kses( greenlet_attr( 'site-name' ), null ), wp_kses( greenlet_attr( 'site-url' ), null ) );
	echo esc_url( home_url( '/' ) ) . '>';
	bloginfo( 'name' );
	echo '</a></h1><small>';
}

bloginfo( 'description' );
echo '</small></div>';
