<?php
/**
 * Color Wings Manager.
 *
 * @package ColorWings
 */

namespace ColorWings;

if ( ! class_exists( 'ColorWings\ColorWings' ) ) {
	/**
	 * Class Color Wings.
	 *
	 * @since 1.0.0
	 */
	class ColorWings {
		/**
		 * Holds the instances of this class.
		 *
		 * @since  1.0.0
		 * @access private
		 * @var    object
		 */
		private static $instance;

		/**
		 * Color wings css string.
		 *
		 * @since  1.0.0
		 * @access public
		 * @var    string
		 */
		public $styles = '';

		/**
		 * All the fonts information.
		 *
		 * @since  1.0.0
		 * @access public
		 * @var    array
		 */
		public $fonts = array();

		/**
		 * All the font URLs.
		 *
		 * @since  1.0.0
		 * @access public
		 * @var    array
		 */
		public $font_urls = array();

		/**
		 * Sets up Color Wings Features.
		 *
		 * @since  1.0.0
		 * @access public
		 * @return void
		 */
		public function __construct() {
			define( 'COLORWINGS_VERSION', '1.0.0' );
			define( 'COLORWINGS_URL', $this->get_path_url() );
			define( 'COLORWINGS_DIR', dirname( __FILE__ ) );

			global $wp_customize;
			if ( is_admin() || isset( $wp_customize ) ) {
				require_once dirname( __FILE__ ) . '/class-colorwings-admin.php';
				ColorWings_Admin::get_instance();
			}

			add_action( 'wp_enqueue_scripts', array( $this, 'prepare_styles' ) );
			add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_fonts' ) );
			add_filter( 'wp_get_custom_css', array( $this, 'append_styles' ) );
		}

		/**
		 * Get file or directory URL.
		 *
		 * @since  1.0.0
		 * @param  string $path File or directory path.
		 * @return bool|string
		 */
		public function get_path_url( $path = __DIR__ ) {
			$relative_path = str_replace( '\\', '/', str_replace( str_replace( '/', '\\', WP_CONTENT_DIR ), '', str_replace( WP_CONTENT_DIR, '', $path ) ) );
			if ( $relative_path ) {
				return content_url( $relative_path );
			}
			return false;
		}

		/**
		 * Prepare Styles.
		 *
		 * @since  1.0.0
		 * @access public
		 * @return void
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

			foreach ( $cw[ $theme ] as $page => $value ) {
				if ( 'global' === $value['type'] ) {
					$this->styles .= $value['styles'];
					$this->add_font( $value );
				} elseif ( 'template' === $value['type'] ) {
					if (
						( 'is_front_page' === $page && is_front_page() )
						|| ( 'is_home' === $page && is_home() )
						|| ( 'is_archive' === $page && is_archive() )
						|| ( 'is_page' === $page && is_page() )
						|| ( 'is_single' === $page && is_single() )
					) {
						$this->styles .= $value['styles'];
					}
					$this->add_font( $value );
				}
			}
		}

		/**
		 * Enqueue fonts.
		 *
		 * @since 1.1.0
		 */
		public function enqueue_fonts() {
			foreach ( $this->fonts as $source => $fonts ) {
				if ( ! is_array( $fonts ) ) {
					return;
				}

				if ( 'google' === $source ) {
					$args = array();
					foreach ( $fonts as $family => $weights ) {
						$family = str_replace( ' ', '+', $family );
						$args[] = $family . ':' . implode( ',', $weights );
					}
					$font_args = array(
						'family'  => implode( '|', $args ),
						'display' => 'fallback',
					);
					$font_url  = add_query_arg( $font_args, '//fonts.googleapis.com/css' );

					$this->font_urls[] = 'http://fonts.gstatic.com';
				} else {
					$font_url = apply_filters( "colorwings_{$source}_font_url", '', $fonts );
				}

				$this->font_urls[] = $font_url;
				$this->add_deferred_style( $font_url );
			}
			add_filter( 'wp_resource_hints', array( $this, 'prefetch_font_origins' ), 10, 2 );
		}

		/**
		 * Append Color Wings styles.
		 *
		 * @since  1.0.0
		 * @param  string $css WP custom styles.
		 * @return string      CW Appended styles.
		 */
		public function append_styles( $css ) {
			$this->styles = trim( $this->styles );
			if ( '' === $this->styles ) {
				return $css;
			}

			$css .= $this->styles;
			return $css;
		}

		/**
		 * Add font details to the fonts list.
		 *
		 * @since 1.0.0
		 * @param array $data Page styles data.
		 */
		public function add_font( $data ) {
			if ( ! isset( $data['fonts'] ) ) {
				return;
			}

			$this->fonts = array_merge_recursive( $this->fonts, $data['fonts'] );
			// Todo: Make array weights unique.
		}

		/**
		 * Add deferred stylesheet link.
		 *
		 * @since 1.0.0
		 * @param string $href Link href.
		 */
		public function add_deferred_style( $href ) {
			printf( '<link rel="%1$s" href="%2$s" media="none" onload="this.media=\'all\'">', 'stylesheet', esc_url( $href ) );
			printf( '<noscript><link rel="%1$s" href="%2$s"></noscript>', 'stylesheet', esc_url( $href ) );
		}

		/**
		 * Add dns-prefetch to font origins.
		 *
		 * @since  1.0.0
		 * @param  array  $urls          URLs.
		 * @param  string $relation_type Relation type.
		 * @return array
		 */
		public function prefetch_font_origins( $urls, $relation_type ) {
			if ( 'dns-prefetch' === $relation_type ) {
				$urls = array_merge( $urls, $this->font_urls );
			}
			return $urls;
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
}

ColorWings::get_instance();
