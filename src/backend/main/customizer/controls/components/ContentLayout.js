import { clone } from '../../Helpers'
import Sorter from './Sorter'

function ContentLayout( { control, updateSettings } ) {
	const initItems = clone( control.setting._value )

	for ( const group in initItems ) {
		if ( ! initItems.hasOwnProperty( group ) ) continue
		initItems[ group ].forEach( item => {
			if ( 'meta' in item ) {
				for ( const ctrl in item.meta ) {
					if ( ! item.meta.hasOwnProperty( ctrl ) ) continue
					if ( ctrl in control.params.items.controls ) {
						item.meta[ ctrl ] = { ...item.meta[ ctrl ], ...control.params.items.controls[ ctrl ] }
					}
				}
			}
		} )
	}

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

	return (
		<>
			<span className="customize-control-title">{ control.params.label }</span>
			<div className={ `gl-sorter ${ control.params.cls }` }>
				{ control.params.groups.map( group => (
					<div className={ `group ${ group }` } key={ group }>
						{ control.params.groups.length > 1 && <div className="group-title">{ group }</div> }
						<Sorter items={ state[ group ] } group={ control.params.id } onChange={ ( list, update ) => onChange( list, group, update ) } onEnd={ () => updateNow() }/>
					</div>
				) ) }
			</div>
		</>
	)
}

export default ContentLayout
