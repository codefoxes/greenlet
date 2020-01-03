<?php
/**
 * Secondary menu
 */

greenlet_markup( 'secondary-navigation',	greenlet_attr( 'secondary-navigation' ) );
	wp_nav_menu(
		array(
			'theme_location' => 'secondary-menu',
			'menu_class' => 'site-menu'
		)
	);
greenlet_markup_close();
