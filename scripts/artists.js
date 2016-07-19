( function( $ ){
    function slideUp( $target, $animationTarget ){
        $target.addClass( 'active' );
        $animationTarget
            .velocity( 'stop')
            .velocity( {
                top: $target.data( 'top-target' )
            } );
    }

    function slideDown( $target, $animationTarget ){
        $target.removeClass( 'active' )
        $animationTarget
            .velocity( 'stop' )
            .velocity( {
                top: '280px'
            } );
    }

    $(function(){
        FastClick.attach( document.body );

        $( 'body' ).on( 'mouseenter mouseleave click', '.js-artist-wrapper', function( event ){
            var isTouch = 'ontouchstart' in window || navigator.maxTouchPoints;
            var $target = $( event.currentTarget );
            var $animationTarget = $target.find( '.js-artist-content-wrapper' );

            // Disable mouseneter and mouseleave on touch devices
            if( isTouch && event.type !== 'click' ){
                return false;
            }

            // Disable click on non-touch devices
            if( !isTouch && event.type === 'click' ){
                return false;
            }

            if( !$target.data( 'top-target' ) ){
                $target.data( 'top-target', $target.outerHeight() - $animationTarget.outerHeight() );
            }

            switch ( event.type ){
                case 'mouseenter':
                    slideUp( $target, $animationTarget );
                    break;
                case 'mouseleave':
                    slideDown( $target, $animationTarget );
                    break;
                case 'click':
                    if( $target.hasClass( 'active' ) ){
                        slideDown( $target, $animationTarget );
                    } else {
                        slideUp( $target, $animationTarget );
                    }
                    break;
            }
        });
    });
})( $ );
