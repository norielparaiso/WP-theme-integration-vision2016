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
						// GET server-side timer
						$ch = curl_init();
						curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
						curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
						curl_setopt($ch, CURLOPT_URL, 'http://cmws.cc-inc.com/query/json/utils');
						$result = curl_exec($ch);
						curl_close($ch);
						$json = json_decode($result, true); 
						$curTime = strtotime($json['date']." ".$json['time']);

						$target =  strip_tags(get_post_meta($postID, 'target_time_and_date', true)); // get target deadline time from WP field
						$date = strtotime($target);
						$remaining = $date - $curTime;
						$days_remaining = floor($remaining / 86400);
						$hours_remaining = floor(($remaining % 86400) / 3600);
						$min_remaining = floor(($remaining % 3600) / 60);
						$sec_remaining = ($remaining % 60);
						function renderDisp($val){
							if($val < 10){
								if($val < 0){
									$val = "00";
								}else{
									$val = "0".$val;
								}
							}
							return $val;
						}
						$days_remaining = renderDisp($days_remaining);
						$hours_remaining = renderDisp($hours_remaining);
						$min_remaining = renderDisp($min_remaining);
						$sec_remaining = renderDisp($sec_remaining);
					?>
					<div class="active-timer" data-target-date="<?php echo $target ?>" data-server-time="<?php echo $curTime; ?>">
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