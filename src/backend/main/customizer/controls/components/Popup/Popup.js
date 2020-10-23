function Popup( props ) {
	const [ popState, setPopState ] = React.useState( {
		show: false,
		style: {
			content: { top: 0 },
			arrow: { right: 0 }
		}
	} )

	props.onClose( () => {
		setPopState( prev => ( { ...prev, show: false } ) )
	} )

	const popupNow = ( e ) => {
		let { widthSelector } = props
		if ( undefined === widthSelector ) {
			widthSelector = '.customize-control'
		}

		const widthEl = e.target.closest( widthSelector )
		let elRect
		if ( null !== widthEl ) {
			elRect = widthEl.getBoundingClientRect()
		} else {
			elRect = document.body.getBoundingClientRect()
		}

		const clientRect = e.target.getBoundingClientRect()
		const parentRect = e.target.offsetParent.getBoundingClientRect()
		const content = {
			marginLeft: elRect.left - parentRect.left,
			width: elRect.width
		}
		const arrow = {
			left: clientRect.left - elRect.left + ( clientRect.width / 2 ),
		}

		setPopState( prevPopState => ( { show: ! prevPopState.show, style: { content, arrow } } ) )
	}

	return (
		<div className={ `cw-popup ${ popState.show ? 'shown' : '' }` }>
			<button className={ `cw-popup-button ${ props.className }` } onClick={ popupNow } type="button">{ props.children[ 0 ] }</button>
			<div className={ `cw-popup-overlay ${ popState.show ? '' : 'hidden' }` } onClick={ () => setPopState( prev => ( { ...prev, show: false } ) ) } />
			<div className={ `cw-popup-content ${ popState.show ? '' : 'hidden' }` } style={ popState.style.content }>
				<div className="cw-popup-arrow" style={ popState.style.arrow } />
				{ props.children[ 1 ] }
			</div>
		</div>
	)
}

export default Popup
