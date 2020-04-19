import './focuser/FocusHandler'

import Focuser from './focuser/Focuser'
import FocusDetails from './focuser/FocusDetails'

function Canvas () {
	return (
		<div id="cw-canvas" >
			<FocusDetails />
			<Focuser />
		</div>
	)
}

export default Canvas
