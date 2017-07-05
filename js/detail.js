//
var parmse = getParUrl();

function getPlayList2(id, callback) {
	$.ajax({
		url: "https://api.imjad.cn/cloudmusic/?type=playlist&id="+id,				//"https://api.imjad.cn/cloudmusic/?type=playlist&id="+id
		type: "GET",
		success: function (data) {
			// console.log("请求的是服务器");
			//console.log(data);
			//console.log(JSON.stringify(data.playlists))
			callback(data.playlist)
		}
	});
}

getPlayList2(parmse.id, function (data) {
	console.log(data);
	$("#detailPrev").find(".pic p").html(data.playCount);
	$("#detailPrev").find(".pic img").attr("src", data.coverImgUrl);
	$("#detailPrev").find(".text").html(data.name);
	$("#detailPrev").find(".author img").attr("src", data.creator.avatarUrl);
	$("#detailPrev").find(".author span").html(data.creator.nickname);

	var $musicList = $("#musicList");
	var $template2 = $("#templateItem2").html();

	for (var i = 0; i < data.tracks.length; i++) {

		var music = data.tracks[i];
		//console.log(music);
		$item2 = $($template2);
		$item2.find(".music").html(data.tracks[i].name);
		$item2.find(".author").html(data.tracks[i].ar[0].name);
		
		if (isCollected(music.id)) {
			$item2.find("span").removeClass().addClass("yes");
		} else {
			$item2.find("span").removeClass().addClass("no");
		}

		$item2.find("span").data("music", music).click(function (ev) {
			ev.stopPropagation();	//阻止事件冒泡
			//console.log($(this).data("music").id);
			var music = $(this).data("music");

			if (localStorage.collection) {
				//console.log("已经有缓存数据");
				if (isCollected(music.id)) {
					var list = JSON.parse(localStorage.collection);
					list[music.id].isCollected = false;
					localStorage.collection = JSON.stringify(list);
					$(this).removeClass().addClass("no");
				} else {
					var list = JSON.parse(localStorage.collection);
					list[music.id] = {
						"name": music.name,
						"author": music.ar[0].name,
						"isCollected": true,
						"picUrl":  music.al.picUrl						
					};
					localStorage.collection = JSON.stringify(list);
					$(this).removeClass().addClass("yes");
				}
			} else {
				//console.log("第一次缓存记录")
				//localStorage.collection = {};
				//console.log(typeof localStorage.collection)
				var list = {};
				list[music.id] = {
					"name": music.name,
					"author": music.ar[0].name,
					"isCollected": true,
					"picUrl":  music.al.picUrl
				};
				//console.log(list)
				$(this).removeClass().addClass("yes");	
				localStorage.collection = JSON.stringify(list);
				//console.log(localStorage.collection);
			}		
		});

		$item2.appendTo($musicList);

		$item2.data("music", music).click(function () {
			//console.log($(this).data("music"));
			musicControler.play($(this).data("music"));
		});
	}
});

//判断歌曲是否被收藏
function isCollected(id) {
	if (localStorage.collection) {
		var list = JSON.parse(localStorage.collection);
	} else {
		return false;
	}
	//console.info(list)
	if (list[id] && list[id].isCollected) {
		return true;
	} else {
		return false
	}
}

//返回首页
$("#detailPrev").find(".back").click(function () {
	router("tab");
});