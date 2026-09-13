<?php
namespace AngieSnippets\DesiNuskha_44349211;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

class Desi_Nuskha_CPT_44349211 {

    public function __construct() {
        add_action( 'init', [ $this, 'register_cpt' ] );
    }

    public function register_cpt() {
        $labels = [
            'name'                  => _x( 'Desi Nuskhe', 'Post Type General Name', 'angie-snippets' ),
            'singular_name'         => _x( 'Desi Nuskha', 'Post Type Singular Name', 'angie-snippets' ),
            'menu_name'             => __( 'Desi Nuskhe', 'angie-snippets' ),
            'name_admin_bar'        => __( 'Desi Nuskha', 'angie-snippets' ),
            'archives'              => __( 'Desi Nuskha Archives', 'angie-snippets' ),
            'attributes'            => __( 'Desi Nuskha Attributes', 'angie-snippets' ),
            'parent_item_colon'     => __( 'Parent Desi Nuskha:', 'angie-snippets' ),
            'all_items'             => __( 'All Desi Nuskhe', 'angie-snippets' ),
            'add_new_item'          => __( 'Add New Desi Nuskha', 'angie-snippets' ),
            'add_new'               => __( 'Add New', 'angie-snippets' ),
            'new_item'              => __( 'New Desi Nuskha', 'angie-snippets' ),
            'edit_item'             => __( 'Edit Desi Nuskha', 'angie-snippets' ),
            'update_item'           => __( 'Update Desi Nuskha', 'angie-snippets' ),
            'view_item'             => __( 'View Desi Nuskha', 'angie-snippets' ),
            'view_items'            => __( 'View Desi Nuskhe', 'angie-snippets' ),
            'search_items'          => __( 'Search Desi Nuskha', 'angie-snippets' ),
            'not_found'             => __( 'Not found', 'angie-snippets' ),
            'not_found_in_trash'    => __( 'Not found in Trash', 'angie-snippets' ),
            'featured_image'        => __( 'Featured Image', 'angie-snippets' ),
            'set_featured_image'    => __( 'Set featured image', 'angie-snippets' ),
            'remove_featured_image' => __( 'Remove featured image', 'angie-snippets' ),
            'use_featured_image'    => __( 'Use as featured image', 'angie-snippets' ),
            'insert_into_item'      => __( 'Insert into Desi Nuskha', 'angie-snippets' ),
            'uploaded_to_this_item' => __( 'Uploaded to this Desi Nuskha', 'angie-snippets' ),
            'items_list'            => __( 'Desi Nuskhe list', 'angie-snippets' ),
            'items_list_navigation' => __( 'Desi Nuskhe list navigation', 'angie-snippets' ),
            'filter_items_list'     => __( 'Filter Desi Nuskhe list', 'angie-snippets' ),
        ];
        
        $args = [
            'label'                 => __( 'Desi Nuskha', 'angie-snippets' ),
            'description'           => __( 'Custom Post Type for Desi Nuskhe', 'angie-snippets' ),
            'labels'                => $labels,
            'supports'              => [ 'title', 'editor', 'thumbnail', 'excerpt', 'comments', 'revisions' ],
            'taxonomies'            => [ 'category', 'post_tag' ],
            'hierarchical'          => false,
            'public'                => true,
            'show_ui'               => true,
            'show_in_menu'          => true,
            'menu_position'         => 5,
            'menu_icon'             => 'dashicons-heart',
            'show_in_admin_bar'     => true,
            'show_in_nav_menus'     => true,
            'can_export'            => true,
            'has_archive'           => true,
            'exclude_from_search'   => false,
            'publicly_queryable'    => true,
            'capability_type'       => 'post',
            'show_in_rest'          => true,
        ];
        
        register_post_type( 'desi_nuskha', $args );
    }
}

new Desi_Nuskha_CPT_44349211();
