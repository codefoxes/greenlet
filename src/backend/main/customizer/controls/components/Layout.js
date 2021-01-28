import RowItems from './RowItems'

function Layout( { control, updateSettings } ) {
	const { __ } = wp.i18n
	const { Tooltip } = wp.components

	const { position, choices } = control.params

	const [ expanded, setExpanded ] = React.useState( 0 )
	const [ coverRows, setRows ] = React.useState( control.setting._value.map( row => ( { ...row } ) ) )
	const [ advanced, setAdvanced ] = React.useState( control.setting._value.reduce( ( o, c, i ) => ( { ...o, [i]: false } ), {} ) )

	const capitalize = str => `${ str.charAt( 0 ).toUpperCase() }${ str.slice( 1 ) }`
	const pos = capitalize( position )

	React.useEffect( () => {
		// Set notification to save and refresh to update sidebars (by coverRows update)
		const sidebars = wp.customize.Widgets.data.registeredSidebars.map( sb => sb.id )
		control.notifications.remove( 'updateWidgets' )
		let extra = false
		coverRows.forEach( ( row, i ) => {
			row.columns.split( '-' ).forEach( ( c, j ) => {
				if ( ! sidebars.includes( `${ position }-sidebar-${ i + 1 }-${ j + 1 }` ) ) {
					extra = true
				}
			} )
		} )
		if ( extra ) {
			const message = __( 'Extra widget areas are added. Please save and refresh this page to reflect new Widget areas', 'greenlet' )
			const notification = new wp.customize.Notification( 'updateWidgets', { message:  `${ message } (${ pos } Sidebars)`, type: 'info' } )
			control.notifications.add( 'updateWidgets', notification )
		}
	}, [ coverRows ] )

	const updateRows = ( cb ) => {
		setRows( prev => {
			const newRows = cb( JSON.parse( JSON.stringify( prev ) ) )
			updateSettings( newRows )
			return newRows
		} )
	}

	const toggleRow = ( e, i ) => {
		e.stopPropagation()
		setExpanded( prev => ( prev === i ) ? -1 : i )
	}

	const toggleAdvanced = ( e, i ) => {
		const val = e.currentTarget.checked
		setAdvanced( prev => ( { ...prev, [ i ]: val } ) )
	}

	const changePrimary = ( e, i ) => {
		e.stopPropagation()
		setRows( ( prev ) => {
			const rows = prev.map( row => ( { ...row } ) )
			rows.forEach( ( r, m ) => {
				r[ 'primary' ] = ( m === i )
			} )
			updateSettings( rows )
			return rows
		} )
	}

	const changeSticky = ( i ) => {
		setRows( ( prev ) => {
			const rows = prev.map( row => ( { ...row } ) )
			rows[ i ][ 'sticky' ] = ! rows[ i ][ 'sticky' ]
			updateSettings( rows )
			return rows
		} )
	}

	const changeColumns = ( e, i ) => {
		const columns = e.currentTarget.value
		setRows( ( prev ) => {
			const rows = prev.map( row => ( { ...row } ) )
			rows[ i ][ 'columns' ] = columns
			updateSettings( rows )
			return rows
		} )
	}

	const changeVertical = ( e, i ) => {
		const vertical = e.currentTarget.value
		setRows( ( prev ) => {
			const rows = prev.map( row => ( { ...row } ) )
			rows[ i ][ 'vertical' ] = vertical
			updateSettings( rows )
			return rows
		} )
	}

	const deleteRow = ( i ) => {
		const confirmed = window.confirm( `Are you sure you want to remove ${ position } ${ i + 1 }` )
		if ( ! confirmed ) return
		setRows( ( prev ) => {
			const rows = prev.map( row => ( { ...row } ) )
			rows.splice( i, 1 )
			updateSettings( rows )
			return rows
		} )
	}

	const addRow = ( placement ) => {
		setRows( ( prev ) => {
			const rows = prev.map( row => ( { ...row } ) )
			const newRow = { columns: '12' }
			if ( 'before' === placement ) {
				rows.unshift( newRow )
			} else {
				rows.push( newRow )
			}
			updateSettings( rows )
			return rows
		} )
	}

	return (
		<div className="layout-wrap">
			<div className="add-wrap add-before">
				<Tooltip text={ __( 'Add Header', 'greenlet' ) } position="top center">
					<button type="button" className="add-button" onClick={ () => addRow( 'before' ) }><span className="dashicons dashicons-plus-alt2" /></button>
				</Tooltip>
			</div>
			{ coverRows.map( ( row, i ) => (
				<div key={ i } className={ `row ${ ( expanded === i ) ? 'expanded' : '' }` }>
					<div className="row-title" onClick={ ( e ) => toggleRow( e, i ) }>
						{ `${ pos } ${ i + 1 }` }
						<Tooltip text={ `${ row.primary ? __( 'Main', 'greenlet' ) : __( 'Make this Main', 'greenlet' ) } ${ pos }` } position="top left">
							<button type="button" className={ `make-primary${ row.primary ? ' is-primary' : '' }` } onClick={ ( e ) => changePrimary( e, i ) }><span className={ `dashicons dashicons-star-${ row.primary ? 'filled' : 'empty' }` } /></button>
						</Tooltip>
						<button type="button" className="toggler" onClick={ ( e ) => toggleRow( e, i ) }><span className="dashicons dashicons-arrow-down" /></button>
					</div>
					<div className="row-content">
						<div className="layout-control customize-control-checkbox">
							<span className="customize-inside-control-row">
								<input id={ `_customize-input-cover_layout_${ pos }-${ i }-sticky` } type="checkbox" defaultChecked={ row.sticky } onChange={ () => changeSticky( i ) }/>
								<label htmlFor={ `_customize-input-cover_layout_${ pos }-${ i }-sticky` }>{ __( 'Sticky', 'greenlet' ) }</label>
							</span>
						</div>
						<div className="layout-control customize-control-template">
							<span className="title">{ __( 'Select Columns Layout', 'greenlet' ) }</span>
							<div className="gl-radio-images">
								{ Object.entries( choices ).map( ( [ key, choice ] ) => (
									<div key={ key } className="gl-radio-image">
										<label>
											<input type="radio" name={ `${ pos }-${ i }-template` } value={ key } onChange={ ( e ) => changeColumns( e, i ) } defaultChecked={ row.columns === key } />
											<div className="icon" dangerouslySetInnerHTML={ { __html: choice } } />
											<span className="template-name">{ key }</span>
										</label>
									</div>
								) ) }
							</div>
						</div>
						<RowItems props={ { row, i, pos, updateRows, control } } />
						<div className={ `advanced ${ advanced[ i ] ? 'open': '' }` }>
							<div className="layout-control">
								<label>
									<span className="title">{ __( 'Enter column numbers separated by hyphen.', 'greenlet' ) }<br />Eg: <code>5-7</code> or <code>6-3-3</code>. { __( 'Sum should be', 'greenlet' ) } <code>12</code></span>
									<input type="text" onChange={ ( e ) => changeColumns( e, i ) } />
								</label>
							</div>
							<div className="layout-control gl-row">
								<div className="col-4">
									<label htmlFor={ `_customize-input-cover_layout_${ pos }-${ i }-vertical` }>{ __( 'Vertical', 'greenlet' ) }</label>
								</div>
								<div className="col-8">
									<select id={ `_customize-input-cover_layout_${ pos }-${ i }-vertical` } defaultValue={ row.vertical } onChange={ ( e ) => changeVertical( e, i ) } >
										<option value="no">{ __( 'No', 'greenlet' ) }</option>
										<option value="left">{ __( 'Left', 'greenlet' ) }</option>
										<option value="right">{ __( 'Right', 'greenlet' ) }</option>
									</select>
								</div>
							</div>
						</div>
						<div className="row-footer">
							<button type="button" className="delete" onClick={ () => deleteRow( i ) }>{ `${ __( 'Delete', 'greenlet' ) } ${ pos } ${ i + 1 }` }</button>
							<div className="advanced-toggle">
								<label>
									<span>{ advanced[ i ] ? __( 'Hide', 'greenlet' ) : __( 'Show', 'greenlet' ) } { __( 'Advanced', 'greenlet' ) }</span>
									<input type="checkbox" className="check" onChange={ ( e ) => toggleAdvanced( e, i ) } />
								</label>
							</div>
						</div>
					</div>
				</div>
			) ) }
			<div className="add-wrap add-after">
				<Tooltip text={ __( 'Add Header', 'greenlet' ) } position="bottom center">
					<button type="button" className="add-button" onClick={ () => addRow() } ><span className="dashicons dashicons-plus-alt2" /></button>
				</Tooltip>
			</div>
		</div>
	)
}

export default Layout
