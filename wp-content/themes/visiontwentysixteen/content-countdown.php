<!-- content-banner start -->
<div class="countdown">
	<div class="container">
		<div class="row no-gutters">
			<div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
				<h2><?php echo strip_tags(the_content()); ?></h2>
			</div>
			<div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
				<div class="timer">
					<?php 
						// server-side timer
						// date_default_timezone_set('America/Los_Angeles'); // CDT
						$target =  strip_tags(get_post_meta($postID, 'target_time_and_date', true));
						$date = strtotime($target);
						$remaining = $date - time();
						$days_remaining = floor($remaining / 86400);
						$hours_remaining = floor(($remaining % 86400) / 3600);
						$min_remaining = floor(($remaining % 3600) / 60);
						$sec_remaining = ($remaining % 60);
						if($days_remaining < 10){
							$days_remaining = "0".$days_remaining;
						}
						if($hours_remaining < 10){
							$hours_remaining = "0".$hours_remaining;
						}
						if($min_remaining < 10){
							$min_remaining = "0".$min_remaining;
						}
						if($sec_remaining < 10){
							$sec_remaining = "0".$sec_remaining;
						}
					?>
					<div class="active-timer" data-target-date="<?php echo $target ?>" data-server-time="<?php echo date('Y/m/d H:i:s'); ?>">
						<span class="days"><?php echo $days_remaining ?></span>
						<span class="hrs"><?php echo $hours_remaining ?></span>
						<span class="min"><?php echo $min_remaining ?></span>
						<span class="sec"><?php echo $sec_remaining ?></span>
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