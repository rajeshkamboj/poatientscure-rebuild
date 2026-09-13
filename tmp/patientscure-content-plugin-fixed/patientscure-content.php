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

function patientscure_register_content_meta() {
    $meta_fields = array(
        'disease' => array(
            'common_names' => array( 'type' => 'array', 'single' => false, 'items' => 'string' ),
            'summary' => array( 'type' => 'string', 'single' => true ),
            'last_updated' => array( 'type' => 'string', 'single' => true ),
            'author' => array( 'type' => 'string', 'single' => true ),
            'reviewer' => array( 'type' => 'string', 'single' => true ),
            'prevalence' => array( 'type' => 'string', 'single' => true ),
            'age_group' => array( 'type' => 'string', 'single' => true ),
            'gender' => array( 'type' => 'string', 'single' => true ),
            'symptoms' => array( 'type' => 'array', 'single' => false, 'items' => 'string' ),
            'causes' => array( 'type' => 'array', 'single' => false, 'items' => 'string' ),
            'ayurvedic_perspective' => array( 'type' => 'string', 'single' => true ),
            'diet' => array( 'type' => 'array', 'single' => false, 'items' => 'string' ),
            'lifestyle' => array( 'type' => 'array', 'single' => false, 'items' => 'string' ),
            'precautions' => array( 'type' => 'array', 'single' => false, 'items' => 'string' ),
            'when_to_seek_medical_care' => array( 'type' => 'string', 'single' => true ),
            'faq' => array( 'type' => 'array', 'single' => false, 'items' => 'object' ),
            'references' => array( 'type' => 'array', 'single' => false, 'items' => 'string' ),
            'related_diseases' => array( 'type' => 'array', 'single' => false, 'items' => 'string' ),
            'related_remedies' => array( 'type' => 'array', 'single' => false, 'items' => 'string' ),
            'related_ingredients' => array( 'type' => 'array', 'single' => false, 'items' => 'string' ),
        ),
        'remedy' => array(
            'purpose' => array( 'type' => 'string', 'single' => true ),
            'ingredients' => array( 'type' => 'array', 'single' => false, 'items' => 'object' ),
            'preparation' => array( 'type' => 'string', 'single' => true ),
            'how_to_use' => array( 'type' => 'string', 'single' => true ),
            'timing' => array( 'type' => 'string', 'single' => true ),
            'frequency' => array( 'type' => 'string', 'single' => true ),
            'duration' => array( 'type' => 'string', 'single' => true ),
            'who_should_avoid' => array( 'type' => 'array', 'single' => false, 'items' => 'string' ),
            'references' => array( 'type' => 'array', 'single' => false, 'items' => 'string' ),
        ),
        'ingredient' => array(
            'common_names' => array( 'type' => 'array', 'single' => false, 'items' => 'string' ),
            'hindi_name' => array( 'type' => 'string', 'single' => true ),
            'punjabi_name' => array( 'type' => 'string', 'single' => true ),
            'description' => array( 'type' => 'string', 'single' => true ),
            'traditional_uses' => array( 'type' => 'array', 'single' => false, 'items' => 'string' ),
            'preparation' => array( 'type' => 'array', 'single' => false, 'items' => 'string' ),
            'precautions' => array( 'type' => 'array', 'single' => false, 'items' => 'string' ),
            'related_remedies' => array( 'type' => 'array', 'single' => false, 'items' => 'string' ),
            'related_diseases' => array( 'type' => 'array', 'single' => false, 'items' => 'string' ),
        ),
    );

    foreach ( $meta_fields as $post_type => $fields ) {
        foreach ( $fields as $meta_key => $config ) {
            $rest_schema = array(
                'type' => $config['type'],
            );

            if ( 'array' === $config['type'] ) {
                $rest_schema = array(
                    'type' => 'array',
                    'items' => array(
                        'type' => 'string',
                    ),
                );

                if ( 'object' === $config['items'] ) {
                    $rest_schema['items'] = array(
                        'type' => 'object',
                        'properties' => array(
                            'item' => array( 'type' => 'string' ),
                            'quantity' => array( 'type' => 'string' ),
                            'question' => array( 'type' => 'string' ),
                            'answer' => array( 'type' => 'string' ),
                        ),
                        'additionalProperties' => true,
                    );
                }
            }

            register_post_meta(
                $post_type,
                $meta_key,
                array(
                    'show_in_rest' => array(
                        'schema' => $rest_schema,
                    ),
                    'single' => $config['single'],
                    'type' => $config['type'],
                    'default' => $config['single'] ? '' : array(),
                    'sanitize_callback' => function ( $value ) {
                        return is_array( $value ) ? array_map( 'sanitize_text_field', $value ) : sanitize_text_field( $value );
                    },
                    'auth_callback' => function () {
                        return current_user_can( 'edit_posts' );
                    },
                )
            );
        }
    }
}
add_action( 'init', 'patientscure_register_content_meta' );
