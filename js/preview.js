/*!
 * File preview app
 * Original author: Evandro Eisinger - github.com/evandroeisinger
 * Licensed under the MIT license
 */

;(function( $, window, document, undefined ) {

    $.preview = function( element, listeners ) {

        var callback = {
            onEnter  : function( response ) {},
            onDrag   : function( response ) {},
            onOver   : function( response ) {},
            onLeave  : function( response ) {},
            onDrop   : function( response ) {},
            onChange : function( response ) {},
            onRender : function( response ) {},
            onError  : function( response ) {}
        }

        var app = this;
            app.callback = $.extend({}, callback, listeners);

        var $element = $(element),
             element = element;

        app.setup = function() {
            if( window.FileReader ) {
                switch( element.tagName ) {
                    case 'INPUT' :
                        element.onchange = function( event ) {
                            render( this.files );
                            app.callback.onChange( event );
                        };
                        break;
                    default :
                        element.ondragenter = function( event ) {
                            event.stopPropagation();
                            app.callback.onEnter( event );
                            return false;
                        }
                        element.ondragover = function( event ) {
                            event.stopPropagation();
                            app.callback.onOver( event );
                            return false;
                        }
                        element.ondragleave = function( event ) {
                            event.stopPropagation();
                            app.callback.onLeave( event );
                            return false;
                        }
                        element.ondrop = function( event ) {
                            event.stopPropagation();
                            app.callback.onDrop( event );
                            render( event.dataTransfer.files );
                            return false;
                        }
                        break;
                }
            } else {
                app.callback.onError({
                    code  : 1,
                    alert : 'This browser doesnt support the File API' 
                });
            }
        }

        var render = function( files ) {
            for(var i = 0; i < files.length; i++) {
                _file = files[i];
                _reader = new FileReader();
                _reader.readAsDataURL(_file);
                _reader.onload = function( content ) {
                    app.callback.onRender({
                        info  : _file,
                        content : content.target.result 
                    });
                }
                _reader.onerror = function( response ) {
                    app.callback.onError({
                        code  : 2,
                        alert : response 
                    });
                }
            };
        }

    }

    $.fn.preview = function( options ) {
        return this.each(function() {
            var app = new $.preview( this, options ).setup();
        });
    }

})( jQuery, window, document );