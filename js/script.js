/*
	depends on:
		jQuery
*/
(function($,w,undefined){

$.getJSON("http://ourcog.com/api/core/get_category_posts/?slug=okcog&callback=?", function(data){
	console.log(data);
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