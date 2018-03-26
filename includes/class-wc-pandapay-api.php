<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * WC_Pandapay_API class.
 *
 * Communicates with Panda Pay API.
 */
class WC_Pandapay_API {

	/**
	 * Panda Pay API Endpoint
	 */
	const ENDPOINT = 'https://api.pandapay.io/v1/';

	/**
	 * Secret API Key.
	 * @var string
	 */
	private static $secret_key = '';

	/**
	 * Set secret API Key.
	 * @param string $key
	 */
	public static function set_secret_key( $secret_key ) {
		self::$secret_key = $secret_key;
	}

	/**
	 * Get secret key.
	 * @return string
	 */
	public static function get_secret_key() {
		if ( ! self::$secret_key ) {
			$options = get_option( 'woocommerce_pandapay_settings' );

			if ( isset( $options['testmode'], $options['secret_key'], $options['test_secret_key'] ) ) {
				self::set_secret_key( 'yes' === $options['testmode'] ? $options['test_secret_key'] : $options['secret_key'] );
			}
		}
		return self::$secret_key;
	}

	/**
	 * Send the request to Panda Pay's API
	 *
	 * @param array $request
	 * @param string $api
	 * @return array|WP_Error
	 */
	public static function request( $request, $api = 'donations', $method = 'POST' ) {
		self::log( "{$api} request: " . print_r( $request, true ) );

		$response = wp_safe_remote_post(
			self::ENDPOINT . $api,
			array(
				'method'        => $method,
				'headers'       => array(
					'Authorization'  => 'Basic ' . base64_encode( self::get_secret_key() . ':' )
				),
				'body'       => apply_filters( 'woocommerce_pandapay_request_body', $request, $api ),
				'timeout'    => 70,
				'user-agent' => 'WooCommerce ' . WC()->version,
			)
		);

		if ( is_wp_error( $response ) || empty( $response['body'] ) ) {
			self::log( 'Error Response: ' . print_r( $response, true ) );
			return new WP_Error( 'pandapay_error', __( 'There was a problem connecting to the payment gateway.', 'woocommerce-gateway-pandapay' ) );
		}

		$parsed_response = json_decode( $response['body'] );

		// Handle response
		if ( ! empty( $parsed_response->error ) ) {
			if ( ! empty( $parsed_response->error->code ) ) {
				$code = $parsed_response->error->code;
			} else {
				$code = 'pandapay_error';
			}
			return new WP_Error( $code, $parsed_response->error->message );
		} else {
			return $parsed_response;
		}
	}

	/**
	 * Logs
	 *
	 * @since 3.1.0
	 * @version 3.1.0
	 *
	 * @param string $message
	 */
	public static function log( $message ) {
		$options = get_option( 'woocommerce_pandapay_settings' );

		if ( 'yes' === $options['logging'] ) {
			error_log( 'class-wc-pandapay-api.php' );
			error_log( $message );
		}
	}
}
