<?php
	function load_css(){
		wp_enqueue_style('style', get_stylesheet_uri());
	}
	function revcon_change_post_label() {
		global $menu;
		global $submenu;
		$menu[5][0] = 'Sections';
		$submenu['edit.php'][5][0] = 'Sections';
		$submenu['edit.php'][10][0] = 'Add a section';
		$submenu['edit.php'][16][0] = 'Sections Tags';
		echo '';
	}
	function revcon_change_post_object() {
		global $wp_post_types;
		$labels = &$wp_post_types['post']->labels;
		$labels->name = 'Sections';
		$labels->singular_name = 'Sections';
		$labels->add_new = 'Add a section';
		$labels->add_new_item = 'Add a section';
		$labels->edit_item = 'Edit Section';
		$labels->new_item = 'Sections';
		$labels->view_item = 'View Section';
		$labels->search_items = 'Search Sections';
		$labels->not_found = 'No Sections found';
		$labels->not_found_in_trash = 'No Sections found in Trash';
		$labels->all_items = 'All Sections';
		$labels->menu_name = 'Sections';
		$labels->name_admin_bar = 'Sections';
	}
	function remove_menus(){
		// remove_menu_page( 'index.php' );                  //Dashboard
		// remove_menu_page( 'edit.php' );                   //Posts
		// remove_menu_page( 'upload.php' );                 //Media
		// remove_menu_page( 'edit.php?post_type=page' );    //Pages
		remove_menu_page( 'edit-comments.php' );          //Comments
		// remove_menu_page( 'themes.php' );                 //Appearance
		// remove_menu_page( 'plugins.php' );                //Plugins
		// remove_menu_page( 'users.php' );                  //Users
		remove_menu_page( 'tools.php' );                  //Tools
		// remove_menu_page( 'options-general.php' );        //Settings
		remove_menu_page( 'admin.php');   //contact
	}
	function visionSetup(){
		// menus
		register_nav_menus(array(
			'footer-about-1' => __('Column 1'),
			'footer-about-2' => __('Column 2'),
			'footer-provide' => __('Column 3'),
			'footer-supports' => __('Column 4'),
			'footer-menu' => __('Footer Menu')
		));

		// add feature image support
		add_theme_support('post-thumbnails');

		// show admin_bar for admin users only; hide on all front-end pages
		add_filter('show_admin_bar', '__return_false');

		// Removing emoji
		remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
		remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
		remove_action( 'wp_print_styles', 'print_emoji_styles' );
		remove_action( 'admin_print_styles', 'print_emoji_styles' );
	}

	// load style.css
	add_action('wp_enqueue_scripts','load_css');

	// admin rename posts to sections
	add_action( 'admin_menu', 'revcon_change_post_label' );
	add_action( 'init', 'revcon_change_post_object' );
	// admin hide menu items
	add_action( 'admin_menu', 'remove_menus' );

	add_action('after_setup_theme','visionSetup');
?>