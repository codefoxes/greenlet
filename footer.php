<?php
/**
 * Footer Template.
 *
 * The template for displaying the footer.
 *
 * @package greenlet
 */

greenlet_markup_close( 3 );

do_action( 'greenlet_before_footer' );
do_action( 'greenlet_footer' );
do_action( 'greenlet_after_footer' );

wp_footer();

do_action( 'greenlet_after' ); ?>

</body>
</html>
