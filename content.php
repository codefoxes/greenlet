<?php
/**
 * Content Template.
 *
 * The template for displaying post content.
 *
 * @package greenlet
 */

do_action( 'greenlet_before_entry' );

greenlet_markup( 'entry', greenlet_attr( 'entry ' . implode( ' ', get_post_class() ) ) );

	do_action( 'greenlet_entry_header' );

	do_action( 'greenlet_before_entry_content' );

	do_action( 'greenlet_entry_content' );

	do_action( 'greenlet_after_entry_content' );

	do_action( 'greenlet_entry_footer' );

greenlet_markup_close();

do_action( 'greenlet_after_entry' );
