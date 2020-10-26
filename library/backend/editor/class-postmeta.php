<?php
/**
 * Post Meta Manager.
 *
 * @package greenlet\library\backend\editor
 */

namespace Greenlet;

/**
 * Class PostMeta.
 *
 * @since 2.0.0
 */
class PostMeta {
	/**
	 * Holds the instances of this class.
	 *
	 * @since  2.0.0
	 * @access private
	 * @var    object
	 */
	private static $instance;

	/**
	 * Sets up Post Meta Features.
	 *
	 * @since  2.0.0
	 * @access public
	 * @return void
	 */
	public function __construct() {
		add_action( 'enqueue_block_editor_assets', array( $this, 'enqueue_scripts' ) );
	}

	/**
	 * Enqueue Post Meta Scripts.
	 *
	 * @since  2.0.0
	 */
	public function enqueue_scripts() {
		$meta = array(
			'hasMeta'   => post_type_supports( get_post_type(), 'custom-fields' ),
			'templates' => greenlet_template_images(),
			'contents'  => greenlet_column_content_options(),
		);

		$min = ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ) ? '' : '.min';
		wp_enqueue_script( 'greenlet-meta', GREENLET_LIBRARY_URL . '/backend/assets/js/greenlet-meta' . $min . '.js', array( 'wp-i18n', 'wp-plugins', 'wp-edit-post', 'wp-element' ), GREENLET_VERSION, true );
		wp_localize_script( 'greenlet-meta', 'greenletMeta', $meta );
		wp_set_script_translations( 'greenlet-meta', 'greenlet' );
	}

	/**
	 * Returns the instance.
	 *
	 * @since  2.0.0
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
	PostMeta::get_instance();
}
