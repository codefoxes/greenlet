<?php
/**
 * Logo Template.
 *
 * @package greenlet\templates
 */

$logo_id  = get_theme_mod( 'custom_logo' );
$logo_url = false;

if ( false !== $logo_id ) {
	$logo_url = wp_get_attachment_image_url( $logo_id, 'full' );
}

$logo_url = apply_filters( 'greenlet_logo', $logo_url );

printf( '<div %s role="banner">', wp_kses( greenlet_attr( 'site-logo' ), null ) );

if ( false !== $logo_url ) {
	printf( '<a %s href=', wp_kses( greenlet_attr( 'site-url' ), null ) );
	echo esc_url( home_url( '/' ) ) . ' title="Home Page">';
	echo '<img src="' . esc_url( $logo_url ) . '" alt="">';
	echo '</a>';
} else {
	printf( '<h1 %s><a %s href=', wp_kses( greenlet_attr( 'site-name' ), null ), wp_kses( greenlet_attr( 'site-url' ), null ) );
	echo esc_url( home_url( '/' ) ) . '>';
	bloginfo( 'name' );
	echo '</a></h1>';
}

echo '<small class="site-tagline">';
bloginfo( 'description' );
echo '</small></div>';
