<!-- content-map start -->
<div class="map">
	<div class="gmap"></div>
	<div class="container">
		<div class="row no-gutters">
			<div class="col-xs-12 col-sm-5 col-md-4 col-lg-4">
				<div class="map-desc">
					<span><?php echo nl2br(strip_tags(get_post_meta($postID, 'label', true))); ?></span>
					<h3><?php the_title(); ?></h3>
					<p class="address" data-address="<?php echo strip_tags(get_post_meta($postID, 'map_address', true)); ?>">
						<?php echo nl2br(strip_tags(strip_shortcodes(get_the_content($postID)),'<br><strong><span><b><i><em><a>')); ?>
					</p>
				</div>
			</div>
		</div>
	</div>
</div>
<!-- content-map end -->