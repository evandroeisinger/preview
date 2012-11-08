$(function(){
	$('.drop').preview({
		onDrag   : function( response ) {
			console.log( response )
			$(response.target).addClass('drag');
		},
        onRender : function( response ) { 
        	console.log( response )
        },
        onError  : function( response ) { 
        	console.log( response )
        }
    });
});