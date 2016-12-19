'use strict';

$(function() {
	connectWebViewJavascriptBridge(function(bridge) {
		// 设置菜单
		var menuArr = [];
		bridge.callHandler('setOptionMenu', menuArr, function(response) {

		});

		bridge
				.registerHandler(
						'returnBackHandler',
						function(data, responseCallback) {
              var backParam;
							var curUrl = window.location.href;
							if (curUrl.indexOf('/step/base') !== -1
									|| curUrl.indexOf('/step/company') !== -1
									|| curUrl.indexOf('/step/network') !== -1
									|| curUrl.indexOf('/step/xykzc') !== -1
									|| curUrl.indexOf('/step/lyhy') !== -1) {
								backParam = {};
								backParam.isFirstPage = 'false';
								responseCallback(backParam);
								window.history.go(-1);
							} else if (curUrl.indexOf('/step/result') !== -1) {
								backParam = {};
								backParam.isFirstPage = 'false';
								responseCallback(backParam);
								window.location.href = 'http://www.xiaomadada.com/paaweb/abc-card-apply';
							} else {
								var applyFrom = window.applyFrom;
								if (applyFrom && applyFrom === 'parent') {
									backParam = {};
									backParam.isFirstPage = 'false';
									responseCallback(backParam);
									window.history.go(-1);
								} else {
									backParam = {};
									backParam.isFirstPage = 'true';
									responseCallback(backParam);
								}
							}
						});
	});
});
