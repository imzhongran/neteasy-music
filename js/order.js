function getOrderList(url, callback) {

	$.ajax({
		type: "get",
		url: url,
		success: function (data) {
			callback(data);
		}
	})
}

var url = "data/myOrder.json";

getOrderList(url, function (data) {
	console.log(data);
	var templateOrder = $("#templateOrder").html();

	for (var i = 0; i < data.tracks.length; i++) {
		var $orderItem = $(templateOrder);
		var orderObj = data.tracks[i];
		$orderItem.find("img").attr("src", orderObj.picUrl);
		$orderItem.find(".one").html(orderObj.top1);
		$orderItem.find(".two").html(orderObj.top2);
		$orderItem.find(".three").html(orderObj.top3);
		$orderItem.appendTo($("#order"));
	}
});