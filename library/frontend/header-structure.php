<?php
/**
 * Header structure.
 *
 * @package greenlet\library\frontend
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_action( 'greenlet_before_topbar', 'greenlet_skip_link' );
add_action( 'greenlet_head', 'greenlet_do_head' );
// add_action( 'greenlet_topbar', 'greenlet_do_topbar' );
add_action( 'greenlet_header', 'greenlet_do_header' );

/**
 * Add body classes.
 *
 * @since 1.2.5
 * @param array $classes Classes Array.
 * @return array         Classes Array with added class.
 */
function greenlet_add_body_classes( $classes ) {
	$classes[] = 'fixed-topbar';
	return $classes;
}

/**
 * Print the head.
 *
 * @since 1.0.0
 */
function greenlet_do_head() {
	?>
<!DOCTYPE html>
<html <?php language_attributes( 'html' ); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>" />
	<?php
	echo '<meta name="viewport" content="width=device-width, initial-scale=1">';

	$fixed_topbar = gl_get_option( 'fixed_topbar', false );
	if ( false !== $fixed_topbar ) {
		add_filter( 'body_class', 'greenlet_add_body_classes' );
	}
}

/**
 * Display Skip Link
 *
 * @since 1.0.0
 */
function greenlet_skip_link() {
	?>
	<a class="skip-link screen-reader-text" href="#content">
		<?php esc_html_e( 'Skip to content', 'greenlet' ); ?>
	</a>
	<?php
}

/**
 * Display the topbar.
 *
 * @since 1.0.0
 */
function greenlet_do_topbar() {

	$topshow = gl_get_option( 'show_topbar', false );

	if ( false !== $topshow ) {
		greenlet_markup( 'topbar', greenlet_attr( 'topbar' ) );
		printf( '<div %s>', wp_kses( greenlet_attr( 'container' ), null ) );
		printf( '<div %s>', wp_kses( greenlet_attr( 'row' ), null ) );
		greenlet_cover( 'topbar' );
		echo '</div></div>';
		greenlet_markup_close();
	}
}

/**
 * Display the header.
 *
 * @since 1.0.0
 */
function greenlet_do_header() {
	greenlet_cover( 'header' );
}
