
function load(m) {
	m = m || "home";
	router(m, $("#container"));
}
//默认加载home
load("home");

$("#m1").click(function () {
	$(this).addClass("active").siblings().removeClass("active");
	load("home");
});

$("#m2").click(function () {
	$(this).addClass("active").siblings().removeClass("active");
	load("songlist");
});

$("#m3").click(function () {
	$(this).addClass("active").siblings().removeClass("active");
	load("order");
});

$("#m4").click(function () {
	$(this).addClass("active").siblings().removeClass("active");
	load("collected");
});