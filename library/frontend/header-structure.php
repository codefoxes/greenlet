<?php
/**
 * Header structure.
 *
 * @package greenlet\library\frontend
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_filter( 'body_class', 'greenlet_body_class' );
add_action( 'greenlet_head', 'greenlet_do_head' );
add_action( 'greenlet_before_header', 'greenlet_skip_link' );
add_action( 'greenlet_header', 'greenlet_do_header' );

/**
 * Add body classes.
 *
 * @param  array $classes Body classes.
 * @return array          Body classes.
 */
function greenlet_body_class( $classes ) {
	if ( is_singular() ) {
		$classes[] = 'is-singular';
	} else {
		$classes[] = 'is-posts-list';
	}
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
 * Display the header.
 *
 * @since 1.0.0
 */
function greenlet_do_header() {
	greenlet_cover( 'header' );
}
