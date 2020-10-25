import SelectSearch from 'react-select-search'
import Popup from './Popup/Popup'
import { debounce, arrayMoveMutate } from '../../Helpers'

function RowItems( { props } ) {
	const { __ } = wp.i18n

	const { row, i, pos, updateRows, items } = props
	const cols = row.columns.split( '-' )
	const [ expanded, setExpanded ] = React.useState( -1 )

	let closePop = () => {}
	const onClose = ( cb ) => {
		closePop = cb
	}

	const toggleRow = ( e, i ) => {
		e.preventDefault()
		e.stopPropagation()
		setExpanded( prev => ( prev === i ) ? -1 : i )
	}

	const addItem = ( col, item ) => {
		updateRows( ( prev ) => {
			if ( 'items' in prev[ i ] ) {
				if ( col in prev[ i ].items ) {
					prev[ i ].items[ col ].push( item.id )
				} else {
					prev[ i ].items[ col ] = [ item.id ]
				}
			} else {
				prev[ i ].items = { [ col ]: [ item.id ] }
			}
			return prev
		} )
		closePop()
	}

	const removeItem = ( col, item ) => {
		updateRows( ( prev ) => {
			prev[ i ].items[ col ].splice( prev[ i ].items[ col ].indexOf( item ), 1 )
			return prev
		} )
	}

	const hasItems = () => {
		return ( 'items' in row ) ? Object.entries( row.items ).some( ( [ c, items ] ) => ( ( items !== null ) && ( items.length > 0 ) ) ) : false
	}

	const ColItemProps = ( { col, index, item } ) => {
		const meta = ( item in items && 'meta' in items[ item ] ) ? items[ item ].meta : false
		const currentMeta = row.items[ col ][ index ].meta
		const hasQuery = ( currentMeta && ( 'target' in currentMeta ) && ( 'query' !== currentMeta.target ) )

		const onChange = ( val, propKey ) => {
			updateRows( ( prev ) => {
				const colItem = prev[ i ].items[ col ][ index ]
				if ( typeof colItem === 'object' && 'meta' in colItem ) {
					prev[ i ].items[ col ][ index ].meta[ propKey ] = val
				} else {
					prev[ i ].items[ col ][ index ] = { id: item, meta: { [ propKey ]: val } }
				}
				return prev
			} )
		}

		const debouncedChange = debounce( onChange, 500 )

		const renderProp = ( propKey, prop ) => {
			const defaultValue = ( currentMeta !== undefined ) ? currentMeta[ propKey ] : ''
			if ( 'select' === prop.type ) {
				const forwardProps = {
					options: Object.entries( prop.items ).map( ( [ value, name ] ) => ( { name, value } ) ),
					value: defaultValue,
					onChange: val => onChange( val, propKey ),
				}

				return <SelectSearch { ...forwardProps } />
			} else if ( 'input' === prop.type ) {
				return <input type="text" className="prop-control" defaultValue={ defaultValue } onChange={ e => debouncedChange( e.target.value, propKey ) } />
			}
		}

		return !! meta ? (
			<div className="item-props expandable">
				{ Object.entries( meta ).map( ( [ propKey, prop ] ) => (
					<div key={ propKey } className={ `item-prop ${ ( hasQuery && 'input' === prop.type) ? 'hidden' : '' }` }>
						<span className="prop-title">{ prop.name }</span>
						{ renderProp( propKey, prop ) }
					</div>
				) ) }
			</div>
		) : null
	}

	const DragHandle = SortableHOC.SortableHandle(() => <span className="drag-handle">::</span>)
	const ColItem = SortableHOC.SortableElement(( { children } ) => ( children ) )
	const ColItems = SortableHOC.SortableContainer(( { children } ) => <div className="col-items col-10">{ children }</div> )

	const onSortEnd = ( col, from, to ) => {
		updateRows( ( prev ) => {
			arrayMoveMutate( prev[ i ].items[ col ], from, to )
			return prev
		} )
	}

	return (
		<div className="layout-control layout-control-items">
			<div className="cols-title">{ pos } { i + 1 } { __( 'Items', 'greenlet' ) }</div>
			<div className="cover-layout-cols-items">
				{ cols.map( ( width, j ) => {
					const col = j + 1
					const rowItems = ( row.items && ( col in row.items ) ) ? row.items[ col ] : []
					return (
						<div key={ col } className="cover-layout-col gl-row">
							<div className="col-name col-2">col-{ col }</div>
							<ColItems axis="xy" helperClass="gl-sort-clone" useDragHandle onSortEnd={ ( { oldIndex, newIndex } ) => onSortEnd( col, oldIndex, newIndex ) }>
								{ rowItems.map( ( item, k ) => (
									<ColItem key={ `${col}-${k}` } index={ k }>
										<div className={ `gl-col-item${ ( expanded === `${col}-${k}` ) ? ' open' : '' }` }>
											<div className="item-id" tabIndex="0" onClick={ ( e ) => toggleRow( e, `${col}-${k}` ) }>
												<DragHandle />
												<span>{ item.id ? item.id : item }</span>
											</div>
											<div className="item-x" tabIndex="0" onClick={ () => removeItem( col, item ) }>
												<span className="dashicons dashicons-trash" />
											</div>
											<ColItemProps col={ col } index={ k } item={ item.id ? item.id : item } />
										</div>
									</ColItem>
								) ) }
								<Popup className="add-button" widthSelector=".col-items" onClose={ onClose }>
									<span className="dashicons dashicons-plus-alt2" />
									<div className="layout-items">
										{ Object.entries( items ).map( ( [ id, item ] ) => (
											<button key={ id } className="layout-item" type="button" onClick={ () => addItem( col, item ) }>{ item.name }</button>
										) ) }
									</div>
								</Popup>
							</ColItems>
						</div>
					)
				} ) }
			</div>
		</div>
	)
}

export default RowItems
