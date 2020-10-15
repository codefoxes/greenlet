<?php
/**
 * Logo Template.
 *
 * @package greenlet\templates
 */

$logo_url  = greenlet_get_logo();
$blog_name = get_bloginfo( 'name' );

printf( '<div %s role="banner">', wp_kses( greenlet_attr( 'site-logo' ), null ) );

printf( '<a %s href=', wp_kses( greenlet_attr( 'site-url' ), null ) );
echo esc_url( home_url( '/' ) ) . ' title="' . esc_attr__( 'Home Page', 'greenlet' ) . '">';
if ( false !== $logo_url ) {
	echo '<img src="' . esc_url( $logo_url ) . '" alt="' . esc_attr( $blog_name ) . '">';
}
printf( '<h1 %s>', wp_kses( greenlet_attr( 'site-name' ), null ) );
echo esc_html( $blog_name );
echo '</h1>';
echo '</a>';

echo '<small class="site-tagline">';
bloginfo( 'description' );
echo '</small></div>';
