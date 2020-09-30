<?php
/**
 * Main menu Template.
 *
 * @package greenlet\templates\menu
 */

greenlet_markup( 'site-navigation', greenlet_attr( 'main-menu nav-menu' ) );
?>
	<input id="menu-toggle" class="menu-toggle" type="checkbox" />
	<label class="menu-toggle-button" for="menu-toggle" aria-label="<?php esc_attr_e( 'Toggle Menu', 'greenlet' ); ?>">
		<span class="hamburger hamburger-1"></span>
		<span class="hamburger hamburger-2"></span>
		<span class="hamburger hamburger-3"></span>
	</label>
<?php

wp_nav_menu(
	array(
		'theme_location' => 'main-menu',
		'menu_class'     => 'site-menu list-inline inline-list',
		'container'      => false,
	)
);

greenlet_markup_close();
