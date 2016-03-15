<!-- index.php start -->
<?php get_header(); ?>

<?php include('content-tabs.php') ?>

<?php 
	if(have_posts()):
		// Start the Loop.
		$postCount = -1;
		echo '<div class="tab-content active" id="con_2016">';
			while (have_posts()) : the_post();
				$tags = wp_get_post_tags($post->ID);
				$postID = $post->ID;
				switch($tags[0]->name){
					case "Hero Banner":
						include "content-banner.php";
						break;
					case "Countdown":
						include "content-countdown.php";
						break;
					case "Intro":
						include "content-intro.php";
						break;
					case "Thumbnails":
						include "content-thumbs.php";
						break;
					default:
						the_title();
						the_content();
						break;
				}
				$postCount++;
			endwhile;
		echo '</div>';
	else :
		include('content-noposts.php');
	endif;
?>

<?php get_footer(); ?>
<!-- index.php end -->