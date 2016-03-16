<!-- content-info start -->
<div class="main-section data-post-4">
	<div class="container">
		<div class="row no-gutters infograph">
			<div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">
				<?php include('show-block-title.php') ?>
				<?php include('show-block-content-p.php') ?>
			</div>
			<div class="col-xs-12 col-sm-12 col-md-8 col-lg-8">
				<div class="row no-gutters">
					<?php 
						if(is_numeric(get_post_meta($postID, 'page_ID', true))){
							$charts = get_post(get_post_meta($postID, 'page_ID', true)); 
							$pages = get_pages('child_of='.$charts->ID.'&hierarchical=true');
							$count = 0;
							foreach($pages as $page){
								if($count == 2){
									echo '</div><div class="row no-gutters">';
									$count = 0;
								}
					?>
								<div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
									<div class="cta">
										<div class="picture">
											<img src="<?php echo getPageContent($page->ID,'image'); ?>" draggable="false" alt="<?php echo getPageContent($page->ID,'title'); ?>">
										</div>
										<div class="info">
											<h4><?php echo getPageContent($page->ID,'title'); ?></h4>
											<p>
												<?php echo getPageContent($page->ID,'content'); ?>
											</p>
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
		</div>
	</div>
</div>
<!-- content-info end -->