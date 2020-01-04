<?php
/**
 * Main menu Template.
 *
 * @package greenlet\templates\menu
 */

greenlet_markup( 'site-navigation', greenlet_attr( 'site-navigation' ) );

wp_nav_menu(
	array(
		'theme_location' => 'main-menu',
		'menu_class'     => 'site-menu list-inline inline-list',
	)
);

greenlet_markup_close();
