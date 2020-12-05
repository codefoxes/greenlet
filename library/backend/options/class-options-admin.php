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

		add_action( 'wp_ajax_greenlet_toggle_plugin', array( $this, 'toggle_plugin' ) );
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

		$data = array(
			'ajaxUrl' => admin_url( 'admin-ajax.php' ),
			'nonce'   => wp_create_nonce( 'greenlet_options' ),
		);

		$min = ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ) ? '' : '.min';
		wp_enqueue_script( 'greenlet-options', GREENLET_LIBRARY_URL . '/backend/assets/js/greenlet-options' . $min . '.js', array( 'updates' ), GREENLET_VERSION, true );
		wp_localize_script( 'greenlet-options', 'glOptionsData', $data );
	}

	/**
	 * Check if plugin is installed.
	 *
	 * @since  2.2.0
	 * @param  string $path Plugin file path.
	 * @return bool         Whether plugin is installed.
	 */
	public function is_plugin_installed( $path ) {
		$installed = get_plugins();
		return array_key_exists( $path, $installed ) || in_array( $path, $installed, true );
	}

	/**
	 * Build out the options panel.
	 *
	 * @since 1.0.0
	 */
	public function options_page() {
		$setting_links = array(
			array( __( 'Logo, Title & Tagline', 'greenlet' ), 'title_tagline', 'embed-photo' ),
			array( __( 'CSS Framework', 'greenlet' ), 'framework', 'align-left' ),
			array( __( 'Header Layout', 'greenlet' ), 'header_section', 'insert-before' ),
			array( __( 'Main Layout', 'greenlet' ), 'main_layout', 'align-wide' ),
			array( __( 'Footer Layout', 'greenlet' ), 'footer_section', 'insert-after' ),
			array( __( 'Blog Settings', 'greenlet' ), 'blog', 'edit-page' ),
			array( __( 'Performance', 'greenlet' ), 'performance', 'superhero' ),
			array( __( 'Theme Presets', 'greenlet' ), 'presets', 'layout' ),
			array( __( 'Visual Style Editor', 'greenlet' ), 'extra_styles', 'admin-customizer' ),
		);

		$plugins = array(
			array( __( 'Greenlet Booster', 'greenlet' ), 'greenlet-booster', 'greenlet-booster/booster.php' ),
		);
		?>

		<div id="greenlet" class="wrap">

			<?php $menu = $this->menu_settings(); ?>
			<div class="title"><?php echo esc_html( $menu['page_title'] ); ?></div>

			<div id="greenlet-options">
				<div class="container">
					<div class="row">
						<div class="col-6">
							<div class="settings">
								<div class="heading"><?php esc_html_e( 'Customizer Controls', 'greenlet' ); ?></div>
								<div class="list-wrap">
									<?php
									foreach ( $setting_links as $section ) {
										$link = admin_url( '/customize.php?autofocus[section]=' . $section[1] );
										echo '<div class="link">';
										printf( '<a href="%1$s" target="_blank" ><span class="dashicons dashicons-%2$s"></span>%3$s</a>', esc_url( $link ), esc_attr( $section[2] ), wp_kses( $section[0], null ) );
										echo '</div>';
									}
									?>
								</div>
							</div>
							<?php if ( current_user_can( 'install_plugins' ) ) : ?>
							<div class="plugins greenlet-plugins">
								<div class="heading"><?php esc_html_e( 'Enhance Greenlet with free plugins', 'greenlet' ); ?></div>
								<div class="list-wrap">
									<?php
									foreach ( $plugins as $plugin ) {
										$link = trailingslashit( 'https://wordpress.org/plugins/' . $plugin[1] );
										$op   = 'install-activate';
										if ( is_plugin_active( $plugin[2] ) ) {
											$op = 'deactivate';
										} elseif ( $this->is_plugin_installed( $plugin[2] ) ) {
											$op = 'activate';
										}

										echo '<div class="plugin">';
										printf( '<a href="%1$s" target="_blank" >%2$s</a>', esc_url( $link ), wp_kses( $plugin[0], null ) );
										echo '<div class="message"></div>';
										printf(
											'<a href="#" class="plugin-op" data-slug="%1$s" data-plugin="%2$s" data-op="%3$s"><span class="spinner"></span> %4$s</a>',
											esc_attr( $plugin[1] ),
											esc_attr( $plugin[2] ),
											esc_attr( $op ),
											esc_html( join( ' & ', explode( '-', $op ) ) )
										);
										echo '</div>';
									}
									?>
								</div>
							</div>
							<?php endif; ?>
							<?php do_action( 'greenlet_after_backend_customizer_links' ); ?>
						</div>
						<div class="col-6">
							<div class="ext-links">
								<div class="link-wrap"><a href="https://greenletwp.com/pro/" target="_blank"><?php esc_html_e( 'Get Pro Version', 'greenlet' ); ?></a></div>
								<div class="link-wrap"><a href="https://wordpress.org/support/theme/greenlet/reviews/#new-post" target="_blank"><?php esc_html_e( 'Show your love', 'greenlet' ); ?></a></div>
								<div class="link-wrap"><a href="https://greenletwp.com/docs/" target="_blank"><?php esc_html_e( 'Documentation', 'greenlet' ); ?></a></div>
								<div class="link-wrap"><a href="https://wordpress.org/support/theme/greenlet/" target="_blank"><?php esc_html_e( 'Support forum', 'greenlet' ); ?></a></div>
								<div class="link-wrap"><a href="https://github.com/codefoxes/greenlet/issues/new?template=bug_report.md&title=%5BBUG%5D+ex%3A+Something+isn%27t+working" target="_blank"><?php esc_html_e( 'Report a bug', 'greenlet' ); ?></a></div>
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
	 * Toggle Plugin activation and deactivation.
	 */
	public function toggle_plugin() {
		if (
			! isset( $_POST['nonce'] )
			|| ! isset( $_POST['plugin'] )
			|| ! isset( $_POST['op'] )
			|| ( ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['nonce'] ) ), 'greenlet_options' ) )
		) {
			die( '0' );
		}

		if ( ! current_user_can( 'install_plugins' ) ) {
			wp_send_json_error(
				array(
					'success' => false,
					'message' => __( 'Can not install plugin', 'greenlet' ),
				)
			);
		}

		$op = sanitize_textarea_field( wp_unslash( $_POST['op'] ) );

		$plugin = sanitize_textarea_field( wp_unslash( $_POST['plugin'] ) );

		$action = null;
		if ( 'activate' === $op ) {
			$action = activate_plugin( $plugin, '', false, true );
		} elseif ( 'deactivate' === $op ) {
			$action = deactivate_plugins( $plugin, true );
		}

		if ( is_wp_error( $action ) ) {
			wp_send_json_error(
				array(
					'success' => false,
					'message' => $action->get_error_message(),
				)
			);
		}

		wp_send_json_success(
			array( 'success' => true )
		);
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
