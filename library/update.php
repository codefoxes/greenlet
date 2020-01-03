<?php
/**
 * Theme update functions.
 */

set_site_transient('update_themes', null);

global $theme_base, $api_url;

// Set theme base and api link global vars.
$theme_base	= get_option('template');
$api_url	= 'http://codefoxes.com/api/greenlet-updater/';

add_filter( 'pre_set_site_transient_update_themes', 'check_for_update' );

/**
 * Checks for theme update.
 * @param  object	$checked_data
 * @return object	update check data
 */
function check_for_update( $checked_data ) {

	global $wp_version, $theme_base, $api_url;

	$request = array( 'slug'=> $theme_base, 'version' => CIRCLE_VERSION );

	// Start checking for an update
	$update_check = array(
		'body' => array(
			'action'	=> 'theme_update',
			'request'	=> serialize( $request ),
			'api-key'	=> md5( home_url() )
		),
		'user-agent' => 'WordPress/' . $wp_version . '; ' . home_url()
	);

	$raw_response = wp_remote_post( $api_url, $update_check );

	if ( ! is_wp_error( $raw_response ) && ( $raw_response['response']['code'] == 200 ) )
		$response = unserialize( $raw_response['body'] );

	// Feed the update data into WP updater
	if ( ! empty( $response ) )
		$checked_data->response[ $theme_base ] = $response;

	return $checked_data;
}

// Take over the Theme info screen on WP multisite
add_filter( 'themes_api', 'greenlet_theme_api', 10, 3 );

function greenlet_theme_api( $def, $action, $args ) {
	global $theme_base, $api_url;

	if ( $args->slug != $theme_base )
		return false;

	// Get the current version
	$args->version	= CIRCLE_VERSION;
	$request_string	= prepare_request( $action, $args );
	$request		= wp_remote_post( $api_url, $request_string );

	if ( is_wp_error( $request ) ) {
		$res = new WP_Error( 'themes_api_failed', __( 'API request error.</p> <p><a href="?" onclick="document.location.reload(); return false;">Try again</a>', 'greenlet' ), $request->get_error_message() );
	} else {
		$res = unserialize( $request['body'] );

		if ( $res === false )
			$res = new WP_Error( 'themes_api_failed', __( 'An unknown error occurred', 'greenlet' ), $request['body'] );
	}

	return $res;
}

get_transient('update_themes');
