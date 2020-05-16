import SelectSearch from 'react-select-search'

/**
 * Select Control for dropdown selection.
 *
 * @return {mixed}
 */
function Select( props ) {
	const { options } = props
	let formattedOptions = options

	if ( ! Array.isArray( options ) || options.length === 0 ) {
		return null
	}
	if ( typeof options[0] !== 'object' ) {
		formattedOptions = options.map( option => ( { name: option, value: option } ) )
	}

	return (
		<div className="cw-control-content color-picker">
			<span className="cw-control-title">{ props.label } </span>
			<SelectSearch options={ formattedOptions } defaultValue={ props.val } name={ props.name } onChange={ props.onChange } />
		</div>
	)
}

export default Select
