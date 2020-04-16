import './focuser/FocusHandler'
import './editor/EditorHandler'

import Focuser from './focuser/Focuser'
import FocusDetails from './focuser/FocusDetails'
import Editor from './editor/Editor'

function Canvas () {
	return (
		<div id="cw-canvas" >
			<FocusDetails />
			<Focuser />
			<Editor />
		</div>
	)
}

export default Canvas
