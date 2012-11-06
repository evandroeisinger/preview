/*!
 * File preview plugin
 * Original author: Evandro Eisinger - github.com/evandroeisinger
 * Licensed under the MIT license
 */

;(function ( $, window, document, undefined ) {

    var defaults = {};

    function Preview( element, options ) {
        this.element = element;
        this.options = $.extend( {}, defaults, options ) ;
        this._defaults = defaults;
        this.init();
    }

    Preview.prototype = {
        init: function() {}, 
        drop: function( event ) {},
        check: function( file ) {},
        load: function( event ) {},
        error: function( event ) {},
        support: function() {}
    };

    $.fn.Preview = function ( options ) {
            return new Preview( this, options ));
        });
    }

})( jQuery, window, document );