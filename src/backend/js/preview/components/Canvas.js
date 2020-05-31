import './focuser/FocusHandler'

import Focuser from './focuser/Focuser'
import FocusDetails from './focuser/FocusDetails'
import styles from '../colorWings.scss'

function Canvas () {
	return (
		<div id="cw-canvas" >
			<FocusDetails />
			<Focuser />
			<style type="text/css">{ styles }</style>
		</div>
	)
}

export default Canvas
