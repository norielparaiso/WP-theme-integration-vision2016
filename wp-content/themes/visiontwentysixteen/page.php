<?php get_header(); ?>

<?php 
	if( have_posts() ) :
		// Start the Loop.
		echo '<div class="tab-content active" id="con_2016"> <div class="container">';
			while (have_posts()) : the_post();
				if(has_post_thumbnail($thisPageID)){
					$image = wp_get_attachment_image_src(get_post_thumbnail_id($thisPageID), 'single-post-thumbnail');
					echo "<img src='".$image[0]."'>";
				}
				echo "<h1>";
					the_title();
				echo "</h1>";
				the_content();
			endwhile;
		echo '</div> </div>';
	else :
		include('content-noposts.php');
	endif;
?>

<?php get_footer(); ?>