<!-- content-thumbs start -->
<div class="main-section data-post-<?php echo $postCount ?>">
	<div class="container thumbnails">
		<div class="row no-gutters">
			<div class="col-xs-12">
				<?php include('show-block-title.php') ?>
			</div>
			<?php 
				if(trim(get_the_content($postID)) != "" ){ 
					echo do_shortcode(get_the_content($postID)); 
				}
			?>
		</div>
	</div>
</div>
<!-- content-thumbs end -->