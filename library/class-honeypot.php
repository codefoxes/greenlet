<?php
/**
 * Honeypot.
 *
 * @package greenlet\library
 */

/**
 * Sets up Honeypot spam filter.
 *
 * @since  1.0.0
 */
final class Honeypot {

	/**
	 * Holds the instances of this class.
	 *
	 * @since  1.0.0
	 * @access private
	 * @var    object
	 */
	private static $instance;

	/**
	 * Sets up needed actions/filters for the honeypot to initialize.
	 *
	 * @since  1.0.0
	 * @access public
	 * @return void
	 */
	public function __construct() {
		add_action( 'login_head', array( $this, 'print_styles' ) );
		add_action( 'comment_form_after', array( $this, 'print_styles' ) );
		add_action( 'register_form', array( $this, 'register_form' ), 99 );
		add_action( 'comment_form_top', array( $this, 'register_form' ), 99 );
		add_action( 'register_post', array( $this, 'check_honeypot' ), 0 );
		add_action( 'login_form_register', array( $this, 'check_honeypot' ), 0 );
		add_filter( 'preprocess_comment', array( $this, 'check_honeypot' ), 0 );
	}

	/**
	 * If spambot filled hidden field stop the process.
	 *
	 * @since  1.0.0
	 * @access public
	 * @param mixed $data Input data.
	 * @return mixed
	 */
	public function check_honeypot( $data = null ) {

		if ( isset( $_POST['chf_name'] ) && ! empty( $_POST['chf_name'] ) ) { // phpcs:ignore
			wp_die( esc_html__( 'Thank you. Successfully added.', 'greenlet' ) );
		}
		if ( isset( $data ) ) {
			return $data;
		}
		return false;
	}

	/**
	 * Outputs custom CSS to hide the honeypot field.
	 *
	 * @since  1.0.0
	 * @access public
	 * @return void
	 */
	public function print_styles() { ?>
		<style type="text/css">.chf_name_field { display: none; }</style>
		<?php
	}

	/**
	 * Outputs custom jQuery to make sure the honeypot field is empty by default.
	 *
	 * @since  1.0.0
	 * @access public
	 * @return void
	 */
	public function print_scripts() {
		?>
		<script type="text/javascript">jQuery( '#chf_name' ).val( '' );</script>
		<?php
	}

	/**
	 * Adds a hidden field that spambots will fill out but humans won't see.
	 *
	 * @since  1.0.0
	 * @access public
	 * @return void
	 */
	public function register_form() {

		wp_enqueue_script( 'jquery' );
		add_action( 'login_footer', array( $this, 'print_scripts' ), 25 );
		?>

		<p class="chf_name_field">
			<label for="chf_name"><?php esc_html_e( 'Your Name', 'greenlet' ); ?><br />
			<input type="text" name="chf_name" id="chf_name" class="input" value="" size="25" autocomplete="off" /></label>
		</p>
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
			self::$instance = new Honeypot();
		}

		return self::$instance;
	}
}

Honeypot::get_instance();
