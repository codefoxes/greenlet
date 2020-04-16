import { FocusStore, useStore } from './FocusStore'

function FocusDetails() {

	const { focusDetails } = useStore( FocusStore )

	return (
		<div id="cw-focus-details" className="cw-focus-details" style={ focusDetails.style } >
			<div id="cw-focus-selector" className="cw-selector">{ focusDetails.selector }</div>
		</div>
	)
}

export default FocusDetails
