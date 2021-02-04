import { ReactSortable } from 'react-sortablejs'

import Popup from './Popup/Popup'
import { debounce, clone } from '../../Helpers'

function RowItems( { props } ) {
	const { __ } = wp.i18n

	const { row, i, pos, updateRows, control } = props
	const { items } = control.params
	const cols = row.columns.split( '-' )
	const [ expanded, setExpanded ] = React.useState( -1 )

	let closePop = () => {}
	const onClose = ( cb ) => {
		closePop = cb
	}

	const openSidebar = ( col ) => {
		const sidebar = `${ pos.toLowerCase() }-sidebar-${ i + 1 }-${ col }`
		const section = wp.customize.section( `sidebar-widgets-${ sidebar }`)
		if ( section === undefined ) {
			control.notifications.remove( 'updateWidgets' )
			const notification = new wp.customize.Notification( 'updateWidgets', { message: __( 'Please save and refresh this page to reflect the newly added Widget areas', 'greenlet' ), type: 'warning' } )
			control.notifications.add( 'updateWidgets', notification )
			return
		}
		section.expand( { duration: 0 } )
		const parent = document.querySelector( `#sub-accordion-section-sidebar-widgets-${ sidebar } .customize-section-title` )
		const btn = document.createElement( 'button' )
		btn.classList.add( 'customize-section-back', 'back-to-layout' )
		btn.type = 'button'
		btn.innerHTML = '<span class="screen-reader-text">Back</span>'
		parent.insertBefore( btn, parent.getElementsByTagName( 'h3' )[ 0 ] )

		btn.onclick = () => {
			const backSection = wp.customize.section( `${ pos.toLowerCase() }_section` )
			backSection.expand()
			btn.remove()
		}
	}

	const onClickItem = ( item, col, k ) => {
		setExpanded( prev => ( prev === `${col}-${k}` ) ? -1 : `${col}-${k}` )
	}

	const addItem = ( col, item ) => {
		updateRows( ( prev ) => {
			const formatted = { id: item.id }
			if ( 'meta' in item ) {
				const meta = {}
				for ( const propKey in item.meta ) {
					if ( 'items' in item.meta[ propKey ] ) {
						const keys = Object.keys( item.meta[ propKey ].items )
						meta[ propKey ] = ( keys.length > 0 ) ? keys[ 0 ] : ''
					}
				}
				formatted.meta = meta
			}
			if ( 'items' in prev[ i ] ) {
				if ( col in prev[ i ].items ) {
					prev[ i ].items[ col ].push( formatted )
				} else {
					prev[ i ].items[ col ] = [ formatted ]
				}
			} else {
				prev[ i ].items = { [ col ]: [ formatted ] }
			}
			return prev
		} )
		closePop()
	}

	const removeItem = ( col, k ) => {
		updateRows( ( prev ) => {
			prev[ i ].items[ col ].splice( k, 1 )
			return prev
		} )
	}

	const ColItemProps = ( { col, index, item } ) => {
		if ( item === 'widgets' ) {
			return <div className="item-props expandable"><button type="button" className="item-prop" onClick={ () => openSidebar( col ) }>{ __( 'Add/Edit widgets', 'greenlet' ) }</button></div>
		}

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

		const { Select } = cw.components

		const renderProp = ( propKey, prop ) => {
			const defaultValue = ( currentMeta !== undefined ) ? currentMeta[ propKey ] : ''
			if ( 'select' === prop.type ) {
				const forwardProps = {
					options: Object.entries( prop.items ).map( ( [ value, name ] ) => ( { name, value } ) ),
					val: defaultValue,
					onChange: val => onChange( val, propKey ),
				}
				if ( ( forwardProps.options.length === 0 ) && ( 'empty' in prop ) ) {
					return <span>{ prop.empty }</span>
				}
				return <Select { ...forwardProps } />
			} else if ( 'input' === prop.type ) {
				return <input type="text" className="prop-control" defaultValue={ defaultValue } onChange={ e => debouncedChange( e.target.value, propKey ) } />
			}
		}

		return !! meta ? (
			<div className="item-props expandable">
				{ Object.entries( meta ).map( ( [ propKey, prop ] ) => {
					if ( ( 'items' in prop ) && ( Object.keys( prop.items ).length === 0 ) && ( 'empty' in prop ) ) {
						return <div key={ propKey } className="empty-message">{ prop.empty }</div>
					} else {
						return (
							<div key={ propKey } className={ `item-prop ${ ( hasQuery && 'input' === prop.type) ? 'hidden' : '' }` }>
								<span className="prop-title">{ prop.name }</span>
								{ renderProp( propKey, prop ) }
							</div>
						)
					}
				 } ) }
			</div>
		) : null
	}

	const Sorter = ( { rowItems, col } ) => {
		const [ list, setList ] = React.useState( clone( rowItems ) )

		const onEnd = () => {
			const currentItems = list.map( itm => ( { id: itm.id } ) )
			updateRows( prev => {
				const current = clone( prev )
				current[ i ].items[ col ] = currentItems
				return current
			} )
		}

		return (
			<ReactSortable list={ list } setList={ setList } animation={ 150 } handle={ '.drag-handle' } className="sortable" onEnd={ onEnd }>
				{ rowItems.map( ( item, k ) => (
					<div key={ `${col}-${k}` } className={ `gl-col-item${ ( expanded === `${col}-${k}` ) ? ' open' : '' }` }>
						<div className="item-id" onClick={ () => onClickItem( item.id ? item.id : item, col, k ) }>
							<span className="drag-handle">::</span>
							<span>{ item.id ? item.id : item }</span>
						</div>
						<button className="item-x" onClick={ () => removeItem( col, k ) }>
							<span className="dashicons dashicons-trash" />
						</button>
						<ColItemProps col={ col } index={ k } item={ item.id ? item.id : item } />
					</div>
				) ) }
			</ReactSortable>
		)
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
							<div className="col-items col-10">
								<Sorter rowItems={ rowItems } col={ col } />
								<Popup className="add-button" widthSelector=".col-items" onClose={ onClose }>
									<span className="dashicons dashicons-plus-alt2" />
									<div className="layout-items">
										{ Object.entries( items ).map( ( [ id, item ] ) => (
											<button key={ id } className="layout-item" type="button" onClick={ () => addItem( col, item ) }>{ item.name }</button>
										) ) }
									</div>
								</Popup>
							</div>
						</div>
					)
				} ) }
			</div>
		</div>
	)
}

export default RowItems
