<?php
/**
 * classes.php
 *
 * Classes required by the framework.
 *
 * @link		[url] [description]
 * @package		Greenlet
 * @subpackage	/library
 */


/**
 * ColumnObject Class.
 *
 * Class to create columns based on the layout if set,
 * else based on various options like current template.
 *
 * @since	1.0.0
 * @link	[url] [description]
 * @global	object $wp_query Intricacies of single post or page.
 * @param	mixed $cols Columns as integer or string of integers separated by hyphen.
 */
class ColumnObject {

	/**
	 * Template name from options or template files.
	 *
	 * @var string
	 */
	public $template_name;

	/**
	 * Columns in the template as integer or string of integers separated by hyphen.
	 *
	 * @var mixed
	 */
	public $columns;

	/**
	 * Array of each columns (width) in the template.
	 *
	 * @var array
	 */
	public $array;

	/**
	 * Width of the main column.
	 *
	 * @var integer
	 */
	public $main_column;

	/**
	 * Total count of the columns array.
	 *
	 * @var integer
	 */
	public $total;

	/**
	 * Sequence of main and sidebar columns in the template.
	 *
	 * @var array
	 */
	public $sequence;

	// Self Constructor.
	public function __construct( $cols = 0 ) {

		$this->columns = $cols;

		// If cols variable is not set,
		if( $cols === 0 ) {

			// The wp query.
			global $wp_query;

			// If is single page or post,
			if ( is_page() || is_single() ) {

				// Get template_name from post meta.
				$this->template_name = get_post_meta( $wp_query->post->ID, '_wp_page_template', true );
				$this->template_name = $this->template_name ? $this->template_name : 'default';

				// If template_name is default,
				if ( $this->template_name == 'default' ) {

					if ( is_page() ) {

						// Get columns, column sequence from options.
						$this->columns	= of_get_option( 'default_template' )	? of_get_option( 'default_template' )	: '12';
						$this->sequence	= of_get_option( 'default_sequence' )	? of_get_option( 'default_sequence' )	: array( 'main' );
					}

					if ( is_single() ) {

						$this->columns	= of_get_option( 'default_post_template' )	? of_get_option( 'default_post_template' )	: '12';
						$this->sequence	= of_get_option( 'default_post_sequence' )	? of_get_option( 'default_post_sequence' )	: array( 'main' );
					}
				} else {

					// Get template name from template file, sequence from post meta.
					$this->columns	= str_replace( '.php', '', basename($this->template_name) );
					$this->sequence	= get_post_meta( $wp_query->post->ID, '_template_sequence', true );
				}
			}

			// If is home (post list) page,
			elseif ( is_home() ) {

				$this->columns	= of_get_option( 'home_template' )	? of_get_option( 'home_template' )	: '12';
				$this->sequence	= of_get_option( 'home_sequence' )	? of_get_option( 'home_sequence' )	: array( 'main' );
			}

			// If is archive page,
			elseif ( is_archive() || is_search() ) {

				$this->columns	= of_get_option( 'archive_template' )	? of_get_option( 'archive_template' )	: '12';
				$this->sequence	= of_get_option( 'archive_sequence' )	? of_get_option( 'archive_sequence' )	: array( 'main' );
			}

			else {
				$this->columns	= of_get_option( 'default_template' )	? of_get_option( 'default_template' )	: '12';
				$this->sequence	= of_get_option( 'default_sequence' )	? of_get_option( 'default_sequence' )	: array( 'main' );
			}
		}

		// Array of each columns from options for template.
		$this->array = explode('-', $this->columns);

		// Detect column of maximum width.
		$this->main_column = max($this->array);

		// Calculate total number of columns.
		$this->total = sizeof($this->array);
	}

	public function cols_array() {
		return explode( '-', $this->columns );
	}

	public function main_column() {
		return max( $this->array() );
	}

	public function total() {
		return sizeof( $this->array() );
	}
}


/**
 * Sets up Honeypot spam filter.
 *
 * @since  1.0.0
 */
final class CircleHoneypot {

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

		add_action( 'login_head',			array( $this, 'print_styles'	)		);
		add_action( 'comment_form_after',	array( $this, 'print_styles'	)		);
		add_action( 'register_form',		array( $this, 'register_form'	), 99	);
		add_action( 'comment_form_top',		array( $this, 'register_form'	), 99	);
		add_action( 'register_post',		array( $this, 'check_honeypot'	), 0	);
		add_action( 'login_form_register',	array( $this, 'check_honeypot'	), 0	);
		add_filter( 'preprocess_comment',	array( $this, 'check_honeypot'	), 0	);
	}

	/**
	 * If spambot filled hidden field stop the process.
	 *
	 * @since  1.0.0
	 * @access public
	 * @return void
	 */
	public function check_honeypot( $data = null ) {

		if ( isset( $_POST['chf_name'] ) && !empty( $_POST['chf_name'] ) )
			wp_die( __( 'Thank you. Successfully added.', 'greenlet' ) );
		if ( isset( $data ) ) return $data;
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
	<?php }

	/**
	 * Outputs custom jQuery to make sure the honeypot field is empty by default.
	 *
	 * @since  1.0.0
	 * @access public
	 * @return void
	 */
	public function print_scripts() { ?>
		<script type="text/javascript">jQuery( '#chf_name' ).val( '' );</script>
	<?php }

	/**
	 * Adds a hidden field that spambots will fill out but humans won't see.
	 *
	 * @since  1.0.0
	 * @access public
	 * @return void
	 */
	public function register_form() {

		wp_enqueue_script( 'jquery' );
		add_action( 'login_footer', array( $this, 'print_scripts' ), 25 ); ?>

		<p class="chf_name_field">
			<label for="chf_name"><?php _e( 'Your Name', 'greenlet' ); ?></label><br />
			<input type="text" name="chf_name" id="chf_name" class="input" value="" size="25" autocomplete="off" /></label>
		</p>
	<?php }

	/**
	 * Returns the instance.
	 *
	 * @since  1.0.0
	 * @access public
	 * @return object
	 */
	public static function get_instance() {

		if ( !self::$instance )
			self::$instance = new self;

		return self::$instance;
	}
}

CircleHoneypot::get_instance();
