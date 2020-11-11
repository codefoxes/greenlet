import { debounce } from './Helpers'

export const scrollTo = ( val ) => {
	greenletData.to_top_at = val
	let to = 0;
	if ( val.includes( 'px' ) ) {
		to = parseInt( val.split( 'px' )[ 0 ], 10 )
	} else if ( val.includes( '%' ) ) {
		to = ( parseInt( val.split( '%' )[ 0 ], 10 ) * ( document.body.offsetHeight - window.innerHeight ) / 100 )
	}
	window.scrollTo( 0, to )
}

export const dScrollTo = debounce( scrollTo, 40, true )

export const toggleToTop = ( val ) => {
	const btn = document.getElementsByClassName( 'to-top' )
	if ( 0 === btn.length ) return

	if ( true === val ) {
		btn[ 0 ].style.display = ''
	} else {
		btn[ 0 ].style.display = 'none'
	}
}
