/*
	depends on:
		jQuery
*/
(function($,w,undefined){

$.getJSON("http://staging.ourcog.com/api/core/get_category_posts/?slug=okcog&callback=?", function(data){
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



}(jQuery, window));