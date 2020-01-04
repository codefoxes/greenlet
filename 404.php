<?php
/**
 * 404 Template.
 *
 * Template for displaying 404 Not Found page.
 *
 * @package greenlet
 */

?>

<?php get_header(); ?>

	<div class="container-404">
		<h1><?php esc_html_e( 'Error 404 - Nothing Found', 'greenlet' ); ?></h1>

		<p><?php esc_html_e( 'It looks like nothing was found here. Maybe try a search?', 'greenlet' ); ?></p>

		<?php get_search_form(); ?>
	</div>

<?php get_footer(); ?>
