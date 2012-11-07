$(function(){
	$('.drop').preview({
		onError : function( response ) {
			console.log(response);
		}
	});
});