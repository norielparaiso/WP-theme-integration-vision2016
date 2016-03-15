<!DOCTYPE HTML>
<!--[if IE 7]>
<html class="ie ie7" <?php language_attributes(); ?>>
<![endif]-->
<!--[if IE 8]>
<html class="ie ie8" <?php language_attributes(); ?>>
<![endif]-->
<!--[if !(IE 7) & !(IE 8)]><!-->
<html <?php language_attributes(); ?>>
<!--<![endif]-->
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
	<title><?php bloginfo('name');?></title>
	<link rel="shortcut icon" href="//pcm.com/mall/widgetti/images/trackingScripts/pcmall.ico">

	<!-- TODO METAs & refs here! -->
	
	<link rel="stylesheet" href="<?php bloginfo('template_url'); ?>/css/bootstrap.min.css">
	<link rel="stylesheet" href="<?php bloginfo('template_url'); ?>/css/footer.css">

	<script src="<?php bloginfo('template_url'); ?>/js/jquery-1.11.0.min.js"></script>
	<script src="<?php bloginfo('template_url'); ?>/js/jquery.validate.min.js"></script>
	<script src="<?php bloginfo('template_url'); ?>/js/velocity.min.js"></script>
	<script src="<?php bloginfo('template_url'); ?>/js/bootstrap.min.js"></script>
	<script src="<?php bloginfo('template_url'); ?>/js/modernizr3.js"></script>
	<script src="<?php bloginfo('template_url'); ?>/js/modernizr3.js"></script>
	
	<script src="<?php bloginfo('template_url'); ?>/js/trunk8.min.js"></script>
	<script src="<?php bloginfo('template_url'); ?>/js/jquery.countdown.min.js"></script>
	<script type="text/javascript" src="//www.youtube.com/player_api"></script>
	<script type="text/javascript" src="//maps.google.com/maps/api/js?key=AIzaSyAp8sLdQYr8jXZTrEvcPGDnywykf_BV0hI&amp;language=en"></script>
	<script src="<?php bloginfo('template_url'); ?>/js/gmap3.min.js"></script>
	<script src="<?php bloginfo('template_url'); ?>/js/debouncedresize.min.js"></script>
	<script src="<?php bloginfo('template_url'); ?>/js/visibility.min.js"></script>
	<script src="<?php bloginfo('template_url'); ?>/js/footer.js"></script>
	<script src="<?php bloginfo('template_url'); ?>/js/main.js"></script>
	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
	<!-- plug-in main-menu start -->
	<?php 
		if(function_exists('add_main_menu')) {
			add_main_menu();
		}
	?>
	<!-- plug-in main-menu end -->
	<!-- header.php end -->