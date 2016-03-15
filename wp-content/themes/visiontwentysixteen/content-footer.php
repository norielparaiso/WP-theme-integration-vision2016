<!-- content-footer.php start -->
<footer class="footer-con">
	<div class="back-to-top"></div>
	<div class="info-section">
		<div class="container">
			<div class="row no-gutters">
				<div class="col-xs-12 col-sm-4 col-lg-4">
					<div class="call-info">
						<h3>
							We're here to help <br/>
							<a href="tel:18007001000"><span>1-800-700-1000</span></a><br/>
							<a href="//pcm.com/solutions">pcm.com/solutions</a>
						</h3>
					</div>
				</div>
				<div class="col-xs-12 col-sm-8 col-lg-8">
					<div class="text-info">
						<p>
							Get the technology you need now without having to pay for it all up front, with attractive lease options from PCM. Contact your account executive or email us at 
							<strong><a href="mailto:sales@pcm.com">sales@pcm.com</a></strong>
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="menu-section">
		<div class="container">
			<div class="row no-gutters">
				<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
					<h3>About the Company</h3>
					<div class="row no-gutters">
						<div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
							<?php 
								$args = array(
									'theme_location' => 'footer-about-1'
								);
								wp_nav_menu($args); 
							?>
						</div>
						<div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
							<?php 
								$args = array(
									'theme_location' => 'footer-about-2'
								);
								wp_nav_menu($args); 
							?>
						</div>
					</div>
				</div>
				<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
					<div class="row no-gutters">
						<div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
							<h3>We Provide</h3>
							<?php 
								$args = array(
									'theme_location' => 'footer-provide'
								);
								wp_nav_menu($args); 
							?>
						</div>
						<div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
							<h3>Supports</h3>
							<?php 
								$args = array(
									'theme_location' => 'footer-supports'
								);
								wp_nav_menu($args); 
							?>
						</div>
					</div>
				</div>
			</div>
			<div class="row no-gutters">
				<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 in-half">
					<h3>Follow Us</h3>
					<div class="socials">
						<a title="Like us on Facebook" href="https://www.facebook.com/PCM" target="_blank" class="fb">&nbsp;</a>
						<a title="Follow us on Twitter" href="https://twitter.com/PCM" target="_blank" class="tw">&nbsp;</a>
						<a title="Spiceworks" href="http://community.spiceworks.com/pages/pcm" target="_blank" class="sw">&nbsp;</a>
						<a title="Connect with us on LinkedIn" href="https://www.linkedin.com/company/pcm-inc" target="_blank" class="li">&nbsp;</a>
						<a title="Subscribe with us on Youtube" href="http://www.youtube.com/channel/UCe6ikIO87V6VlGrKto6U_bg" target="_blank" class="yt">&nbsp;</a>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="copyright-section">
		<div class="container">
			<div class="row no-gutters">
				<div class="col-xs-12">
					<?php 
						$args = array(
							'theme_location' => 'footer-menu'
						);
						wp_nav_menu($args); 
					?>
					<p>
						1940 E. Mariposa Ave., El Segundo, CA 90245 <a href="tel:18007001000">1-800-700-1000</a> &copy; <?php echo date('Y'); ?> PCM Sales, Inc.
					</p>
					<ul class="third-party-logo">
						<li>
							<a href="http://www.tooltwist.com/" target="_blank"><span class="tooltwist">
								<img src="http://image1.cc-inc.com/pcm/responsive_assets_2015/images/ttlogo.png" alt="Powered by tooltwist">
							</a>
						</li>
						<li>
							<a href="https://www.entrust.net/customer/profile.cfm?domain=*.pcm.com" target="_blank">
								<img src="http://image1.cc-inc.com/pcm/responsive_assets_2015/images/ssl-certificates.png" alt="Entrust Certified">
							</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</footer>
<script>
	PCM.footerActions().backToTop(".back-to-top");
</script>
<!-- content-footer.php end -->