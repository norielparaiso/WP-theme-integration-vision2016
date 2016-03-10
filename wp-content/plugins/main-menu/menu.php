<?php

/*
  Plugin Name: PCM Main Menu
  Plugin URI: PCM
  Description: PCM Blog main menu
  Version: 3.0.2
  Author: Fejt Emerson
  Author URI:
 */
function loadScripts() {
    wp_enqueue_style('main-menu', WP_PLUGIN_URL . '/main-menu/css/main-menu.css');
    
    wp_enqueue_script('jquery.velocity', WP_PLUGIN_URL . '/main-menu/js/jquery.velocity.min.js', array('jquery'), '', false);
    
    wp_enqueue_script('main-menu-expanded', WP_PLUGIN_URL . '/main-menu/js/main-menu-expanded.js', array('jquery'), '', false);
    wp_enqueue_script('main-menu', WP_PLUGIN_URL . '/main-menu/js/main-menu.js', array('jquery'), '', false);
    wp_enqueue_script('change-homepage', WP_PLUGIN_URL . '/main-menu/js/change-homepage.js', array('jquery'), '', false);
    wp_enqueue_script('toolTip', WP_PLUGIN_URL . '/main-menu/js/tooltipedit.js', array('jquery'), '', false);
    wp_enqueue_script('sidemenu', WP_PLUGIN_URL . '/main-menu/js/sidemenu.js', array('jquery'), '', false);
}
add_action('wp_head', 'loadScripts', 0);
function loadToFooter() {
    wp_enqueue_script('script-loader', WP_PLUGIN_URL . '/main-menu/js/loader.js', array('jquery'), '', false);
}
add_action('wp_footer', 'loadToFooter', 0);

function add_main_menu() {
    include 'main-menu.php';
}

function add_side_menu() {
    include 'side-menu.php';
}


?>
