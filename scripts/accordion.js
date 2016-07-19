'use strict';
( function( $ ){
    $(function(){
        $( 'body' ).on( 'click', '.js-info-list li span', function( event ){
            var $parent = $( event.currentTarget ).parent();
            var $target = $parent.find( 'p' );

            event.preventDefault();

            if( $target.is( ':visible' ) ){
                $target.velocity( 'slideUp' );
                $parent.find( 'svg' ).velocity({
                    rotateZ: '0deg'
                });
            } else {
                $target.velocity( 'slideDown' );
                $parent.find( 'svg' ).velocity({
                    rotateZ: '90deg'
                });
            }
        });
    } );

}( $ ));
