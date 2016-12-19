'use strict';

var domain = '';
var linkUrl = '';
var imgUrl = '', imgUrlWb = '', title = '', quanTitle = '', desc = '';
$(document).ready(function() {
	var ch = $('#ch').val();
	var fr = $('#fr').val();
	var sel = $('#sel').val();
	if(sel){
		sel = encodeURI(sel);
	}
	var abc = 'abc-card-apply';
	var url = location.href;
	var p = url.indexOf(abc);
	if(p > -1) {
		url = url.substr(0,p + abc.length) + '/#' + url.substr(p + abc.length);
	}
	$.get('/paaweb/general/v2/getJddkData', {
		'url' : url,
		'channel' : ch,
		'from' : fr,
		'extra' : sel
	}, function(data) {

	domain = data.domain;
	linkUrl = data.linkurl;
	imgUrl = data.imgurl;
	imgUrlWb = data.imgurlWb;
	title = data.title;
	quanTitle = data.quanTitle;
	if (quanTitle == null) {
		quanTitle = title;
	}
	desc = data.desc;

	wx.config({
		debug : false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
		appId : data.appid, // 必填，公众号的唯一标识
		timestamp : data.timestamp, // 必填，生成签名的时间戳
		nonceStr : data.nonceStr, // 必填，生成签名的随机串
		signature : data.signature,// 必填，签名，见附录1
		jsApiList : [ 'checkJsApi', 'onMenuShareTimeline',
				'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo' ]
	// 必填，需要使用的JS接口列表，所有JS接口列表见附录2
	});
	wx.ready(function() {
		wx.onMenuShareTimeline({
			title : quanTitle, // 分享标题
			link : linkUrl, // 分享链接
			imgUrl : imgUrl, // 分享图标
			success : function() {
			},
			cancel : function() {
			}
		});
		wx.error(function(res) {
//			alert('errorMSG:' + res.errMsg);
		});
		wx.onMenuShareAppMessage({
			title : title, // 分享标题
			link : linkUrl, // 分享链接
			imgUrl : imgUrl, // 分享图标
			desc : desc,
			success : function() {
			},
			cancel : function() {
			}
		});
		wx.onMenuShareWeibo({
			title : title, // 分享标题
			desc : desc, // 分享描述
			link : linkUrl, // 分享链接
			imgUrl : imgUrlWb, // 分享图标
			success : function() {

			},
			cancel : function() {

			}
		});
		wx.onMenuShareQQ({
			title : title, // 分享标题
			desc : desc, // 分享描述
			link : linkUrl, // 分享链接
			imgUrl : imgUrl, // 分享图标
			success : function() {

			},
			cancel : function() {
			}
		});
		});
	});
});
