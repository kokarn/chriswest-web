( function( $ ){
    $(function(){
        $( 'body' ).on( 'mouseenter mouseleave touchstart', '.js-artist-wrapper', function( event ){
            var isTouch = 'ontouchstart' in window || navigator.maxTouchPoints;
            var $target = $( event.currentTarget );
            var $animationTarget = $target.find( '.js-artist-content-wrapper' );

            if( isTouch && event.originalEvent.type !== 'touchstart' ){
                return false;
            }

            if( !$target.data( 'top-target' ) ){
                $target.data( 'top-target', $target.outerHeight() - $animationTarget.outerHeight() );
            }

            if( $target.hasClass( 'active' ) ){
                $target.removeClass( 'active' )
                $animationTarget
                    .velocity( 'stop' )
                    .velocity( {
                        top: '280px'
                    } );
            } else {
                $target.addClass( 'active' );
                $animationTarget
                    .velocity( 'stop')
                    .velocity( {
                        top: $target.data( 'top-target' )
                    } );
            }
        });
    });
})( $ );
