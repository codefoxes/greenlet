function RowItems( { props } ) {
	const { row, i, pos, updateRows } = props

	const expandItem = () => {
	}

	const removeItem = ( col, item ) => {
		updateRows( ( prev ) => {
			prev[ i ].items[ col ].splice( prev[ i ].items[ col ].indexOf( item ), 1 )
			return prev
		} )
	}

	const hasItems = () => {
		let has = false
		if ( 'items' in row ) {
			has = Object.entries( row.items ).some( ( [ c, items ] ) => ( items.length > 0 ) )
		}
		return has
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
									{ items.map( ( item ) => (
										<div key={ item } className="col-item">
											<div className="item-id" tabIndex="0" onClick={ () => expandItem() }>{ item }</div>
											<div className="item-x" tabIndex="0" onClick={ () => removeItem( col, item ) }>X</div>
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
