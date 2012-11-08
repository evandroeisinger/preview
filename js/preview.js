/*!
 * File preview plugin
 * Original author: Evandro Eisinger - github.com/evandroeisinger
 * Licensed under the MIT license
 */

;(function ( $, window, document, undefined ) {

    var Preview = function( element, listeners ) {
            this.element  = element;
            this.callback = $.extend( {}, callback, listeners );
            _preview = this;
        },
        callback = {
            onDrop   : function( response ) {},
            onDrag   : function( response ) {},
            onOver   : function( response ) {},
            onChange : function( response ) {},
            onRender : function( response ) {},
            onError  : function( response ) {}
        },
        _preview = null;

    Preview.prototype = {
        setup : function() {
            if( window.FileReader ) {
                switch( _preview.element.tagName ) {
                    case 'INPUT' :
                        _preview.element.onchange = function( event ) {
                            _preview.render( this.files );
                            _preview.callback.onChange({ 
                                files  : this.files, 
                                _event : event
                            });
                        };
                        break;
                    default :
                        _preview.element.ondragenter = function( event ) {
                            event.stopPropagation();
                            _preview.callback.onDrag({
                                target : _preview.element,
                                _event : event
                            });
                            return false;
                        }
                        _preview.element.ondragover = function( event ) {
                            event.stopPropagation();
                            _preview.callback.onOver({
                                target : _preview.element,
                                _event : event
                            });
                            return false;
                        }
                        _preview.element.ondrop = function( event ) {
                            event.stopPropagation();
                            _preview.render( event.dataTransfer.files );
                            _preview.callback.onDrop({ 
                                files  : event.dataTransfer.files, 
                                _event : event
                            });
                            return false;
                        }
                        break;
                }
            } else {
                _preview.callback.onError({
                    code  : 1,
                    alert : 'This browser doesnt support the File API' 
                })
            }
        },
        render : function( files ) {
            for(var i = 0; i < files.length; i++) {
                _file = files[i];
                _reader = new FileReader();
                _reader.readAsDataURL(_file);
                _reader.onload = function( content ) {
                    _preview.callback.onRender({
                        info  : _file,
                        content : content.target.result 
                    });
                }
                _reader.onerror = function( response ) {
                    _preview.callback.onError({
                        code  : 2,
                        alert : response 
                    });
                }
            };
        }
    };

    $.fn.preview = function( custom ) {
        return this.each(function() {
          new Preview( this, custom ).setup();
        });
    }

})( jQuery, window, document );