<?php
/**
 * No Content Template.
 *
 * The template for displaying 'No post found'.
 *
 * @package greenlet
 */

printf( '<div %s><h2>', wp_kses( greenlet_attr( 'not-found' ), null ) );

// No post text can be changed by 'greenlet_nopost_text' filter hook.
$no_post_text = apply_filters( 'greenlet_nopost_text', esc_html__( 'Nothing found!', 'greenlet' ) );

echo esc_html( $no_post_text );

echo '</h2></div>';
