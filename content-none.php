<?php
/**
 * content-none.php
 *
 * The template for displaying 'No post found'.
 */


printf( '<div %s><h2>', greenlet_attr( 'not-found' ) );

//No post text can be changed by 'greenlet_nopost_text' filter hook.
apply_filters( 'greenlet_nopost_text', _e( 'Nothing found!', 'greenlet' ) );

echo '</h2></div>';
