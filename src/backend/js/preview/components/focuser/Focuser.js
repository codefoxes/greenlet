import { FocusStore, useStore } from './FocusStore'

function Focuser() {
	const { focusLines, focusOpacity } = useStore( FocusStore )

	return (
		<div id="cw-focuser" style={{ opacity: focusOpacity }}>
			<div className="cw-focus-line" id="cw-focuser-top" style={ focusLines.top } />
			<div className="cw-focus-line" id="cw-focuser-right" style={ focusLines.right } />
			<div className="cw-focus-line" id="cw-focuser-bottom" style={ focusLines.bottom } />
			<div className="cw-focus-line" id="cw-focuser-left" style={ focusLines.left } />
		</div>
	)
}

export default Focuser
