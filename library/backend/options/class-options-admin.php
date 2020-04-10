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

		add_action( 'wp_ajax_greenlet_options_import', array( $this, 'greenlet_options_import' ) );
		add_action( 'wp_ajax_greenlet_save_backend', array( $this, 'greenlet_save_backend' ) );

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
		$options = get_theme_mods();
		if ( $options && is_array( $options ) ) {
			// Generate the export data.
			$val = wp_json_encode( $options );

			$editor_styles = ( isset( $options['editor_styles'] ) && false === $options['editor_styles'] ) ? false : true;
		} else {
			$val = __( 'You don\'t have any options to export. Try saving your options first.', 'greenlet' );

			$editor_styles = true;
		}

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
							<div class="backend">
								<div class="heading"><?php esc_html_e( 'Backend Settings', 'greenlet' ); ?></div>
								<div class="content-wrap">
									<div class="row">
										<div class="col-12">
											<span>
												<input id="editor_styles" type="checkbox" <?php checked( $editor_styles, true ); ?>>
												<label for="editor_styles"><?php esc_html_e( 'Editor Styles', 'greenlet' ); ?></label>
												<div class="setting-description"><?php esc_html_e( 'Match the Post editor styles to the frontend styles.', 'greenlet' ); ?></div>
											</span>
											<div class="save-wrap">
												<a href="#" id="save-btn" class="action-btn button-primary"><?php esc_html_e( 'Save Settings', 'greenlet' ); ?></a>
												<span class="spinner"></span>
												<?php wp_nonce_field( 'greenlet_backend', 'options_nonce' ); ?>
											</div>
										</div>
									</div>
									<div class="row setting-messages">
										<div class="message success setting-success"><?php esc_html_e( 'Settings saved successfully.', 'greenlet' ); ?></div>
										<div class="message error setting-error"><?php esc_html_e( 'Sorry. Saving Failed.', 'greenlet' ); ?></div>
									</div>
								</div>
							</div>
							<div class="impex">
								<div class="heading"><?php esc_html_e( 'Import / Export Theme Settings', 'greenlet' ); ?></div>
								<div class="content-wrap impex-section">
									<div class="row">
										<div class="col-6 col-impex export">
											<div class="sub-heading"><?php esc_html_e( 'Export Settings', 'greenlet' ); ?></div>
											<div class="export-option">
												<textarea rows="8" readonly><?php echo esc_html( $val ); ?></textarea>
												<div class="explain"><?php esc_html_e( 'Copy the contents to export.', 'greenlet' ); ?></div>
											</div>
										</div>
										<div class="col-6 col-impex import">
											<div class="sub-heading"><?php esc_html_e( 'Import Settings', 'greenlet' ); ?></div>
											<div class="import-option">
												<textarea id="import-content" rows="8"></textarea>
												<div class="explain"><?php esc_html_e( 'Paste the contents to import.', 'greenlet' ); ?></div>
												<div class="btn-wrap">
													<a href="#" id="import-btn" class="button-primary action-btn"><?php esc_html_e( 'Import Settings', 'greenlet' ); ?></a>
													<span class="spinner"></span>
													<?php wp_nonce_field( 'greenlet_options', 'options_nonce' ); ?>
												</div>
											</div>
										</div>
									</div>
									<div class="row">
										<div class="message success import-success"><?php esc_html_e( 'Import Settings successful. Reload page to get imported settings.', 'greenlet' ); ?></div>
										<div class="message warning import-warning"><?php esc_html_e( 'Import successful. Your settings and Import settings are same!!', 'greenlet' ); ?></div>
										<div class="message error import-error"><?php esc_html_e( 'Sorry. Import Failed. Please check the code.', 'greenlet' ); ?></div>
										<div class="message default import-default"><?php esc_html_e( 'There is nothing to import!', 'greenlet' ); ?></div>
									</div>
								</div>
							</div>
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
	 * Import options.
	 *
	 * @since 1.0.0
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
	 * Save Backend Settings.
	 *
	 * @since 1.1.0
	 */
	public function greenlet_save_backend() {
		if ( ! isset( $_POST['nonce'] ) || ! isset( $_POST['settings'] ) ) {
			die( '0' );
		}

		if ( ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['nonce'] ) ), 'greenlet_backend' ) ) {
			die( '0' );
		}

		$settings = json_decode( sanitize_textarea_field( wp_unslash( $_POST['settings'] ) ), true );
		foreach ( $settings as $setting => $setting_val ) {
			set_theme_mod( $setting, $setting_val );
		}

		die( wp_json_encode( get_theme_mods() ) );
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
