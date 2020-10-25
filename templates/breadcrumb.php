<?php
/**
 * Breadcrumb Template.
 *
 * @package greenlet\library\frontend
 */

global $post;
$separator = gl_get_option( 'breadcrumb_sep', '&raquo;' );

printf( '<div %s>', wp_kses( greenlet_attr( 'breadcrumb' ), null ) );
printf( '<div %s>', wp_kses( greenlet_attr( 'breadcrumb-item' ), null ) );
echo '<a href="' . esc_url( home_url() ) . '" itemprop="item"><span itemprop="name">' . esc_html__( 'Home', 'greenlet' ) . '</span></a><meta itemprop="position" content="1" /></div>' . esc_html( $separator );
printf( '<div %s>', wp_kses( greenlet_attr( 'breadcrumb-item' ), null ) );

if ( is_single() ) {
	$category = get_the_category();
	if ( $category ) {
		echo '<a href="' . esc_url( get_category_link( $category[0]->term_id ) );
		echo '" itemprop="item"><span itemprop="name">' . esc_html( $category[0]->cat_name ) . '</span></a><meta itemprop="position" content="2" /></div>' . esc_html( $separator );
		printf( '<div %s>', wp_kses( greenlet_attr( 'breadcrumb-item' ), null ) );
	}

	$post_title = wp_strip_all_tags( get_the_title() );
	printf( '<span itemprop="name">%s</span>', esc_html( $post_title ) );
	echo '<meta itemprop="position" content="' . ( $category ? '3' : '2' ) . '" /></div>';

} elseif ( is_page() && $post->post_parent ) {
	$home            = get_post( get_option( 'page_on_front' ) );
	$ancestors_count = count( $post->ancestors );
	for ( $i = $ancestors_count - 1; $i >= 0; $i-- ) {
		if ( ( $home->ID ) !== ( $post->ancestors[ $i ] ) ) {
			echo '<a href="';
			echo esc_url( get_permalink( $post->ancestors[ $i ] ) );
			echo '" itemprop="item"><span itemprop="name">';
			echo esc_html( get_the_title( $post->ancestors[ $i ] ) );
			echo '</span></a>';
			printf( '<meta itemprop="position" content="%s" /></div>', esc_attr( ( $i * -1 ) + $ancestors_count + 1 ) );
			echo esc_html( $separator );
			printf( '<div %s>', wp_kses( greenlet_attr( 'breadcrumb-item' ), null ) );
		}
	}

	printf( '<span itemprop="name">%s</span>', esc_html( get_the_title() ) );
	printf( '<meta itemprop="position" content="%s" /></div>', esc_attr( $ancestors_count + 2 ) );

} elseif ( is_category() || is_tag() ) {
	printf( '<span itemprop="name">%s</span>', single_cat_title( '', false ) );
	echo '<meta itemprop="position" content="2" /></div>';

} elseif ( is_page() ) {
	printf( '<span itemprop="name">%s</span>', esc_html( get_the_title() ) );
	echo '<meta itemprop="position" content="2" /></div>';

} elseif ( is_author() ) {
	printf( '<span itemprop="name">%s</span>', get_the_author() );
	echo '<meta itemprop="position" content="2" /></div>';

} elseif ( is_day() ) {
	printf( '<span itemprop="name">%s</span>', get_the_date() );
	echo '<meta itemprop="position" content="2" /></div>';

} elseif ( is_month() ) {
	printf( '<span itemprop="name">%s</span>', get_the_date( _x( 'F Y', 'Monthly archives date format', 'greenlet' ) ) );
	echo '<meta itemprop="position" content="2" /></div>';

} elseif ( is_year() ) {
	printf( '<span itemprop="name">%s</span>', get_the_date( _x( 'Y', 'Yearly archives date format', 'greenlet' ) ) );
	echo '<meta itemprop="position" content="2" /></div>';

} elseif ( is_search() ) {
	printf( '<span itemprop="name">%s</span>', esc_html__( 'Search: ', 'greenlet' ) . get_search_query() );
	echo '<meta itemprop="position" content="2" /></div>';

} elseif ( is_404() ) {
	echo '<span itemprop="name">404</span>';
	echo '<meta itemprop="position" content="2" /></div>';

} else {
	echo '<span itemprop="name">Post</span>';
	echo '<meta itemprop="position" content="2" /></div>';

}
echo '</div>';
