/*
	depends on:
		jQuery
*/
(function($,w,undefined){

$.getJSON("http://staging.ourcog.com/tag/okcog/?json=1&callback=?", function(data){
	console.log(data);
	var source   = $("#news-template").html(),
			template = Handlebars.compile(source),
			html    = template(data);
		$(".news-hold").html(html);
});

$("textarea,input").not("[type=submit]").each(function(i,el){ $(el).data("val", $(this).val()); });
$("body").on("focus", "textarea,input", function(){
	if ($(this).val() == $(this).data("val") && $(this).not("[type=submit]")){
		$(this).val("");
	}
}).on("blur", "textarea,input", function(e){
	if ($.trim($(this).val()) == ""){
		$(this).val($(this).data("val"));
	}
});

$("body").on("submit", "form", function(e){
	e.preventDefault();
	$.post("prayer/create.php", $(this).serialize(), function(data){
		$("form").addClass("sent");
		renderPrayers();
	});
});

function renderPrayers(){
	$.getJSON("prayer/index.php", function(data){
		var ctx = {
			messages : data
		};
		var source   = $("#prayer-template").html(),
			template = Handlebars.compile(source),
			html    = template(ctx);
			$(".prayer-hold").html(html);
	});
}

renderPrayers();

}(jQuery, window));