/**
 * Cover Layout Control.
 *
 * @package greenlet
 */

import Layout from './components/Layout'

wp.customize.controlConstructor['cover-layout'] = wp.customize.Control.extend(
	{
		ready: function() {
			const control  = this

			const updateSettings = ( rows ) => {
				const newRows = rows.map( row => ( { ...row } ) )
				control.setting.set( newRows )
			}

			ReactDOM.render( <Layout control={ control } updateSettings={ updateSettings }/>, document.getElementById( `${control.id}-root` ) )

			wp.customize.section( control.section(), function( section ) {
				section.expanded.bind( function( isExpanded ) {
					const sendCoverInit = () => wp.customize.previewer.send( 'start-customize', control.params.position )
					if ( isExpanded ) {
						sendCoverInit()
						wp.customize.previewer.bind( 'ready', sendCoverInit )
					} else {
						wp.customize.previewer.send( 'stop-customize', control.params.position )
						wp.customize.previewer.unbind( 'ready', sendCoverInit )
					}
				} )
			} )
		}
	}
)
