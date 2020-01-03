<?php
/**
 * footer.php
 *
 * The template for displaying the footer.
 *
 * @package Greenlet
 */

echo '</div>';
greenlet_markup_close();

do_action( 'greenlet_before_semifooter' );
do_action( 'greenlet_semifooter' );
do_action( 'greenlet_after_semifooter' );

do_action( 'greenlet_before_footer' );
do_action( 'greenlet_footer' );
do_action( 'greenlet_after_footer' );

do_action( 'greenlet_after' );

wp_footer(); ?>

</body>
</html>
