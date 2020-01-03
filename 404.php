<?php
/**
 * 404.php
 *
 * Template for displaying 404 Not Found page.
 */
?>

<?php get_header(); ?>

	<div class="container-404">
		<h1><?php _e( 'Error 404 - Nothing Found', 'greenlet' ); ?></h1>

		<p><?php _e( 'It looks like nothing was found here. Maybe try a search?', 'greenlet' ); ?></p>

		<?php get_search_form(); ?>
	</div>

<?php get_footer(); ?>
