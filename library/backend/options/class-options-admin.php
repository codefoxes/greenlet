<?php
/**
 * Options Admin Manager.
 *
 * @package greenlet\library\admin\options
 */

namespace Greenlet;

/**
 * Set up Options Admin Page.
 *
 * @since  1.0.0
 */
class Options_Admin {

	/**
	 * Holds the instances of this class.
	 *
	 * @since  1.0.0
	 * @access private
	 * @var    object
	 */
	private static $instance;

	/**
	 * Page hook for the options screen
	 *
	 * @since 1.0.0
	 * @var   string
	 */
	protected $options_screen = null;

	/**
	 * Hook in the scripts and styles
	 *
	 * @since 1.0.0
	 */
	public function __construct() {
		if ( ! current_user_can( 'edit_theme_options' ) ) {
			return;
		}

		// Add the options page and menu item.
		add_action( 'admin_menu', array( $this, 'add_custom_options_page' ) );

		// Add the required scripts and styles.
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_admin_scripts' ) );
	}

	/**
	 * Define menu options.
	 *
	 * @since 1.0.0
	 */
	protected static function menu_settings() {
		$menu = array(
			// Modes: submenu, menu.
			'mode'        => 'submenu',

			// Submenu default settings.
			'page_title'  => __( 'Greenlet Settings', 'greenlet' ),
			'menu_title'  => __( 'Greenlet Options', 'greenlet' ),
			'capability'  => 'edit_theme_options',
			'menu_slug'   => 'greenlet',
			'parent_slug' => 'themes.php',

			// Menu default settings.
			'icon_url'    => 'dashicons-admin-generic',
			'position'    => '61',
		);

		return apply_filters( 'greenlet_options_menu', $menu );
	}

	/**
	 * Add a sub page to the appearance menu.
	 *
	 * @since 1.0.0
	 */
	public function add_custom_options_page() {
		$menu = $this->menu_settings();

		$this->options_screen = add_theme_page(
			$menu['page_title'],
			$menu['menu_title'],
			$menu['capability'],
			$menu['menu_slug'],
			array( $this, 'options_page' )
		);
	}

	/**
	 * Loads the required javascript.
	 *
	 * @since 1.0.0
	 * @param string $hook The current admin page.
	 */
	public function enqueue_admin_scripts( $hook ) {
		if ( $this->options_screen !== $hook ) {
			return;
		}

		// Styles.
		wp_enqueue_style( 'greenlet-options', LIBRARY_URL . '/backend/assets/css/options.css', array(), GREENLET_VERSION );

		// Scripts.
		wp_enqueue_script( 'greenlet-options', LIBRARY_URL . '/backend/assets/js/options.js', array(), GREENLET_VERSION, true );
	}

	/**
	 * Build out the options panel.
	 *
	 * @since 1.0.0
	 */
	public function options_page() {
		$setting_links = array(
			'title_tagline' => __( 'Title and Tagline', 'greenlet' ),
			'framework'     => __( 'CSS Framework', 'greenlet' ),
			'header_layout' => __( 'Header Layout', 'greenlet' ),
			'main_layout'   => __( 'Main Layout', 'greenlet' ),
			'footer_layout' => __( 'Footer Layout', 'greenlet' ),
			'typography'    => __( 'Typography', 'greenlet' ),
			'colors'        => __( 'Colours', 'greenlet' ),
			'headings'      => __( 'Heading Design', 'greenlet' ),
			'buttons'       => __( 'Buttons Design', 'greenlet' ),
			'links'         => __( 'Links Design', 'greenlet' ),
			'inputs'        => __( 'Inputs Design', 'greenlet' ),
			'paragraphs'    => __( 'Paragraphs Design', 'greenlet' ),
			'blog'          => __( 'Blog Settings', 'greenlet' ),
			'performance'   => __( 'Performance', 'greenlet' ),
		);
		?>

		<div id="greenlet" class="wrap">

			<?php $menu = $this->menu_settings(); ?>
			<div class="title"><?php echo esc_html( $menu['page_title'] ); ?></div>

			<?php settings_errors( 'options-framework' ); ?>

			<div id="greenlet-options">
				<div class="container">
					<div class="row">
						<div class="col-6">
							<div class="settings">
								<div class="heading"><?php esc_html_e( 'Customizer Controls', 'greenlet' ); ?></div>
								<div class="links-wrap">
									<?php
									foreach ( $setting_links as $section => $title ) {
										$link = admin_url( '/customize.php?autofocus[section]=' . $section );
										echo '<div class="link">';
										printf( '<a href="%1$s" target="_blank" >%2$s</a>', esc_url( $link ), wp_kses( $title, null ) );
										echo '</div>';
									}
									?>
								</div>
							</div>
							<?php do_action( 'greenlet_after_backend_customizer_links' ); ?>
						</div>
						<div class="col-6">
							<div class="ext-links">
								<div class="link-wrap"><a href="https://greenletwp.com/pro/" target="_blank"><?php esc_html_e( 'Get Pro Version', 'greenlet' ); ?></a></div>
								<div class="link-wrap"><a href="https://greenletwp.com/docs/" target="_blank"><?php esc_html_e( 'Documentation', 'greenlet' ); ?></a></div>
								<div class="link-wrap"><a href="https://github.com/codefoxes/greenlet/tree/dev" target="_blank"><?php esc_html_e( 'Latest dev branch', 'greenlet' ); ?></a></div>
							</div>
							<div id="xhr-section"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<?php
	}



	/**
	 * Returns the instance.
	 *
	 * @since  1.0.0
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

Options_Admin::get_instance();
