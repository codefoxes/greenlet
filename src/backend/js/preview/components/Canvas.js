import './focuser/FocusHandler'

import Focuser from './focuser/Focuser'
import FocusDetails from './focuser/FocusDetails'
import DomTree from './domtree/DomTree'

function Canvas () {
	return (
		<div id="cw-canvas" >
			<FocusDetails />
			<Focuser />
			<DomTree />
		</div>
	)
}

export default Canvas
