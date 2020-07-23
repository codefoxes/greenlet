import Bar from './Bar'
import Resizer from './Resizer'
import styles from './Media.scss'

import { resizePreview, endResizePreview } from './MediaHandler'

function Canvas () {
	React.useEffect( () => {
		cw.Evt.emit( 'cw-media-loaded' )
	}, [] )

	return (
		<>
			<Bar />
			<Resizer onResize={ resizePreview } onEnd={ endResizePreview } />
			<style type="text/css">{ styles }</style>
		</>
	)
}

export default Canvas
