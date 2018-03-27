<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

return apply_filters( 'wc_pandapay_settings',
	array(
		'enabled' => array(
			'title'       => __( 'Enable/Disable', 'woocommerce-gateway-pandapay' ),
			'label'       => __( 'Enable Panda Pay', 'woocommerce-gateway-pandapay' ),
			'type'        => 'checkbox',
			'description' => '',
			'default'     => 'no',
		),
		'testmode' => array(
			'title'       => __( 'Test mode', 'woocommerce-gateway-pandapay' ),
			'label'       => __( 'Enable Test Mode', 'woocommerce-gateway-pandapay' ),
			'type'        => 'checkbox',
			'description' => __( 'Place the payment gateway in test mode using test API keys.', 'woocommerce-gateway-pandapay' ),
			'default'     => 'yes',
			'desc_tip'    => true,
		),
		'title' => array(
			'title'       => __( 'Title', 'woocommerce-gateway-pandapay' ),
			'type'        => 'text',
			'description' => __( 'This controls the title which the user sees during checkout.', 'woocommerce-gateway-pandapay' ),
			'default'     => __( 'Credit Card (Panda Pay)', 'woocommerce-gateway-pandapay' ),
			'desc_tip'    => true,
		),
		'description' => array(
			'title'       => __( 'Description', 'woocommerce-gateway-pandapay' ),
			'type'        => 'text',
			'description' => __( 'This controls the description which the user sees during checkout.', 'woocommerce-gateway-pandapay' ),
			'default'     => __( 'Pay with your credit card via Panda Pay.', 'woocommerce-gateway-pandapay' ),
			'desc_tip'    => true,
		),
		'test_publishable_key' => array(
			'title'       => __( 'Test Publishable Key', 'woocommerce-gateway-pandapay' ),
			'type'        => 'text',
			'description' => __( 'Get your API keys from your pandapay account.', 'woocommerce-gateway-pandapay' ),
			'default'     => '',
			'desc_tip'    => true,
		),
		'test_secret_key' => array(
			'title'       => __( 'Test Secret Key', 'woocommerce-gateway-pandapay' ),
			'type'        => 'text',
			'description' => __( 'Get your API keys from your pandapay account.', 'woocommerce-gateway-pandapay' ),
			'default'     => '',
			'desc_tip'    => true,
		),
		'publishable_key' => array(
			'title'       => __( 'Live Publishable Key', 'woocommerce-gateway-pandapay' ),
			'type'        => 'text',
			'description' => __( 'Get your API keys from your pandapay account.', 'woocommerce-gateway-pandapay' ),
			'default'     => '',
			'desc_tip'    => true,
		),
		'secret_key' => array(
			'title'       => __( 'Live Secret Key', 'woocommerce-gateway-pandapay' ),
			'type'        => 'text',
			'description' => __( 'Get your API keys from your pandapay account.', 'woocommerce-gateway-pandapay' ),
			'default'     => '',
			'desc_tip'    => true,
		),
		'panda_js' => array(
			'title'       => __( 'PandaJS', 'woocommerce-gateway-pandapay' ),
			'type'        => 'text',
			'description' => __( 'Panda Javascript Source', 'woocommerce-gateway-pandapay' ),
			'default'     => '',
			'desc_tip'    => true,
		),
		'algolia_api_key' => array(
			'title'       => __( 'Algolia API Key', 'woocommerce-gateway-pandapay' ),
			'type'        => 'text',
			'description' => __( 'Authenticates the enpoint. As a Platform, you will only have access to a search-only API Key.', 'woocommerce-gateway-pandapay' ),
			'default'     => '',
			'desc_tip'    => true,
		),
		'algolia_application_id' => array(
			'title'       => __( 'Algolia Application ID', 'woocommerce-gateway-pandapay' ),
			'type'        => 'text',
			'description' => __( 'Identifies which application you are accessing', 'woocommerce-gateway-pandapay' ),
			'default'     => '',
			'desc_tip'    => true,
		),
		'destination_ein' => array(
			'title'       => __( 'Destination EIN', 'woocommerce-gateway-pandapay' ),
			'type'        => 'text',
			'description' => __( '9-digit EIN of the charity to grant to.', 'woocommerce-gateway-pandapay' ),
			'default'     => '',
			'desc_tip'    => true,
		),
		'platform_fee' => array(
			'title'       => __( 'Platform Fee', 'woocommerce-gateway-pandapay' ),
			'type'        => 'text',
			'description' => __( 'Any fees, in cents, that you want to collect as revenue for your platform.', 'woocommerce-gateway-pandapay' ),
			'default'     => '',
			'desc_tip'    => true,
		),
		'statement_descriptor' => array(
			'title'       => __( 'Statement Descriptor', 'woocommerce-gateway-pandapay' ),
			'type'        => 'text',
			'description' => __( 'Extra information about a charge. This will appear on your customer’s credit card statement.', 'woocommerce-gateway-pandapay' ),
			'default'     => '',
			'desc_tip'    => true,
		),
		'capture' => array(
			'title'       => __( 'Capture', 'woocommerce-gateway-pandapay' ),
			'label'       => __( 'Capture charge immediately', 'woocommerce-gateway-pandapay' ),
			'type'        => 'checkbox',
			'description' => __( 'Whether or not to immediately capture the charge. When unchecked, the charge issues an authorization and will need to be captured later. Uncaptured charges expire in 7 days.', 'woocommerce-gateway-pandapay' ),
			'default'     => 'yes',
			'desc_tip'    => true,
		),
		'logging' => array(
			'title'       => __( 'Logging', 'woocommerce-gateway-pandapay' ),
			'label'       => __( 'Log debug messages', 'woocommerce-gateway-pandapay' ),
			'type'        => 'checkbox',
			'description' => __( 'Save debug messages to the WooCommerce System Status log.', 'woocommerce-gateway-pandapay' ),
			'default'     => 'no',
			'desc_tip'    => true,
		),
	)
);
