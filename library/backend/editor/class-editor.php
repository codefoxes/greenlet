<?php
/**
 * Meta Boxes Manager.
 *
 * @package greenlet\library\backend\editor
 */

namespace Greenlet;

/**
 * Class Editor.
 *
 * @since 1.1.0
 */
class Editor {
	/**
	 * Holds the instances of this class.
	 *
	 * @since  1.1.0
	 * @access private
	 * @var    object
	 */
	private static $instance;

	/**
	 * Sets up Editor Features.
	 *
	 * @since  1.1.0
	 * @access public
	 * @return void
	 */
	public function __construct() {
		$enable_editor_styles = gl_get_option( 'editor_styles', true );
		if ( $enable_editor_styles ) {
			add_action( 'admin_enqueue_scripts', array( $this, 'load_editor_styles' ) );
			add_action( 'admin_enqueue_scripts', 'greenlet_enqueue_fonts', 90 );
		}
	}

	/**
	 * Load editor styles.
	 *
	 * @since 1.1.0
	 */
	public function load_editor_styles() {

		$width        = gl_get_option( 'main_container', '1170px' );
		$width        = ( '' === $width ) ? '1170px' : $width;
		$main_bg      = gl_get_option( 'main_bg', '#f5f5f5' );
		$content_bg   = gl_get_option( 'content_bg', '#fff' );
		$base_font    = gl_get_option( 'base_font', array() );
		$content_font = gl_get_option( 'content_font', array() );
		$heading_font = gl_get_option( 'heading_font', array() );
		$h1_font      = gl_get_option( 'h1_font', array() );
		$h2_font      = gl_get_option( 'h2_font', array() );
		$h3_font      = gl_get_option( 'h3_font', array() );
		$h4_font      = gl_get_option( 'h4_font', array() );
		$h5_font      = gl_get_option( 'h5_font', array() );
		$h6_font      = gl_get_option( 'h6_font', array() );
		$link_font    = gl_get_option( 'link_font', array() );
		$site_color   = gl_get_option( 'site_color', '#383838' );
		$heading_col  = gl_get_option( 'heading_color', '#383838' );

		greenlet_add_style( 'html', 'font-size', '62.5%' );
		greenlet_add_style( '.edit-post-layout__content', 'background', $main_bg );
		greenlet_add_style( '.edit-post-layout__content .editor-styles-wrapper', array( array( 'padding-top', '0' ), array( 'color', $site_color ), array( 'font-family', '-apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji' ) ) );
		greenlet_add_style( '.edit-post-layout__content .editor-styles-wrapper', 'font', $base_font );
		greenlet_add_style( '.edit-post-layout__content .editor-styles-wrapper', 'font', $content_font );
		greenlet_add_style( '.edit-post-layout__content .editor-styles-wrapper > div', 'padding-top', '50px' );
		greenlet_add_style( '.wp-block', 'max-width', 'calc(' . $width . ' - 6em)' );
		greenlet_add_style( '.editor-post-title__block .editor-post-title__input', array( array( 'font-family', 'inherit' ), array( 'font-weight', '300' ), array( 'color', $heading_col . ' !important' ) ) );
		greenlet_add_style( '.editor-post-title__block .editor-post-title__input', 'font', $heading_font );
		greenlet_add_style( '.editor-post-title__block .editor-post-title__input', 'font', $h1_font );
		greenlet_add_style( '.wp-block-heading h2, .wp-block-heading h3, .wp-block-heading h4, .wp-block-heading h5, .wp-block-heading h6', array( array( 'font-weight', '300' ), array( 'color', $heading_col . ' !important' ) ) );
		greenlet_add_style( '.wp-block-heading h2', 'font', $h2_font );
		greenlet_add_style( '.wp-block-heading h3', 'font', $h3_font );
		greenlet_add_style( '.wp-block-heading h4', 'font', $h4_font );
		greenlet_add_style( '.wp-block-heading h5', 'font', $h5_font );
		greenlet_add_style( '.wp-block-heading h6', 'font', $h6_font );
		greenlet_add_style( '.editor-rich-text a', 'font', $link_font );

		ob_start();
		?>
		.edit-post-layout__content .editor-styles-wrapper:before {
			content: '';
			display: block;
			width: <?php echo esc_html( $width ); ?>;
			height: 100%;
			position: absolute;
			background: <?php echo wp_kses( $content_bg, null ); ?>;
			left: 50%;
			transform: translateX(-50%);
		}
		<?php
		greenlet_print_inline_styles();

		greenlet_enqueue_inline_style( 'greenlet-inline', ob_get_clean() );
	}

	/**
	 * Returns the instance.
	 *
	 * @since  1.1.0
	 * @access public
	 * @return object
	 */
	public static function get_instance() {

		if ( ! self::$instance ) {
			self::$instance = new self();
		}

		return self::$instance;
	}
}

if ( greenlet_is_editor() ) {
	Editor::get_instance();
}
