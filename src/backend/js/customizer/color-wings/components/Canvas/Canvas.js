import styles from '../../ColorWings.scss'
import Panel from './Panel'

function Canvas () {
	return (
		<div id="cw-canvas" >
			<Panel />
			<style type="text/css">{ styles }</style>
		</div>
	)
}

export default Canvas
