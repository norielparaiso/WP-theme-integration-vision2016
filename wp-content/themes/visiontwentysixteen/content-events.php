<!-- content-events start -->
<div class="event-list">
	<div class="container">
		<div class="row no-gutters">
			<div class="col-xs-12">
				<div class="heading">
					<h3><?php the_title(); ?></h3>
					<a href="<?php echo strip_tags(get_post_meta($postID, 'link_url', true)) ?>" class="see-all hidden-xs">
						<?php echo strip_tags(get_post_meta($postID, 'link_label', true)) ?>
					</a>
				</div>
			</div>
			<div class="col-xs-12">
				<div class="events">
					<div class="row no-gutters">
						<?php 
							if(is_numeric(get_post_meta($postID, 'page_ID', true))){
								$eventPage = get_post(get_post_meta($postID, 'page_ID', true)); 
								$pages = get_pages('child_of='.$eventPage->ID.'&hierarchical=true');
								$count = 0;
								foreach($pages as $page){
									$eventTitle = getPageContent($page->ID,"title");
									if($count == 3){
										echo '</div><div class="row no-gutters">';
										$count = 0;
									}
						?>
									<div class="col-xs-12 col-sm-4 col-md-12 col-lg-12">
										<div class="event">
											<div class="row no-gutters">
												<div class="col-xs-12 col-sm-12 col-md-3 col-lg-3">
													<div class="picture">
														<a href="#" title="<?php echo $eventTitle; ?>">
															<img src="<?php echo getPageContent($page->ID,"image"); ?>" alt="<?php echo $eventTitle; ?>">
														</a>
													</div>
												</div>
												<div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
													<div class="info">
														<span class="date"><?php echo getPageContent($page->ID,"date"); ?></span>
														<p class="title">
															<a href="#" title="<?php echo $eventTitle; ?>">
																<?php echo $eventTitle; ?>
															</a>
														</p>
														<p class="address"><?php echo getPageContent($page->ID,"content"); ?></p>
													</div>
												</div>
												<div class="col-xs-12 col-sm-12 col-md-3 col-lg-3">
													<div class="register-share">
														<a href="<?php echo getPageContent($page->ID,"url"); ?>" class="register-btn"><?php echo getPageContent($page->ID,"label"); ?></a>
														<span>Share This Event</span>
														<a href="<?php echo getPageContent($page->ID,"facebook"); ?>" class="fb">&nbsp;</a>
														<a href="<?php echo getPageContent($page->ID,"twitter"); ?>" class="tw">&nbsp;</a>
														<a href="<?php echo getPageContent($page->ID,"spiceworks"); ?>" class="sw">&nbsp;</a>
														<a href="<?php echo getPageContent($page->ID,"linkedin"); ?>" class="li">&nbsp;</a>
													</div>
												</div>
											</div>
										</div>
									</div>
						<?php 
									$count++;
								}
							}
						?>
					</div>
				</div>
				<a href="<?php echo strip_tags(get_post_meta($postID, 'link_url', true)) ?>" class="see-all visible-xs">
					<?php echo strip_tags(get_post_meta($postID, 'link_label', true)) ?>
				</a>
			</div>
		</div>
	</div>
</div>
<!-- content-events end -->