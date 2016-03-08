<?php
	function load_css(){
		wp_enqueue_style('style', get_stylesheet_uri());
	}

	add_action('wp_enqueue_scripts','load_css');

	// show admin_bar for admin users only; hide on all front-end pages
	add_filter('show_admin_bar', '__return_false');

	// Removing emoji
	remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
	remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
	remove_action( 'wp_print_styles', 'print_emoji_styles' );
	remove_action( 'admin_print_styles', 'print_emoji_styles' );
?>