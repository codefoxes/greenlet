<?php
/**
 * Secondary menu Template.
 *
 * @package greenlet\templates\menu
 */

greenlet_markup( 'secondary-navigation', greenlet_attr( 'secondary-menu nav-menu' ) );

wp_nav_menu(
	array(
		'theme_location' => 'secondary-menu',
		'menu_class'     => 'site-menu list-inline inline-list',
		'container'      => false,
	)
);

greenlet_markup_close();
