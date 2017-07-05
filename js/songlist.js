getPlayList(8, server, function (data) {
	console.log("ok");
	console.info(data);
	//console.log(data);
	var $template = $("#templateItem3").html();
	//console.log($template);
	for (var i = 0; i < data.length; i++) {
		var $item = $($template);
		$item.find(".con").attr("href", "#detail?id=" + data[i].id)
		$item.find(".like").html(data[i].playCount);
		$item.find("img").attr("src", data[i].coverImgUrl);
		$item.find(".des").html(data[i].name);
		$item.appendTo($("#songList"))
	}
});