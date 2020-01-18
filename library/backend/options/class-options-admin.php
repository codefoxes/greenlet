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
	 * @var string
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

		add_action( 'wp_ajax_greenlet_options_import', array( $this, 'greenlet_options_import' ) );

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
	 * @param string $hook The current admin page.
	 * @since 1.0.0
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
		$options = get_theme_mods();
		if ( $options && is_array( $options ) ) {
			// Generate the export data.
			$val = wp_json_encode( $options );
		} else {
			$val = __( 'You don\'t have any options to export. Try saving your options first.', 'greenlet' );
		}

		$setting_links = array(
			'title_tagline' => 'Title and Tagline',
			'colors'        => 'Colours',
			'framework'     => 'CSS Framework',
			'header_layout' => 'Header Layout',
			'main_layout'   => 'Main Layout',
			'footer_layout' => 'Footer Layout',
			'misc'          => 'Other Settings',
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
								<div class="heading">Customizer Controls</div>
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
							<div class="impex">
								<div class="heading">Import / Export Theme Settings</div>
								<div class="impex-section">
									<div class="row">
										<div class="col-6 col-impex export">
											<div class="sub-heading">Export Settings</div>
											<div class="export-option">
												<textarea rows="8" readonly><?php echo esc_html( $val ); ?></textarea>
												<div class="explain">Copy the contents to export.</div>
											</div>
										</div>
										<div class="col-6 col-impex import">
											<div class="sub-heading">Import Settings</div>
											<div class="import-option">
												<textarea rows="8"></textarea>
												<a href="#" id="import-btn" class="button-primary">Import Settings</a>
												<?php wp_nonce_field( 'greenlet_options', 'options_nonce' ); ?>
												<div class="explain">Paste the contents to import.</div>
											</div>
										</div>
									</div>
									<div class="row">
										<div class="message import-success">Import Settings successful. Reload page to get imported settings.</div>
										<div class="message import-warning">Import successful. Your settings and Import settings are same!!</div>
										<div class="message import-error">Sorry. Import Failed. Please check the code.</div>
										<div class="message import-default">There is nothing to import!</div>
									</div>
								</div>
							</div>
						</div>
						<div class="col-6">
							<div id="xhr-section"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<?php
	}

	/**
	 * Import options.
	 */
	public function greenlet_options_import() {

		if ( ! isset( $_POST['nonce'] ) || ! isset( $_POST['value'] ) ) {
			die( '0' );
		}

		if ( ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['nonce'] ) ), 'greenlet_options' ) ) {
			die( '0' );
		}

		$new_mods = json_decode( sanitize_textarea_field( wp_unslash( $_POST['value'] ) ), true );
		if ( json_last_error() !== JSON_ERROR_NONE ) {
			die( '0' );
		}

		if ( ! isset( $new_mods['custom_css_post_id'] ) ) {
			die( '0' );
		}

		$mods = get_theme_mods();

		if ( $mods === $new_mods ) {
			die( '2' );
		}

		$theme = get_option( 'stylesheet' );
		if ( update_option( "theme_mods_$theme", $new_mods ) ) {
			die( '1' );
		}

		die( '0' );
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
