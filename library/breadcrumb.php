<?php
/**
 * Breadcrumb Template.
 *
 * @package greenlet\library
 */

global $post;
$separator = of_get_option( 'breadcrumb_sep' ) ? of_get_option( 'breadcrumb_sep' ) : '&raquo;';
$microdata = '<div itemscope itemtype="http://data-vocabulary.org/Breadcrumb">';

echo '<div class="breadcrumb">';
echo $microdata; // phpcs:ignore
echo '<a href="' . esc_html( home_url() ) . '" itemprop="url"><span itemprop="title">Home</span></a> ' . esc_html( $separator ) . ' </div>';

if ( is_category() || is_tag() ) {
	single_cat_title();

} elseif ( is_single() ) {
	$category = get_the_category();
	if ( $category ) {
		echo $microdata; // phpcs:ignore
		echo '<a href="' . esc_html( get_category_link( $category[0]->term_id ) );
		echo '" itemprop="url"><span itemprop="title">' . esc_html( $category[0]->cat_name ) . '</span></a> ' . esc_html( $separator ) . ' </div>';
	}
	the_title();

} elseif ( is_page() && $post->post_parent ) {
	$home = get_post( get_option( 'page_on_front' ) );
	for ( $i = count( $post->ancestors ) - 1; $i >= 0; $i-- ) {
		if ( ( $home->ID ) !== ( $post->ancestors[ $i ] ) ) {
			echo $microdata . '<a href="'; // phpcs:ignore
			echo esc_html( get_permalink( $post->ancestors[ $i ] ) );
			echo '" itemprop="url"><span itemprop="title">';
			echo esc_html( get_the_title( $post->ancestors[ $i ] ) );
			echo '</span></a> ' . esc_html( $separator ) . ' </div>';
		}
	}
	echo esc_html( get_the_title() );

} elseif ( is_page() ) {
	echo esc_html( get_the_title() );

} elseif ( is_404() ) {
	echo '404';

} elseif ( is_author() ) {
	echo get_the_author();

} elseif ( is_day() ) {
	echo get_the_date();

} elseif ( is_month() ) {
	echo get_the_date( _x( 'F Y', 'Monthly archives date format', 'greenlet' ) );

} elseif ( is_year() ) {
	echo get_the_date( _x( 'Y', 'Yearly archives date format', 'greenlet' ) );
} elseif ( is_search() ) {
	echo 'Search: ' . get_search_query();
} else {
	echo 'Post';
}
echo '</div>';
