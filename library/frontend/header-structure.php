<?php
/**
 * Header structure.
 *
 * @package greenlet\library\frontend
 */

add_action( 'greenlet_head', 'greenlet_do_head' );
add_action( 'greenlet_topbar', 'greenlet_do_topbar' );
add_action( 'greenlet_header', 'greenlet_do_header' );

/**
 * Print the head.
 */
function greenlet_do_head() {
	$favicon    = apply_filters( 'greenlet_favicon', IMAGES_URL . '/icons/favicon.png' );
	$touch_icon = apply_filters( 'greenlet_touch_icon', IMAGES_URL . '/icons/apple-touch-icon-152x152-precomposed.png' );
	?>
<!DOCTYPE html>
<html <?php language_attributes( 'html' ); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>" />
	<?php
	$show_meta = apply_filters( 'greenlet_add_meta_description', true );
	if ( $show_meta ) {
		echo '<meta name="description" content="' . esc_html( greenlet_meta_description() ) . '" />';
	}
	echo '<meta name="viewport" content="width=device-width, initial-scale=1">';
}

/**
 * Display the topbar.
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
 */
function greenlet_do_header() {
	greenlet_markup( 'site-header', greenlet_attr( 'site-header' ) );
	printf( '<div %s>', wp_kses( greenlet_attr( 'container header-contents' ), null ) );
	printf( '<div %s>', wp_kses( greenlet_attr( 'row' ), null ) );
	greenlet_cover( 'header' );
	echo '</div></div>';
	greenlet_markup_close();
}
