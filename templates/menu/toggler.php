<?php
/**
 * Menu Toggler Template.
 *
 * @package greenlet\templates\menu
 */

?>
	<div class="menu-toggler" aria-label="<?php esc_attr_e( 'Toggle Menu', 'greenlet' ); ?>" tabindex="0"
		<?php
		// Todo: $args checking only Needed for WP < 5.5.
		$args = isset( $args ) ? $args : array();
		foreach ( $args as $key => $val ) {
			echo esc_html( ' data-' . $key . '=' );
			echo esc_attr( $val );
		}
		?>
	>
		<span class="hamburger hamburger-1"></span>
		<span class="hamburger hamburger-2"></span>
		<span class="hamburger hamburger-3"></span>
	</div>
<?php
