/**
 * Color Control.
 *
 * @package greenlet
 */

wp.customize.controlConstructor['gl-color'] = wp.customize.Control.extend(
	{
		ready: function() {
			const { Color } = cw.components
			const control  = this

			const onChange = ( data ) => {
				control.setting.set( data )
			}

			const params = {
				onChange,
				label: control.params.label,
				val: control.setting._value,
			}
			params.val = ( undefined === params.val ) ? '' : params.val

			ReactDOM.render(
				<div className='cw-control'><Color { ...params } /></div>,
				document.getElementById( control.id + '-root' )
			)
		}
	}
)
