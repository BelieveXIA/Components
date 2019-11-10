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