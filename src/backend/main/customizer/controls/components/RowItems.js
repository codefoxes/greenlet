import SelectSearch from 'react-select-search'
import { debounce } from '../../Helpers'

function RowItems( { props } ) {
	const { row, i, pos, updateRows, items } = props

	const expandItem = ( e ) => {
		e.currentTarget.parentNode.classList.toggle( 'open' )
	}

	const removeItem = ( col, item ) => {
		updateRows( ( prev ) => {
			prev[ i ].items[ col ].splice( prev[ i ].items[ col ].indexOf( item ), 1 )
			return prev
		} )
	}

	const hasItems = () => {
		return ( 'items' in row ) ? Object.entries( row.items ).some( ( [ c, items ] ) => ( items.length > 0 ) ) : false
	}

	const ColItemProps = ( { col, index, item } ) => {
		const meta = ( item in items && 'meta' in items[ item ] ) ? items[ item ].meta : false
		const currentMeta = row.items[ col ][ index ].meta
		const hasQuery = ( currentMeta && ( 'target' in currentMeta ) && ( 'query' !== currentMeta.target ) )

		const onChange = ( val, propKey ) => {
			updateRows( ( prev ) => {
				if ( 'meta' in prev[ i ].items[ col ][ index ] ) {
					prev[ i ].items[ col ][ index ].meta[ propKey ] = val
				} else {
					prev[ i ].items[ col ][ index ] = { id: item, meta: { [ propKey ]: val } }
				}
				console.log(prev)
				return prev
			} )
		}

		const debouncedChange = debounce( onChange, 500 )

		const renderProp = ( propKey, prop ) => {
			if ( 'select' === prop.type ) {
				const forwardProps = {
					options: Object.entries( prop.items ).map( ( [ value, name ] ) => ( { name, value } ) ),
					value: currentMeta[ propKey ],
					onChange: val => onChange( val, propKey ),
				}

				return <SelectSearch { ...forwardProps } />
			} else if ( 'input' === prop.type ) {
				return <input type="text" className="prop-control" defaultValue={ currentMeta[ propKey ] } onChange={ e => debouncedChange( e.target.value, propKey ) } />
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

	return (
		<div className="layout-control layout-control-items">
			{ ! hasItems() ? (
				<div className="cols-title">{ pos } { i + 1 } does not have any items in it's columns. Drag items from below or add widgets via { pos } Widget Areas.</div>
			) : ( <>
				<div className="cols-title">{ pos } { i + 1 } Items</div>
				<div className="cover-layout-cols-items">
					{ Object.entries( row.items ).map( ( [ col, items ] ) => {
						return ( items.length !== 0 ) ? (
							<div key={ col } className="cover-layout-col gl-row">
								<div className="col-name col-2">col-{ col }</div>
								<div className="col-items col-10">
									{ items.map( ( item, j ) => (
										<div key={ item } className="col-item">
											<div className="item-id" tabIndex="0" onClick={ ( e ) => expandItem( e ) }>{ item.id ? item.id : item }</div>
											<div className="item-x" tabIndex="0" onClick={ () => removeItem( col, item ) }>X</div>
											<ColItemProps col={ col } index={ j } item={ item.id ? item.id : item } />
										</div>
									) ) }
								</div>
							</div>
						) : null
					} ) }
				</div>
			</> ) }
		</div>
	)
}

export default RowItems
