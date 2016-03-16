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
	// CUSTOMIZE ADMIN MENU ORDER
	function custom_menu_order($menu_ord) {
	    if (!$menu_ord) return true;
	    return array(
		    'index.php', // this represents the dashboard link
		    'edit.php', //the posts tab
		    'edit.php?post_type=page', //the page tab
		    'upload.php', // the media manager
		);
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
		// remove_menu_page( 'admin.php');   //contact
		remove_submenu_page('edit.php', 'edit-tags.php?taxonomy=category');  // categories
	}

	// get the content of the specified page (ID defined in sections) in Pages
	function getPageContent($thisPageID,$type){
		if(!is_numeric($thisPageID)){
			return;
		}
		global $wpdb;
		$sql_query = 'SELECT DISTINCT * FROM ' . $wpdb->posts .' WHERE ' . $wpdb->posts . '.ID=' . $thisPageID;
		$posts = $wpdb->get_results($sql_query);
		$content = "";
		switch ($type) {
			case 'title':
				$content = strip_tags(get_the_title($thisPageID));
				break;
			case 'content':
				if(!empty($posts)){
					foreach($posts as $post)
					{
						$content = nl2br(strip_tags($post->post_content, '<br><strong><a><em><b><i><u>'));
					}
				}
				break;
			case 'image':
				if(has_post_thumbnail($thisPageID)){
					$image = wp_get_attachment_image_src(get_post_thumbnail_id($thisPageID), 'single-post-thumbnail');
					$content = $image[0];
				}
				break;
			case 'date':
				$content = strip_tags(get_post_meta($thisPageID, 'event_date', true));
				break;
			case 'label':
				$content = strip_tags(get_post_meta($thisPageID, 'link_label', true));
				break;
			case 'url':
				$content = strip_tags(get_post_meta($thisPageID, 'link_url', true));
				break;
			case 'facebook':
				$content = strip_tags(get_post_meta($thisPageID, 'facebook', true));
				break;
			case 'linkedin':
				$content = strip_tags(get_post_meta($thisPageID, 'linkedin', true));
				break;
			case 'spiceworks':
				$content = strip_tags(get_post_meta($thisPageID, 'spiceworks', true));
				break;
			case 'twitter':
				$content = strip_tags(get_post_meta($thisPageID, 'twitter', true));
				break;
		}
		return $content;
	}

	// Replaced WP [caption] tag
	function caption_shortcode($attributes, $content=''){
		// var_dump($attributes, $content);
		$preWrapper = '<div class="col-xs-12 col-sm-6 col-md-3 col-lg-3"><div class="thumb"><div class="picture">';
		$content = str_replace("<strong>", '</div><div class="info"><p><strong>', $content);
		$content = str_replace("<img", '<img draggable="false"', $content);
		$postWrapper = '</p></div></div></div>';
		return $preWrapper.$content.$postWrapper;
	}
	// custom shortcode schedule table
	function sched_shortcode($attributes, $content=''){
		$preWrapper = '<div class="col-xs-12 col-sm-6 col-md-4 col-lg-4"><div class="sched-card">';
		$postWrapper = '</div></div>';
		return $preWrapper.$content.$postWrapper;
	}
	// vision init
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

		// Enable the use of shortcodes in text widgets.
		add_filter('schedule', 'do_shortcode');

		// Registering shortcodes
		add_shortcode('caption', 'caption_shortcode');
		add_shortcode('schedule', 'sched_shortcode');
		add_shortcode('info', 'info_shortcode');
	}

	// load style.css
	add_action('wp_enqueue_scripts','load_css');

	// admin rename posts to sections
	add_action( 'admin_menu', 'revcon_change_post_label' );
	add_action( 'init', 'revcon_change_post_object' );
	// admin hide menu items
	add_action( 'admin_menu', 'remove_menus' );
	// reorder admin tools
	add_filter('custom_menu_order', 'custom_menu_order');
	add_filter('menu_order', 'custom_menu_order');

	add_action('after_setup_theme','visionSetup');
?>