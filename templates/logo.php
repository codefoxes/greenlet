<?php
/**
 * Logo Template.
 *
 * @package greenlet\templates
 */

$logo_url  = greenlet_get_logo();
$blog_name = get_bloginfo( 'name' );

printf( '<div %s role="banner">', wp_kses( greenlet_attr( 'site-logo' ), null ) );

if ( false !== $logo_url ) {
	printf( '<a %s href=', wp_kses( greenlet_attr( 'site-url' ), null ) );
	echo esc_url( home_url( '/' ) ) . ' title="Home Page">';
	echo '<img src="' . esc_url( $logo_url ) . '" alt="' . esc_html( $blog_name ) . '">';
	echo '</a>';
} else {
	printf( '<h1 %s><a %s href=', wp_kses( greenlet_attr( 'site-name' ), null ), wp_kses( greenlet_attr( 'site-url' ), null ) );
	echo esc_url( home_url( '/' ) ) . '>';
	echo esc_html( $blog_name );
	echo '</a></h1>';
}

echo '<small class="site-tagline">';
bloginfo( 'description' );
echo '</small></div>';
