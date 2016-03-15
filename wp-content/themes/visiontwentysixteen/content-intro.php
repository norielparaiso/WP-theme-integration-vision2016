<!-- content-intro start -->
<div class="main-section data-post-<?php echo $postCount ?>">
	<div class="container headline">
		<div class="row no-gutters">
			<div class="col-xs-12">
				<h2>
					<?php echo str_replace("*","<span>",str_replace("**","</span>",get_the_title($postID))); ?>
				</h2>
				<p>
					<?php echo nl2br(strip_tags(get_the_content($postID))); ?>
				</p>
			</div>
		</div>
	</div>
</div>
<!-- content-intro end -->