
function getParUrl() {
	var parObj = {};

	var url = window.location.href;		//file:///D:/workspace/music/index.html?a=1&b=2&c=3
	var arr1 = url.split("?");			//["file:///D:/workspace/music/index.html", "a=1&b=2&c=3"]
	//console.info(arr1)
	if (arr1.length != 2) {
		return parObj;
	}
	var parStr = arr1[1];				//"a=1&b=2&c=3"
	var arr2 = parStr.split("&");		//["a=1", "b=2", "c=3"]

	for (var i = 0; i < arr2.length; i++) {
		// console.log(arr2[i].split("=")[0], arr2[i].split("=")[1]);
		// console.log(typeof arr2[i].split("=")[0])
		var key = arr2[i].split("=")[0];
		var value = parseInt(arr2[i].split("=")[1]);
		parObj[key] = value;
	}

	return parObj;
}

//获取模块名字
function getM() {
	var url = window.location.href;		//file:///D:/workspace/music/index.html#home?a=1&b=2&c=3
	var arr = url.split("#");
	if (arr.length != 2) {
		return false;
	}
	return arr[1].split("?")[0];
}

function router(m,container) {
	//console.log(m)
	if (m == false) {
		return;
	}
	container = container || $("#share");
	$.ajax({
		url: "views/" + m + ".html",
		success: function (data) {
			container.html(data);
		}
	});
	loadJs(m);
}

function loadJs(m) {
	$.ajax({
		url: "js/" + m + ".js"
	});
}

$(function () {
	// router("tab");
	// console.log(document.getElementById("home"))
	//localStorage.count = 0;
	//delete localStorage["collection"];
	//console.log(localStorage);

	if (!localStorage.count) {
		localStorage.count = 0;
	}
	//console.log(localStorage.count);
	localStorage.count++;
	if (localStorage.count == 1) {
		router("hello");
	} else {
		router("tab");
	}

	//加载音乐模块
	router("audio", $("#global"));

	//console.info(localStorage.collection);

	/*var obj = {
		"name": "tom",
		"age": 18
	};
	console.log(obj);
	var myData = JSON.stringify(obj);
	//localStorage.info = myData;
	console.log(localStorage.info);
	myData = JSON.parse(localStorage.info);
	console.log(myData)
	localStorage.info = null;*/

});