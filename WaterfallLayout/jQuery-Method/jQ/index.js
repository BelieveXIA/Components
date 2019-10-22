$(window).on('load',function(){
	waterfall();
	var dataInt = {"data":[{"src":'1.jpg'},{"src":'21.jpg'},{"src":'17.jpg'}]};
	$(window).on('scroll',function(){
		if(checkScrollSlide()){
			$.each(dataInt.data,function(key, value) {
				//console.log(value);
				var oBox = $('<div>').addClass('box').appendTo($('#main'));
				var oPic = $('<div>').addClass('pic').appendTo($(oBox));
				var oImg = $('<img>').attr('src','./image/'+$(value).attr('src')).appendTo($(oPic));
			});
			waterfall();
		}
	});
});
function waterfall(){
	var $boxs = $('#main>div');
	var w = $boxs.eq(0).outerWidth();
	var cols = Math.floor($(window).width()/w);
	$('#main').width(cols*w).css('margin','0 auto');
	var hArry = [];
	$boxs.each(function(index, el) {
		var h = $boxs.eq(index).outerHeight();
		if (index<cols) {
			hArry[index] = h;
		}else{
			var minH = Math.min.apply(null,hArry);
			var minHindex = $.inArray(minH, hArry);
			$(el).css({
				position: 'absolute',
				top: minH +'px',
				left:w*minHindex +'px'
			});
			hArry[minHindex] += $boxs.eq(index).outerHeight();
		}
	});
}
function checkScrollSlide(){
	var $lastBox = $('#main>div').last();
	var lastBoxDis = $lastBox.offset().top + Math.floor($lastBox.outerHeight()/2);
	var scrollTop = $(window).scrollTop();
	var documentH = $(window).height();
	return (lastBoxDis < scrollTop + documentH)?true:false;
}