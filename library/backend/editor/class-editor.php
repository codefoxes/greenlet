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
	 * Selector mapping.
	 *
	 * @since 2.1.0
	 * @var array $mapping
	 */
	public $mapping = array(
		'body'           => array( '.editor-styles-wrapper' => array( 'background' ) ),
		'.entry-article' => array( '.editor-styles-wrapper:before' => array( 'background', 'background-color' ) ),
		'.container'     => array(
			'.editor-styles-wrapper:before' => array( 'width', 'max-width' ),
			'.wp-block'                     => array(
				'width'     => array( 'calc( ', ' - 6em)' ),
				'max-width' => array( 'calc( ', ' - 6em)' ),
			),
		),
	);

	/**
	 * Sets up Editor Features.
	 *
	 * @since  1.1.0
	 * @access public
	 * @return void
	 */
	public function __construct() {
		require_once GREENLET_LIBRARY_DIR . '/backend/helpers/class-cssparser.php';

		$enable_editor_styles = gl_get_option( 'editor_styles', false );
		if ( $enable_editor_styles ) {
			add_action( 'admin_enqueue_scripts', array( $this, 'load_editor_styles' ) );
			add_action( 'admin_enqueue_scripts', 'greenlet_enqueue_fonts', 90 );
		}
		add_action( 'init', array( $this, 'register_patterns' ) );
	}

	/**
	 * Prepare editor styles.
	 *
	 * @since 2.1.0
	 */
	public function prepare_styles() {
		$cw = get_option( 'color_wings' );
		if ( false === $cw || '' === $cw ) {
			return;
		}

		$theme = get_stylesheet();
		if ( ! isset( $cw[ $theme ] ) ) {
			return;
		}

		$raw  = greenlet_get_file_contents( GREENLET_ASSET_DIR . '/css/default.min.css' );
		$raw .= greenlet_get_file_contents( GREENLET_ASSET_DIR . '/css/styles.min.css' );

		foreach ( $cw[ $theme ] as $page => $value ) {
			if ( 'global' === $value['type'] ) {
				$raw .= $value['styles'];
			}
		}

		$css = new Cssparser();
		if ( '' !== $raw ) {
			try {
				$css->parse_string( $raw );
			} catch ( \Exception $e ) {
				$css = false;
			}
		}

		if ( false === $css ) {
			return;
		}

		foreach ( $this->mapping as $selector => $sel_props ) {
			$rule = $css->find_selector( $selector );
			if ( ! empty( $rule ) ) {
				foreach ( $sel_props as $sub => $raw_props ) {
					$inline = array();
					$props  = greenlet_is_assoc( $raw_props ) ? array_keys( $raw_props ) : $raw_props;
					foreach ( $rule[ $selector ] as $prop => $val ) {
						if ( in_array( $prop, $props, true ) ) {
							$value = ( isset( $raw_props[ $prop ] ) && is_array( $raw_props[ $prop ] ) && isset( $raw_props[ $prop ][0] ) ) ? $raw_props[ $prop ][0] . $val : $val;
							$value = ( isset( $raw_props[ $prop ] ) && is_array( $raw_props[ $prop ] ) && isset( $raw_props[ $prop ][1] ) ) ? $value . $raw_props[ $prop ][1] : $value;

							$inline[] = array( $prop, $value );
						}
					}
					greenlet_add_style( $sub, $inline );
				}
			}
		}
	}

	/**
	 * Load editor styles.
	 *
	 * @since 1.1.0
	 */
	public function load_editor_styles() {
		$this->prepare_styles();

		ob_start();
		?>
		.edit-post-layout .editor-styles-wrapper:before, .edit-post-layout__content .editor-styles-wrapper:before, .block-editor-editor-skeleton__content .editor-styles-wrapper:before {
			content: '';
			display: block;
			height: 100%;
			position: absolute;
			top: 0;
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
