import { clone } from '../../Helpers'
import Sorter from './Sorter'

function ContentLayout( { control, updateSettings } ) {
	const initItems = clone( control.setting._value )

	const initFlat = []
	const allFlat = []
	Object.values( control.params.default ).forEach( v => { v.forEach( i => allFlat.push( i.id ) ) } )

	// Format initItems by adding values to default/setting values from Items.
	for ( const group in initItems ) {
		if ( ! initItems.hasOwnProperty( group ) ) continue
		initItems[ group ].forEach( item => {
			item.name = control.params.items[ item.id ]
			item.visible = ! ( ( 'visible' in item ) && ! item.visible )
			if ( 'meta' in item ) {
				if ( 'layout' in item.meta ) {
					item.meta.layout.val.forEach( metaItem => {
						metaItem.name = control.params.items[ `meta:${ item.id }` ][ metaItem.id ]
						metaItem.visible = ! ( ( 'visible' in metaItem ) && ! metaItem.visible )
					} )
				}
				for ( const ctrl in item.meta ) {
					if ( ! item.meta.hasOwnProperty( ctrl ) ) continue
					if ( ctrl in control.params.items.controls ) {
						item.meta[ ctrl ] = { ...item.meta[ ctrl ], ...control.params.items.controls[ ctrl ] }
					}
				}
			}
			initFlat.push( item.id )
		} )
	}

	allFlat.forEach( itemId => {
		if ( ! initFlat.includes( itemId ) ) {
			initItems[ Object.keys( initItems ).pop() ].push( { id: itemId, name: control.params.items[ itemId ], visible: false } )
		}
	} )

	const [ state, setState ] = React.useState( initItems )

	const updateNow = ( current = false ) => {
		if ( current === false ) current = state
		const formatted = {}
		for ( const group in current ) {
			if ( ! current.hasOwnProperty( group ) ) continue
			formatted[ group ] = []
			current[ group ].forEach( item => {
				const fItem = { id: item.id, visible: item.visible }
				if ( 'meta' in item ) {
					fItem.meta = {}
					for ( const ctrl in item.meta ) {
						if ( ! item.meta.hasOwnProperty( ctrl ) ) continue
						if ( item.meta[ ctrl ].type === 'sorter' ) {
							fItem.meta[ ctrl ] = { val: item.meta[ ctrl ].val.map( vi => ( { id: vi.id, visible: vi.visible } ) ) }
						} else {
							fItem.meta[ ctrl ] = { val: item.meta[ ctrl ].val }
						}
					}
				}
				formatted[ group ].push( fItem )
			} )
		}
		updateSettings( formatted )
	}

	const onChange = ( list, group, update = false ) => {
		setState( prev => {
			const current = clone( prev )
			current[ group ] = list
			;( update === true ) && updateNow( current );
			return current
		} )
	}

	const [ hiddens, setHiddens ] = React.useState( [] )
	const onPreviewChange = ( previewObject ) => {
		setHiddens( ( control.params.id === 'content_layout_list' ) && previewObject.pages.is_home ? [ 'above' ] : [] )
	}

	React.useEffect( () => {
		cw.Evt.on( 'preview-object-ready', onPreviewChange )
	}, [] )

	return (
		<>
			<span className="customize-control-title">{ control.params.label }</span>
			<div className={ `gl-sorter ${ control.params.cls }` }>
				{ control.params.groups.map( group => (
					<div className={ `group ${ group }${ hiddens.includes( group ) ? ' hidden' : '' }` } key={ group }>
						<div className="group-inner">
							{ control.params.groups.length > 1 && <div className="group-title">{ group }</div> }
							<Sorter
								items={ state[ group ] }
								group={ ( ( control.params.id === 'content_layout_list' ) && [ 'above', 'below' ].includes( group ) ) ? `${ control.params.id }-${ group }` : control.params.id }
								onChange={ ( list, update ) => onChange( list, group, update ) }
								onEnd={ () => updateNow() }
							/>
						</div>
					</div>
				) ) }
			</div>
		</>
	)
}

export default ContentLayout
