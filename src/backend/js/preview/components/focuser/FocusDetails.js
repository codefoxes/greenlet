import { FocusStore, useStore } from './FocusStore'

function FocusDetails() {

	const { focusDetails, detailsOpacity } = useStore( FocusStore )
	const styles = { ...focusDetails.style, opacity: detailsOpacity }

	return (
		<div id="cw-focus-details" className="cw-focus-details" style={ styles } >
			<div id="cw-focus-selector" className="cw-selector">{ focusDetails.selector }</div>
		</div>
	)
}

export default FocusDetails
