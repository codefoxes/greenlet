<?php
/**
 * Comments Template.
 *
 * The template for displaying comments.
 *
 * @package greenlet
 */

if ( post_password_required() ) {
	return;
}

greenlet_markup( 'comments-area', greenlet_attr( 'comments-area' ) );

if ( have_comments() ) : ?>
	<h2 class="comments-title">
		<?php
			printf(
				// translators: %s: Number of comments.
				esc_html( _nx( '%s comment', '%s comments', get_comments_number(), 'Comment title', 'greenlet' ) ),
				esc_html( number_format_i18n( get_comments_number() ) )
			);
		?>
	</h2>

	<ol class="comments">
		<?php wp_list_comments(); ?>
	</ol>

	<?php
	// If the comments are paginated, display the controls.
	if ( get_comment_pages_count() > 1 && get_option( 'page_comments' ) ) :
		?>
	<nav class="comment-nav" role="navigation">
		<p class="comment-nav-prev">
			<?php previous_comments_link( __( '&larr; Older Comments', 'greenlet' ) ); ?>
		</p>

		<p class="comment-nav-next">
			<?php next_comments_link( __( 'Newer Comments &rarr;', 'greenlet' ) ); ?>
		</p>
	</nav> <!-- end comment-nav -->
	<?php endif; ?>

	<?php
	// If the comments are closed, display an info text.
	if ( ! comments_open() && get_comments_number() ) :
		?>
		<p class="no-comments">
			<?php esc_html_e( 'Comments are closed.', 'greenlet' ); ?>
		</p>
		<?php
	endif;
endif;

comment_form();

greenlet_markup_close();
