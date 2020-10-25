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
		add_action( 'init', array( $this, 'register_patterns' ) );
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
		greenlet_add_style( '.edit-post-layout__content, .block-editor-editor-skeleton__content', 'background', $main_bg );
		greenlet_add_style( '.edit-post-layout__content .editor-styles-wrapper, .block-editor-editor-skeleton__content .editor-styles-wrapper', array( array( 'padding-top', '0' ), array( 'color', $site_color ), array( 'font-family', '-apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji' ) ) );
		greenlet_add_style( '.edit-post-layout__content .editor-styles-wrapper, .block-editor-editor-skeleton__content .editor-styles-wrapper', 'font', $base_font );
		greenlet_add_style( '.edit-post-layout__content .editor-styles-wrapper, .block-editor-editor-skeleton__content .editor-styles-wrapper', 'font', $content_font );
		greenlet_add_style( '.edit-post-layout__content .editor-styles-wrapper > div, .block-editor-editor-skeleton__content .editor-styles-wrapper > div', 'padding-top', '50px' );
		greenlet_add_style( '.wp-block', 'max-width', 'calc(' . $width . ' - 6em)' );
		greenlet_add_style( '.editor-post-title__block .editor-post-title__input', array( array( 'font-family', 'inherit' ), array( 'font-weight', '300' ), array( 'color', $heading_col . ' !important' ) ) );
		greenlet_add_style( '.editor-post-title__block .editor-post-title__input', 'font', $heading_font );
		greenlet_add_style( '.editor-post-title__block .editor-post-title__input', 'font', $h1_font );
		greenlet_add_style( '.wp-block-heading h2, .wp-block-heading h3, .wp-block-heading h4, .wp-block-heading h5, .wp-block-heading h6', array( array( 'font-weight', '300' ), array( 'color', $heading_col . ' !important' ) ) );
		greenlet_add_style( '[data-type="core/heading"] h2, [data-type="core/heading"] h3, [data-type="core/heading"] h4, [data-type="core/heading"] h5, [data-type="core/heading"] h6', array( array( 'font-weight', '300' ), array( 'color', $heading_col . ' !important' ) ) );
		greenlet_add_style( '.wp-block-heading h2, [data-type="core/heading"] h2', 'font', $h2_font );
		greenlet_add_style( '.wp-block-heading h3, [data-type="core/heading"] h3', 'font', $h3_font );
		greenlet_add_style( '.wp-block-heading h4, [data-type="core/heading"] h4', 'font', $h4_font );
		greenlet_add_style( '.wp-block-heading h5, [data-type="core/heading"] h5', 'font', $h5_font );
		greenlet_add_style( '.wp-block-heading h6, [data-type="core/heading"] h6', 'font', $h6_font );
		greenlet_add_style( '.editor-rich-text a, .wp-block .rich-text a', 'font', $link_font );

		ob_start();
		?>
		.edit-post-layout__content .editor-styles-wrapper:before, .block-editor-editor-skeleton__content .editor-styles-wrapper:before {
			content: '';
			display: block;
			width: <?php echo esc_html( $width ); ?>;
			height: 100%;
			position: absolute;
			background: <?php echo wp_kses( $content_bg, null ); ?>;
			left: 50%;
			transform: translateX(-50%);
		}

		/* Pattern Styles */
		.wp-block-cover.full-width {
			width: calc(100vw - 280px);
			max-width: 100vw;
			left: calc(50% - 140px);
			right: calc(50% - 140px);
			margin-left: calc(-50vw + 280px);
			margin-right: calc(-50vw + 280px);
		}

		.full-width .wp-block {
			max-width: 100%;
		}

		.wp-block-group.full-width-box .wp-block-cover:first-child {
			width: calc(100vw - 280px);
			max-width: 100vw;
			position: absolute;
			left: calc(50% - 140px);
			right: calc(50% - 140px);
			margin-left: calc(-50vw + 280px);
			margin-right: calc(-50vw + 280px);
			min-height: auto;
			height: 100%;
			margin-top: 0;
			z-index: 1;
		}

		.wp-block-group.full-width-box .wp-block-cover:first-child > *:not(.components-placeholder) {
			display: none
		}

		.wp-block-group.full-width-box .wp-block-cover ~ * {
			position: relative;
			z-index: 2;
		}
		<?php
		greenlet_print_inline_styles();

		greenlet_enqueue_inline_style( 'greenlet-inline', ob_get_clean() );
	}

	/**
	 * Register block patterns.
	 *
	 * @since 2.0.0
	 */
	public function register_patterns() {
		register_block_pattern_category(
			'greenlet',
			array( 'label' => __( 'Greenlet', 'greenlet' ) )
		);

		if ( function_exists( 'register_block_pattern' ) ) {
			register_block_pattern(
				'greenlet/full-width-banner',
				array(
					'title'       => __( 'Full Width Banner', 'greenlet' ),
					'description' => __( 'Full width Banner Cover.', 'greenlet' ),
					'categories'  => array( 'greenlet', 'header' ),
					'content'     => '<!-- wp:cover {"customOverlayColor":"#ffecb3","className":"full-width"} --><div class="wp-block-cover has-background-dim full-width" style="background-color:#ffecb3"><div class="wp-block-cover__inner-container"><!-- wp:heading {"align":"center","textColor":"black","style":{"color":{"background":"#9ccc65"}}} --><h2 class="has-text-align-center has-black-color has-text-color has-background" style="background-color:#9ccc65">Full width banner</h2><!-- /wp:heading --></div></div><!-- /wp:cover -->',
				)
			);

			register_block_pattern(
				'greenlet/full-width-box',
				array(
					'title'       => __( 'Full Width Banner with Container', 'greenlet' ),
					'description' => __( 'Full width Banner Cover with contents inside a container.', 'greenlet' ),
					'categories'  => array( 'greenlet', 'header' ),
					'content'     => '<!-- wp:group {"className":"full-width-box"} --><div class="wp-block-group full-width-box"><div class="wp-block-group__inner-container"><!-- wp:cover {"customOverlayColor":"#ffecb3"} --><div class="wp-block-cover has-background-dim" style="background-color:#ffecb3"><div class="wp-block-cover__inner-container"></div></div><!-- /wp:cover --><!-- wp:heading {"align":"center","textColor":"black","style":{"color":{"background":"#9ccc65"}}} --><h2 class="has-text-align-center has-black-color has-text-color has-background" style="background-color:#9ccc65">Full width banner</h2><!-- /wp:heading --></div></div><!-- /wp:group -->',
				)
			);
		}
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
