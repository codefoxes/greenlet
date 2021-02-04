import { ReactSortable } from 'react-sortablejs'

import { clone } from '../../Helpers'

function Sorter( { items, group, onChange, onEnd } ) {
	const changeMeta = ( i, ctrl, metaList, update = false ) => {
		const current = clone( items )
		current[ i ].meta[ ctrl ].val = metaList
		onChange( current, update )
	}

	const toggleVisible = ( i ) => {
		const current = clone( items )
		current[ i ] = { ...current[ i ], visible: ! current[ i ].visible }
		onChange( current, true )
	}

	const toggleMeta = ( i ) => {
		const current = clone( items )
		current[ i ] = { ...current[ i ], open: ( 'open' in current[ i ] ) ? ! current[ i ].open : true }
		onChange( current )
	}

	const getEscaped = ( char ) => {
		const chars = { '&nbsp;': '\u00A0', '&ndash;': '\u002013', '&mdash;': '\u002014', '&brvbar;': '\u00A6', '&bull;': '\u002022', '&tri;': '\u002023', '&hellip;': '\u002026', '&lsaquo;': '\u002039', '&rsaquo;': '\u00203A', '&laquo;': '\u00AB', '&raquo;': '\u00BB' }
		return ( char in chars ) ? chars[ char ] : char
	}

	return (
		<ReactSortable list={ items } setList={ onChange } group={ group } animation={ 150 } handle={ '.handle' } className="sortable" onEnd={ onEnd }>
			{ items.map( ( item, i ) => (
				<div key={ item.id } className={ `item${ item.visible ? '' : ' hidden-item' }` }>
					<span className="handle">::</span>
					<span className="title">{ item.name }</span>
					<button type="button" onClick={ () => toggleVisible( i ) }><span className={ `dashicons dashicons-${ item.visible ? 'visibility' : 'hidden' }` } /></button>
					{ ( 'meta' in item ) && (
						<>
							<button type="button" className={ `toggler${ item.open ? ' open' : '' }` } onClick={ () => toggleMeta( i ) }><span className={ `dashicons dashicons-arrow-down-alt2` } /></button>
							<div className={ `item-meta${ item.open ? ' open' : '' }` }>
								{ Object.entries( item.meta ).map( ( [ ctrl, meta ] ) => {
									return (
										<div key={ ctrl } className={ `meta-control meta-${ ctrl } control-${ meta.type }` }>
											{ meta.label && <div className="control-label">{ meta.label }</div> }
											{ meta.desc && <div className="control-description">{ meta.desc }</div> }
											{ ( meta.type === 'sorter' ) && (
												<Sorter items={ meta.val } group={ `${ group }-layout` } onChange={ ( metaList, update ) => changeMeta( i, ctrl, metaList, update ) } onEnd={ onEnd }/>
											) }
											{ ( meta.type === 'input' ) && (
												<input type="text" defaultValue={ getEscaped( meta.val ) } onChange={ ( e ) => changeMeta( i, ctrl, e.target.value, true ) }/>
											) }
											{ ( meta.type === 'number' ) && (
												<input type="number" defaultValue={ getEscaped( meta.val ) } onChange={ ( e ) => changeMeta( i, ctrl, e.target.value, true ) }/>
											) }
											{ ( meta.type === 'radio' ) && (
												<>
													{ Object.entries( meta.choices ).map( ( [ choice, label ] ) => (
														<label key={ choice }>
															<input type="radio" name={ ctrl } value={ choice } checked={ choice === meta.val } onChange={ ( e ) => changeMeta( i, ctrl, e.target.value, true ) }/>
															<span>{ label }</span>
														</label>
													) ) }
												</>
											) }
										</div>
									)
								} ) }
							</div>
						</>
					) }
				</div>
			) ) }
		</ReactSortable>
	)
}

export default Sorter
