$(function(){
	$('.drop, #file').preview({
		onEnter  : function( response ) {
			$(response.target).addClass('drag');
		},
        onLeave  : function( response ) {
            $(response.target).removeClass('drag');
        },
        onDrop : function( response ) { 
        	$(response.target).removeClass('drag');
        },
        onProcess : function( file ) { 

            if ( file.info.type.match( /image.*/ ) ) {
                loadImage( file.content );
            } else if ( file.info.type.match( /video.*/ ) ) {
                loadVideo( file.content );
            } else if ( file.info.type.match( /text.*/ ) ) {
                loadOther( file.content );
            } else {
                loadOther( file.content );
            }
        },
        onError  : function( response ) { 
        	console.log( response )
        }
    });

    var files = $('.files');

    function loadImage( src ) {
        var output  = '<li class="img">';
            output += '<img src="' + src + '" >';
            output += '</li>';
        
        files.append(output)
    }   

    function loadVideo( src ) {
        var output  = '<li class="video">';
            output += '<video src="' + src + '" autoplay="autoplay" controls="controls"></video>';
            output += '</li>';
        
        files.append(output)
    }

    function loadOther( src ) {
        var output  = '<li class="text">';
            output += src;
            output += '</li>';
        
        files.append(output)
    }

});