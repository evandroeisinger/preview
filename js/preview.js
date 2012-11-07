/*!
 * File preview plugin
 * Original author: Evandro Eisinger - github.com/evandroeisinger
 * Licensed under the MIT license
 */

;(function ( $, window, document, undefined ){

    var callback = {
        onSetup  : function( response ){},
        onCheck  : function( response ){},
        onDrop   : function( response ){},
        onDrag   : function( response ){},
        onChange : function( response ){},
        onLoad   : function( response ){},
        onError  : function( response ){}
    };

    function preview( element, custom ){
        this.element  = element;
        this.callback = $.extend( {}, callback, custom );
        this.setup();
    }

    preview.prototype = {
        setup : function() {
            if( window.FileReader ){
                this.element.each(function( index, element ){
                    switch( element.tagName ){
                        case 'INPUT' : 
                            $(element).on( 'change',function( event ){
                                preview.prototype.check( this.files );
                            });
                            break;
                        default :
                            $(element).on( 'dragover',function( event ){
                                event.stopPropagation();
                                return false;
                            });
                            $(element).on( 'drop',function( event ){
                                event.stopPropagation();
                                preview.prototype.check( event.originalEvent.dataTransfer.files );
                                return false;
                            });
                            break;
                    }
                });
            } else {
                this.callback.onError({
                    code  : 1,
                    alert : 'This browser doesnt support the File API' 
                })
            }
        },
        check : function( files ){
            console.log( files );
        },
        load : function( event ){}
    };

    $.fn.preview = function( options ){
        return new preview( this, options );
    }

})( jQuery, window, document );
