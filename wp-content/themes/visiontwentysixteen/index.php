<?php get_header(); ?>

<?php 
	if( have_posts() ) :
		// Start the Loop.
		while (have_posts()) : the_post();
			the_title();
			the_content();
		endwhile;
	else :
		echo "No posts available.";
	endif;
?>

<?php get_footer(); ?>