/**
 * Content Layout Control.
 *
 * @package greenlet
 */

import ContentLayout from './components/ContentLayout'

wp.customize.controlConstructor['content-layout'] = wp.customize.Control.extend(
	{
		ready: function() {
			const control  = this

			const updateSettings = ( val ) => {
				control.setting.set( val )
			}

			ReactDOM.render( <ContentLayout control={ control } updateSettings={ updateSettings }/>, document.getElementById( `${control.id}-root` ) )
		}
	}
)
