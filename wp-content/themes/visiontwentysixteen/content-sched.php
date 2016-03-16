<!-- content-sched start -->
<div class="main-section data-post-<?php echo $postCount ?>">
	<div class="container schedule">
		<div class="row no-gutters">
			<div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">
				<?php include('show-block-title.php') ?>
				<p>
					<?php echo nl2br(strip_tags(get_post_meta($postID, 'content', true))); ?>
				</p>
			</div>
			<?php echo do_shortcode(get_the_content($postID)); ?>
		</div>
	</div>
</div>
<!-- content-sched end -->