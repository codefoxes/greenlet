<?php
/**
 * Footer menu Template.
 *
 * @package greenlet\templates\menu
 */

greenlet_markup( 'footer-navigation', greenlet_attr( 'footer-menu' ) );

wp_nav_menu(
	array(
		'theme_location' => 'footer-menu',
		'menu_class'     => 'site-menu',
	)
);

greenlet_markup_close();
