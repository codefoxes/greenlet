<?php
/**
 * Frontend Main functions.
 *
 * @package greenlet\library\frontend
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_action( 'wp_ajax_greenlet_get_paginated', 'greenlet_get_paginated' );
add_action( 'wp_ajax_nopriv_greenlet_get_paginated', 'greenlet_get_paginated' );


if ( ! function_exists( 'greenlet' ) ) {
	/**
	 * Greenlet function.
	 *
	 * Gets header and footer.
	 * Creates main action hooks.
	 *
	 * @since 1.0.0
	 *
	 * @see wp-includes/general-template.php.
	 * @see wp-includes/plugin.php.
	 */
	function greenlet() {

		get_header();

		do_action( 'greenlet_before_main_container' );

		// see library/main-structure.php for default actions for this hook.
		do_action( 'greenlet_main_container' );

		do_action( 'greenlet_after_main_container' );

		get_footer();
	}
}


if ( ! function_exists( 'greenlet_cover' ) ) {
	/**
	 * Greenlet Cover function.
	 *
	 * Get templates for Topbar, Header, Semifooter, Footer.
	 * Get templates for logo and registered menus.
	 *
	 * @since 1.0.0
	 * @see wp-includes/general-template.php.
	 *
	 * @param string $pos column position.
	 */
	function greenlet_cover( $pos = 'header' ) {
		$items = greenlet_cover_layout_items( $pos );

		$cover_rows = gl_get_option( $pos . '_layout', greenlet_cover_layout_defaults( $pos ) );

		$k = 1;
		foreach ( $cover_rows as $row ) {
			$markup_context = ( 'header' === $pos ) ? 'sub-header' : 'sub-footer';
			$class_name     = ( 'header' === $pos ) ? 'header-section ' : 'footer-section ';

			if ( isset( $row['primary'] ) && $row['primary'] ) {
				$markup_context = ( 'header' === $pos ) ? 'site-header' : 'site-footer';
				$class_name    .= ( 'header' === $pos ) ? 'site-header ' : 'site-footer ';
			}

			if ( isset( $row['sticky'] ) && $row['sticky'] ) {
				$class_name .= 'sticky ';
			}

			if ( isset( $row['vertical'] ) && ( 'no' !== $row['vertical'] ) ) {
				$class_name .= 'vertical ' . $row['vertical'] . ' ';
			}

			greenlet_markup( $markup_context, greenlet_attr( $class_name . $pos . '-' . $k ) );
			printf( '<div %s>', wp_kses( greenlet_attr( 'container ' . $pos . '-contents' ), null ) );
			printf( '<div %s>', wp_kses( greenlet_attr( 'row' ), null ) );

			do_action( "greenlet_before_{$pos}_{$k}_columns" );

			$col_array = explode( '-', $row['columns'] );

			// For each columns in the array.
			$i = 1;
			foreach ( $col_array as $col ) {

				$args = array(
					'primary'  => "{$pos}-column {$pos}-column-{$i}",
					'width'    => $col,
					'data-loc' => "{$k}-{$i}",
				);

				printf( '<div %s>', wp_kses( greenlet_attr( $args ), null ) );

				do_action( "greenlet_before_{$pos}_{$i}_content" );

				if ( isset( $row['items'] ) && isset( $row['items'][ $i ] ) ) {
					foreach ( $row['items'][ $i ] as $item ) {
						$meta = isset( $item['meta'] ) ? $item['meta'] : array();
						$id   = isset( $item['id'] ) ? $item['id'] : $item;

						$item_obj = isset( $items[ $id ] ) ? $items[ $id ] : null;
						if ( isset( $item_obj['template'] ) ) {
							get_template_part( $item_obj['template'], null, $meta );
						}

						if ( isset( $item_obj['type'] ) ) {
							if ( 'widgets' === $item_obj['type'] ) {
								dynamic_sidebar( "{$pos}-sidebar-{$k}-{$i}" );
							}

							if ( ( 'php' === $item_obj['type'] ) && isset( $meta['template'] ) ) {
								get_template_part( $meta['template'] );
							}
						}

						if ( isset( $item_obj['function'] ) && function_exists( $item_obj['function'] ) ) {
							call_user_func( $item_obj['function'] );
						}
					}
				}

				do_action( "greenlet_after_{$pos}_{$i}_content" );

				echo '</div>';
				$i++;
			}

			do_action( "greenlet_after_{$pos}_{$k}_columns" );

			echo '</div></div>';
			greenlet_markup_close();
			$k++;
		}
	}
}
