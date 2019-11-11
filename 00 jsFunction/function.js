//1.动态插入样式---------------------------------------------------------------------------------------------

//通过调用addStyle()方法添加样式
// function addStyle(){
// 	loadStyleString("body{background-color:red}");
// }
// loadStyleString("body{background-color:blue}");
//loadStyle("style.css");

// 实时地向页面中添加嵌入式样式<style type="text/css">body{background-color:red}</style>
function loadStyleString(css){
	var style = document.createElement("style");
	style.type = "text/css";
	try{
		//普通浏览器Firefox、Safari、Chrome、Opera
		style.appendChild(document.createTextNode(css));
	} catch (ex){
		style.styleSheet.cssText =css;//兼容IE浏览器
	}
	var head = document.getElementsByTagName("head")[0];
	head.appendChild(style);
}

// 实时地向页面中添加外部样式<link rel="stylesheet" type="text/css" href="style.css">
function loadStyle(url){
	var link = document.createElement("link");
	link.rel = "stylesheet";
	link.type = "text/css";
	link.href = url;
	var head = document.getElementsByTagName("head")[0];
	head.appendChild(link);
}

//----------------------------------------------------------------------------------------------------
//2.动态插入脚本---------------------------------------------------------------------------------------------
// function addScript(){
// 	loadScriptString("function sayHi(){alert('hi');}");
// 	sayHi();
// 	loadScript("DynamicStyle.js");
// }

//动态加载行内脚本
function loadScriptString(code){
	var script = document.createElement("script");
	script.type = "text/javascript";
	try{
		script.appendChild(document.createTextNode(code));
	} catch (ex){
		script.text = code;
	}
	document.body.appendChild(script);
}

//动态加载外部脚本
function loadScript(url){
	var script = document.createElement("script");
	script.type = "text/javascript";
	script.src = url;
	document.body.appendChild(script);
}
//----------------------------------------------------------------------------------------------------
//3.获取元素的大小-------------------------------------------------------------------------------------
// function getDimensions(){
// 	// var rect = getBoundingClientRect(document.getElementById("myDiv"));
// 	var rect = getBoundingClientRect(document.getElementsByTagName("body")[0]);
// 	alert("left: " + rect.left + "\nright: " + rect.right  + "\ntop: " + rect.top + "\nbottom: " + rect.bottom);        
// }

function getElementLeft(){
	var actualLeft = element.offsetLeft;
	var current = element.offsetParent;

	while(current !== null){
		actualLeft += current.offsetLeft;
		current = current.offsetParent;
	}
	return actualLeft;
}

function getElementTop(){
	var actualTop = element.offsetTop;
	var current = element.offsetParent;

	while (current !== null){
		actualTop += current.offsetTop;
		current = current.offsetParent;
	}
	return actualTop;
}

function getBoundingClientRect(element){
	var scrollTop = document.documentElement.scrollTop;
	var scrollLeft = document.documentElement.scrollLeft;
//判定支不支持getBoundingClientRect
	if (element.getBoundingClientRect){
		if(typeof arguments.callee.offset != "number"){
			var temp = document.createElement("div");
			temp.style.cssText = "position:absolute;left:0;top:0;";
			document.body.appendChild(temp);
			arguments.callee.offset = -temp.getBoundingClientRect().top-scrollTop;
			document.body.removeChild(temp);
			temp = null;
		}
		var rect = element.getBoundingClientRect();
		var offset = arguments.callee.offset;

		return {
			left:rect.left + offset,
			right:rect.right + offset,
			top:rect.top + offset,
			bottom:rect.bottom + offset
		};
	}else{
		var actualLeft = getElementLeft(element);
		var actualTop = getElementTop(element);

		return {
			left: actualLeft - scrollLeft,
			right:actualLeft + element.offsetWidth - scrollLeft,
			top:actualTop - scrollTop,
			bottom:actualTop + element.offsetHeight - scrollTop
		};
	}
}