$(function(){
	$('.drop').preview({
		onEnter  : function( response ) {
			$(response.target).addClass('drag');
		},
        onLeave  : function( response ) {
            $(response.target).removeClass('drag');
        },
        onDrop : function( response ) { 
        	$(response.target).removeClass('drag');
        },
        onError  : function( response ) { 
        	console.log( response )
        }
    });
});