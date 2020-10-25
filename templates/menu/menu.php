<?php
/**
 * Main menu Template.
 *
 * @package greenlet\templates\menu
 */

greenlet_markup( 'site-navigation', greenlet_attr( 'main-menu nav-menu' ) );

$slug = ( isset( $args ) && isset( $args['slug'] ) ) ? $args['slug'] : false;

$menu_args = array(
	'menu'       => $slug,
	'menu_class' => 'site-menu menu-list list-inline inline-list',
	'container'  => false,
);

if ( false !== $slug ) {
	if ( isset( $args['toggler'] ) && ( 'enable' === $args['toggler'] ) ) {
		?>
		<input id="<?php echo esc_attr( $slug ); ?>-toggle" class="menu-toggle" type="checkbox" />
		<label class="menu-toggle-button" for="<?php echo esc_attr( $slug ); ?>-toggle" aria-label="<?php esc_attr_e( 'Toggle Menu', 'greenlet' ); ?>">
			<span class="hamburger hamburger-1"></span>
			<span class="hamburger hamburger-2"></span>
			<span class="hamburger hamburger-3"></span>
		</label>
		<?php
	}

	wp_nav_menu( $menu_args );
}

greenlet_markup_close();
