var myAudio = new Audio();

var audioBtn = document.querySelector(".playNode");
var playBln = true;

var volumeBtn = document.querySelector(".volumeNode");
var volumeBln = true;

var trueLine = document.querySelector(".trueLine");
var progressNode = document.querySelector(".progressNode");
var outerNode = document.querySelector(".outerNode");

var topNode = document.querySelector(".topNode");
var lastNode = document.querySelector(".lastNode");
var nextNode = document.querySelector(".nextNode");
var musicName = document.querySelector(".musicName");
var index = 0;

//模仿数据来源
let allDataMusic = [{
	"MusicSrc":"data/AcousticGuitar1.mp3",
	"MusicPic":"data/pic_bg/fmt01.jpg",
	"MusicName":"AcousticGuitar1"
},{
	"MusicSrc":"data/AmazingGrace.mp3",
	"MusicPic":"data/pic_bg/fmt02.jpg",
	"MusicName":"AmazingGrace"
},{
	"MusicSrc":"data/FeelsGood2B.mp3",
	"MusicPic":"data/pic_bg/fmt03.jpg",
	"MusicName":"FeelsGood2B"
},{
	"MusicSrc":"data/FunBusyIntro.mp3",
	"MusicPic":"data/pic_bg/fmt04.jpg",
	"MusicName":"FunBusyIntro"
},{
	"MusicSrc":"data/GreenDaze.mp3",
	"MusicPic":"data/pic_bg/fmt05.jpg",
	"MusicName":"GreenDaze"
},{
	"MusicSrc":"data/WhatsItToYaPunk.mp3",
	"MusicPic":"data/pic_bg/fmt06.jpg",
	"MusicName":"WhatsItToYaPunk"
}];
//初始的数据显示
myAudio.src = allDataMusic[index].MusicSrc;
topNode.style.backgroundImage = 'url('+allDataMusic[index].MusicPic+')';
musicName.innerHTML = allDataMusic[index].MusicName;
//控制播放
audioBtn.onclick = function(){
	playBln = !playBln;
	if (playBln == false) {
		myAudio.play();
	}else{	
		myAudio.pause();
	}
};
//控制声音
volumeBtn.onclick = function(){
	volumeBln = !volumeBln;
	if (volumeBln == false) {
		myAudio.volume = 0;
		this.className = 'no_volumeNode';
	}else{
		myAudio.volume = 1;
		this.className = 'volumeNode';
	}
};
//进度条显示
myAudio.addEventListener("timeupdate",function(){
	trueLine.style.width = myAudio.currentTime / myAudio.duration * 100 + "%";
});
//进度条点击显示
progressNode.onclick = function(e){
	var ev = e || event;
	//console.log((ev.clientX - this.offsetLeft - outerNode.offsetLeft) / 440);
	
	myAudio.currentTime = myAudio.duration * ((ev.clientX - this.offsetLeft - outerNode.offsetLeft) / this.offsetWidth);
	trueLine.style.width = ((ev.clientX - this.offsetLeft - outerNode.offsetLeft) / this.offsetWidth) * 100 +"%";

};
//下一首
nextNode.onclick = function(){
	index++;
	if (index == allDataMusic.length) {
		index = 0;
	}
	musicChange();
};
//上一首
lastNode.onclick = function(){
	index--;
	if (index == -1) {
		index = allDataMusic.length-1;
	}
	musicChange();
};
//控制播放器的内容函数
function musicChange(){
	myAudio.src = allDataMusic[index].MusicSrc;
	myAudio.currentTime = 0;
	trueLine.style.width = '0%';
	if (playBln == false) {
		myAudio.play();
	}else{	
		myAudio.pause();
	}
	topNode.style.backgroundImage = 'url('+allDataMusic[index].MusicPic+')';
	musicName.innerHTML = allDataMusic[index].MusicName;
}