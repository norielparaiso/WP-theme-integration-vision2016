<?php get_header(); ?>

<?php 
	if( have_posts() ) :
		// Start the Loop.
		echo '<div class="tab-content active" id="con_2016"> <div class="container">';
			while (have_posts()) : the_post();
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