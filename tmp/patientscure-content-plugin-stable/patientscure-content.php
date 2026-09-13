<?php
/**
 * Plugin Name: PatientScure Content
 * Description: Registers the Disease, Remedy, and Ingredient content types for the PatientScure headless WordPress site.
 * Version: 1.0.0
 * Author: PatientScure
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

function patientscure_register_content_types() {
    $types = array(
        'disease' => array(
            'label' => __( 'Diseases', 'patientscure' ),
            'labels' => array(
                'name' => __( 'Diseases', 'patientscure' ),
                'singular_name' => __( 'Disease', 'patientscure' ),
                'add_new_item' => __( 'Add New Disease', 'patientscure' ),
            ),
            'public' => true,
            'show_ui' => true,
            'show_in_rest' => true,
            'rest_base' => 'disease',
            'has_archive' => true,
            'supports' => array( 'title', 'editor', 'excerpt', 'thumbnail', 'revisions' ),
            'menu_icon' => 'dashicons-heart',
        ),
        'remedy' => array(
            'label' => __( 'Remedies', 'patientscure' ),
            'labels' => array(
                'name' => __( 'Remedies', 'patientscure' ),
                'singular_name' => __( 'Remedy', 'patientscure' ),
                'add_new_item' => __( 'Add New Remedy', 'patientscure' ),
            ),
            'public' => true,
            'show_ui' => true,
            'show_in_rest' => true,
            'rest_base' => 'remedy',
            'has_archive' => true,
            'supports' => array( 'title', 'editor', 'excerpt', 'thumbnail', 'revisions' ),
            'menu_icon' => 'dashicons-leaf',
        ),
        'ingredient' => array(
            'label' => __( 'Ingredients', 'patientscure' ),
            'labels' => array(
                'name' => __( 'Ingredients', 'patientscure' ),
                'singular_name' => __( 'Ingredient', 'patientscure' ),
                'add_new_item' => __( 'Add New Ingredient', 'patientscure' ),
            ),
            'public' => true,
            'show_ui' => true,
            'show_in_rest' => true,
            'rest_base' => 'ingredient',
            'has_archive' => true,
            'supports' => array( 'title', 'editor', 'excerpt', 'thumbnail', 'revisions' ),
            'menu_icon' => 'dashicons-admin-site-alt3',
        ),
    );

    foreach ( $types as $slug => $args ) {
        register_post_type( $slug, $args );
    }
}
add_action( 'init', 'patientscure_register_content_types' );


// Keep the plugin minimal and stable.
// The custom post types are enough for the headless API; custom meta can be added later
// via ACF or a dedicated schema-aware meta registration hook.
