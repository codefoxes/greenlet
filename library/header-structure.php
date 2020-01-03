<?php
/**
 * header-structure.php
 *
 * Header structure functions.
 */


add_action( 'greenlet_head', 'greenlet_do_head' );
add_action( 'greenlet_topbar', 'greenlet_do_topbar' );
add_action( 'greenlet_header', 'greenlet_do_header' );

function greenlet_do_head() {

	global $is_html5;
	$favicon	= apply_filters( 'greenlet_favicon', IMAGES_URL . '/icons/favicon.png' );
	$touch_icon	= apply_filters( 'greenlet_touch_icon', IMAGES_URL . '/icons/apple-touch-icon-152x152-precomposed.png' );

	if( $is_html5 ) :
?>
<!DOCTYPE html>
<html <?php language_attributes( 'html' ); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>" />
<?php
		$meta_description = get_bloginfo('name') . ' - ' . get_bloginfo('description');
		$meta_tag = '<meta name="description" content="' . $meta_description . '" />';
		$show_meta = apply_filters( 'greenlet_add_meta_description', true );
		if ( $show_meta ) {
			echo $meta_tag;
		} ?>
<?php
	else :
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" <?php language_attributes( 'xhtml' ); ?>>
<head profile="http://gmpg.org/xfn/11">
<meta http-equiv="Content-Type" content="<?php bloginfo( 'html_type' ); ?>; charset=<?php bloginfo( 'charset' ); ?>" />
<?php
	endif;
	echo '<meta name="viewport" content="width=device-width, initial-scale=1">';
}

function greenlet_do_topbar() {

	$topshow = of_get_option( 'show_topbar' ) ? of_get_option( 'show_topbar' ) : 0;

	if ( $topshow == 1 ) {
		greenlet_markup( 'topbar',	greenlet_attr( 'topbar' ) );
		printf( '<div %s>', greenlet_attr( 'container' ) );
		printf( '<div %s>', greenlet_attr( 'row' ) );
		greenlet_cover( 'topbar' );
		echo '</div></div>';
		greenlet_markup_close();
	}
}

function greenlet_do_header() {

	greenlet_markup( 'site-header',	greenlet_attr( 'site-header' ) );
	printf( '<div %s>', greenlet_attr( 'container header-contents' ) );
	printf( '<div %s>', greenlet_attr( 'row' ) );
	greenlet_cover( 'header' );
	echo '</div></div>';
	greenlet_markup_close();
}
