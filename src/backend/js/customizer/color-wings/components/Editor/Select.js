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

	const params = { search: false, printOptions: 'auto', ...props }

	const renderOptionWithCls = (props, option, snapshot, className) => (
		<button { ...props } className={ className } type="button">
			<span className={ ( 'clsName' in option ) ? option.clsName : '' }><span>{ option.name }</span></span>
		</button>
	)

	const forwardProps = {
		options: formattedOptions,
		value: props.val,
		name: props.name,
		onChange: props.onChange,
		search: params.search,
		printOptions: params.printOptions,
		className: params.horizontal ? 'select-search horizontal' : 'select-search'
	}

	if ( ( typeof options[0] === 'object' ) && ( 'clsName' in options[0] ) ) {
		forwardProps[ 'renderOption' ] = renderOptionWithCls
	}

	if ( 'renderOption' in params ) {
		forwardProps[ 'renderOption' ] = params.renderOption
	}

	return (
		<div className="cw-control-content cw-select">
			<span className="cw-control-title">{ props.label } </span>
			<SelectSearch { ...forwardProps } />
		</div>
	)
}

export default Select
