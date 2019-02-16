var QbzzInex = window.QbzzInex || {};
(function(window, $) {
	QbzzInex = {
		indexJs: function() {
			this.showNav();
			this.tabSwitch();
			this.showSuspend();
			this.navSuspend();
			this.showSuspend();
		},
		//导航悬浮
		navSuspend: function() {
			$(window).scroll(function() {
				if($(window).scrollTop() > 80) {
					$("#header-suspend-tab").addClass("header-suspend");

				} else {
					$("#header-suspend-tab").removeClass("header-suspend");
				}
			});
		},
		//二级导航
		showNav: function() {
			$("#show-tab").hover(function() {
				$("#show-box").stop().slideDown("fast");
			}, function() {
				$("#show-box").stop().slideUp("fast");
			});
		},
		//二级导航选项卡切换
		tabSwitch: function() {
			$('#TabSwitch li').hover(function() {
				var Li_Index = $('#TabSwitch li').index(this);
				$('#TabSwitch li').removeClass("active");
				$(this).addClass("active");
				$("#TabContent .tab-pane").hide().eq(Li_Index).show();

			});
		},

		//产品悬浮框显示
		showSuspend: function() {
			$("#MoveUp li").hover(function() {
				var SUSPENDBOX = $(this).find(".show-suspend");
				SUSPENDBOX.animate({
					top: "-20px"
				}, 200);

			});
		},
	}
})(window, jQuery);

$(function() {
	QbzzInex.indexJs();
});