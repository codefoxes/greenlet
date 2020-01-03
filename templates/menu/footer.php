<?php
/**
 * Footer menu
 */

greenlet_markup( 'footer-navigation',	greenlet_attr( 'footer-navigation' ) );
	wp_nav_menu(
		array(
			'theme_location' => 'footer-menu',
			'menu_class' => 'site-menu'
		)
	);
greenlet_markup_close();
