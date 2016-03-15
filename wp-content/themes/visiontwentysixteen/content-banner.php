<!-- content-banner start -->
<div class="hero-banner" style="<?php if(has_post_thumbnail($postID)): ?> background: url('<?php $image = wp_get_attachment_image_src(get_post_thumbnail_id( $postID ), 'single-post-thumbnail'); echo $image[0]; ?>'); background-repeat: no-repeat; background-position: top center; background-size: cover; background-attachment: fixed; <?php endif; ?>">
	<div class="container">
		<div class="row no-gutters">
			<div class="col-xs-12">
				<img src="<?php bloginfo('template_url'); ?>/images/vision/vis_logo.png" alt="Vision 2016 Washington, DC. - CHANGE THE GAME" draggable="false"/>
				<?php the_content(); ?>
				<a href="#" class="play video-modal-trigger">&nbsp;</a>
				<div class="modal fade video-modal">
					<div class="modal-dialog">
						<div class="modal-content">
							<div class="modal-body">
								<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
								<iframe id="player1" class="ytplayer" width="560" height="315" src="<?php echo get_post_meta($postID, 'modal_video', true)?>?enablejsapi=1&amp;theme=light" frameborder="0" allowfullscreen></iframe>
							</div>
						</div>
					</div>
				</div>
				<p>
					<?php echo nl2br(strip_tags(get_post_meta($postID, 'date_and_venue', true), '<br>')); ?>
				</p>
				<a href="<?php echo get_post_meta($postID, 'sign_up_link', true)?>" class="sign-up-btn">
					<?php echo strip_tags(get_post_meta($postID, 'sign_up_label', true)); ?>
				</a>
				<ul class="branding">
					<li><a href="http://www.pcm.com/"><img src="<?php bloginfo('template_url'); ?>/images/vision/pcm_logo.png" draggable="false" alt="pcm"></a></li>
					<li><a href="http://www.pcmg.com/"><img src="<?php bloginfo('template_url'); ?>/images/vision/pcmg_logo.png" draggable="false" alt="pcmg"></a></li>
					<li><a href="http://www.enpointe.com/"><img src="<?php bloginfo('template_url'); ?>/images/vision/enpointe_logo.png" draggable="false" alt="enpointe"></a></li>
					<li><a href="http://www.tigerdirect.com/"><img src="<?php bloginfo('template_url'); ?>/images/vision/tiger_logo.png" draggable="false" alt="tigerdirect"></a></li>
				</ul>
				<ul class="socials">
					<li><a href="<?php echo get_post_meta($postID, 'facebook', true)?>" class="fb">&nbsp;</a></li>
					<li><a href="<?php echo get_post_meta($postID, 'twitter', true)?>" class="tw">&nbsp;</a></li>
					<li><a href="<?php echo get_post_meta($postID, 'linkedin', true)?>" class="li">&nbsp;</a></li>
					<li><a href="<?php echo get_post_meta($postID, 'youtube', true)?>" class="yt">&nbsp;</a></li>
				</ul>
			</div>
		</div>
	</div>
</div>
<!-- content-banner end -->