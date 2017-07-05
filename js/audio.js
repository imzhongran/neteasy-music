var musicControler = {
	//
	server: "http://musicapi.duapp.com/api.php",
	//
	playCollected: function (id) {
		$("#global").css("display", "flex");
		$("#audio_state").html("loading...");
		//console.info(id)
		$.ajax({
			url: this.server + "?type=url&id=" + id,
			type: "get",
			success: function (data) {
				//console.info(data);
				var oAudio = $("#audio").get(0);
				oAudio.src = data.data[0].url;
				oAudio.play();
				var list = JSON.parse(localStorage.collection);
				$("#audio_name").html(list[id].name);
				$("#audio_state").html(list[id].author);
				$("#audioPic").attr("src", list[id].picUrl);

				$("#audioBtn").addClass("play");
				$("#audioBtn").off('click').click(function () {
					if ($(this).hasClass("play")) {
						$(this).removeClass().addClass("pause");
						oAudio.pause();
						//console.log("pause");
					} else {
						$(this).removeClass().addClass("play");
						oAudio.play();
						//console.log("play");
					}
				})
			}
		})
	},
	play: function (music) {
		$("#global").css("display", "flex");
		$("#audio_state").html("loading...");
		$.ajax({
			url: this.server + "?type=url&id=" + music.id,
			type: "get",
			success: function (data) {
				//console.log(data);
				var oAudio = $("#audio").get(0);
				oAudio.src = data.data[0].url;				//data.data[0].url
				oAudio.play();
				$("#audio_name").html(music.name);
				$("#audio_state").html(music.ar[0].name);
				$("#audioPic").attr("src", music.al.picUrl)

				$("#audioBtn").addClass("play");
				$("#audioBtn").off('click').click(function () {
					if ($(this).hasClass("play")) {
						$(this).removeClass().addClass("pause");
						oAudio.pause();
						//console.log("pause");
					} else {
						$(this).removeClass().addClass("play");
						oAudio.play();
						//console.log("play");
					}
				})
			}
		});

	}
}
