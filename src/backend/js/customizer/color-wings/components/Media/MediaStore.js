import { Store, useStore } from '../../../../common/Store'

const initialState = {
	currentPreviewWidth: 0,
	breakpoints: [],
	queries: {},
	currentMedia: { key: '', query: 'all' }
}

class MediaClass extends Store {
	setInitialMediaQueries( mediaQueries ) {
		const queries = {}
		const breakpoints = []
		mediaQueries.forEach( ( query ) => {
			if ( query === 'all' ) { return }
			const minMatch = query.match( /\d*(min-width):\s*(\d+\s?)(px)/ )
			const maxMatch = query.match( /\d*(max-width):\s*(\d+\s?)(px)/ )
			if ( minMatch === null && maxMatch === null ) { return }

			let min = 0, max = 5000
			if ( minMatch !== null ) {
				min = Number( minMatch[ 2 ] )
				if ( breakpoints.indexOf( min ) === -1 ) breakpoints.push( min )
			}
			if ( maxMatch !== null ) {
				max = Number( maxMatch[ 2 ] )
				if ( breakpoints.indexOf( max ) === -1 ) breakpoints.push( max )
			}
			queries[ `${ min }-${ max }`] = { min, max, enabled: true }
		} )
		this.set( () => ( { queries, breakpoints } ) )
	}

	addBreakpoint() {
		const prepareQueries = ( breakpoints ) => {
			const points = [ 0 , ...breakpoints, 5000 ]
			const pairs = {}
			for ( let i = 0; i < points.length - 1; i++ ) {
				for ( let j = i; j < points.length - 1; j++ ) {
					if ( ( i === 0 ) && ( j === points.length - 2 ) ) { continue }
					pairs[ `${ points[ i ] }-${ points[ j + 1 ] }` ] = { min: points[ i ], max: points[ j + 1 ], enabled: ( i === j ) }
				}
			}
			return pairs
		}

		this.set( ( state ) => {
			const { breakpoints, currentPreviewWidth } = state
			if ( breakpoints.indexOf( currentPreviewWidth ) === -1 ) {
				breakpoints.push( currentPreviewWidth )
			}
			breakpoints.sort( ( a, b ) => ( a - b ) )
			const queries = prepareQueries( breakpoints )
			return { breakpoints, queries }
		} )
	}

	updatePreviewWidth( currentPreviewWidth ) {
		this.set( () => ( { currentPreviewWidth } ) )
	}

	toggleEnabled( queryKey, state = false ) {
		this.set( ( prev ) => {
			const { queries } = prev
			queries[ queryKey ].enabled = state ? state : ! queries[ queryKey ].enabled
			return { queries }
		} )
	}

	activateQuery( queryKey ) {
		const getQuery = ( q ) => `${q.min !== 0 ? '(min-width: ' + q.min + 'px)' : '' }${ q.min !== 0 && q.max !== 5000 ? ' and ' : '' }${ q.max !== 5000 ? '(max-width: ' + q.max + 'px)' : '' }`
		this.set( ( prev ) => ( { currentMedia: { key: queryKey, query: getQuery( prev.queries[ queryKey ] ) } } ) )
		this.toggleEnabled( queryKey, true )
	}

	removeBreakpoint( breakpoint ) {
		this.set( ( prev ) => {
			const breakpoints = prev.breakpoints.filter( point => ( point !== breakpoint ) )
			const queries = Object.filter( prev.queries, ( [ k, query ] ) => ( ( query.min !== breakpoint ) && ( query.max !== breakpoint ) ) )
			return { queries, breakpoints }
		} )
	}
}

const MediaStore = new MediaClass( initialState )

export { MediaStore, useStore }
