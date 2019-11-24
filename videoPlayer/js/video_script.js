var PlayNode = document.getElementsByClassName("playNode")[0];
var VideoNode = document.getElementsByClassName("videoNode")[0];
var FullNode = document.querySelector(".fullNode");
var allNode = document.querySelector(".allTime");
var nowNode =document.querySelector(".nowTime");
var LineNode = document.querySelector('.lineNode');
var	CrlNode = document.querySelector('.crlNode');
var	LoadNode = document.querySelector('.loadNode');
var	VDragNode = document.querySelector('.v_DragNode');
var VolumeNode = document.querySelector(".volumeNode");
var PlayBtn = true;

//点击播放暂停
PlayNode.onclick = function(){
	PlayBtn = !PlayBtn;
	if(PlayBtn == false){
		this.className = 'pauseNode';
		VideoNode.play();
	}else{
		this.className = 'playNode';
		VideoNode.pause();
	}
};
//进度条拖拽
CrlNode.onmousedown = function(e){
	var ev = e || event;
	var l = ev.clientX - this.offsetLeft;
	VideoNode.pause();

	document.onmousemove = function(e){
		var ev = e || event;
		var needX = ev.clientX - l;
		var needMax = LoadNode.offsetWidth - 8.5;

		needX = needX < -8.5 ? -8.5 : needX;
		needX = needX > needMax ? needMax : needX;
		CrlNode.style.left = needX + "px";
		LineNode.style.width = (CrlNode.offsetLeft+9)/LoadNode.offsetWidth*100+ "%";
	};
	document.onmouseup = function(){
		document.onmousemove = document.onmouseup = null;
		VideoNode.currentTime = VideoNode.duration * (CrlNode.offsetLeft+9)/LoadNode.offsetWidth;

		if(PlayBtn == false){
			PlayNode.className = "pauseNode";
			VideoNode.play();
		}else{
			PlayNode.className = "playNode";
			VideoNode.pause();
		}
	};
	return false;
};

//时间进度
VideoNode.addEventListener("canplay",function(){
	var needTime = parseInt(VideoNode.duration);
	var s = needTime%60;
	var m = parseInt(needTime/60);
	var timeNum = toDou(m)+":"+toDou(s);
	allNode.innerHTML = timeNum;
});
//设置时间格式
function toDou(time){
	return time<10?"0"+time:time;
}
VideoNode.addEventListener("timeupdate",function(){
	LineNode.style.width = VideoNode.currentTime/VideoNode.duration*100+'%';
	CrlNode.style.left = LineNode.offsetWidth - 8.5 + 'px';

	//动态播放时间
	var needTime = parseInt(VideoNode.currentTime);
	var s = needTime%60;
	var m = parseInt(needTime/60);
	var timeNum = toDou(m)+":"+toDou(s);
	nowNode.innerHTML = timeNum;
});
//声音按钮
VolumeNode.onclick = function(){
	//VideoNode.muted = true;
	if (VideoNode.muted) {
		VideoNode.muted = false;
	}else{
		VideoNode.muted = true;
	}
};
//声音进度条
VDragNode.onmousedown = function(e){
	var ev = e || event;
	var l = ev.clientX - this.offsetLeft;
	document.onmousemove = function(e){
		var ev = e || event;
		var needX = ev.clientX - l;
		var needMax = VDragNode.parentNode.offsetWidth - 2.5;

		needX = needX < -2.5?-2.5:needX;
		needX = needX > needMax ? needMax:needX;

		var lastVolume = (VDragNode.offsetLeft + 2)/VDragNode.parentNode.offsetWidth;
		VideoNode.volume = lastVolume<0 ? 0:lastVolume;

		VDragNode.style.left = needX+"px";
	};
	document.onmouseup = function(e){
		document.onmousemove = document.onmouseup = null;
	};
	return false;
};

//全屏按键
FullNode.onclick = function(){
	if (VideoNode.webkitRequestFullscreen) {
		VideoNode.webkitRequestFullscreen();
	}else if(VideoNode.mozRequestFullScreen){
		VideoNode.mozRequestFullScreen();
	}else{
		VideoNode.requestFullscreen();
	}
};

