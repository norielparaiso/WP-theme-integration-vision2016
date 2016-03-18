<!-- content-banner start -->
<div class="countdown">
	<div class="container">
		<div class="row no-gutters">
			<div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
				<h2><?php echo strip_tags(the_content()); ?></h2>
			</div>
			<div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
				<div class="timer">
					<div class="active-timer" data-target-date="<?php echo strip_tags(get_post_meta($postID, 'target_time_and_date', true)); ?>">
						<span class="days">00</span>
						<span class="hrs">00</span>
						<span class="min">00</span>
						<span class="sec">00</span>
					</div>
					<span class="timer-link">
						<a href="<?php echo strip_tags(get_post_meta($postID, 'link_url', true)); ?>" class="add-to-cal">
							<?php echo strip_tags(get_post_meta($postID, 'link_label', true)); ?>
						</a>
					</span>
				</div>
			</div>
		</div>
	</div>
</div>
<!-- content-banner end -->