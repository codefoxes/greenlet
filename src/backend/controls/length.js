/**
 * Length Control.
 *
 * @package greenlet
 */

import Length from './components/Length'

wp.customize.controlConstructor['length'] = wp.customize.Control.extend(
	{
		ready: function() {
			var control  = this

			ReactDOM.render(
				<Length control={ control } />,
				document.getElementById( control.id + '-root' )
			)
		}
	}
)
