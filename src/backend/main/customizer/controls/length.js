/**
 * Length Control.
 *
 * @package greenlet
 */

wp.customize.controlConstructor['length'] = wp.customize.Control.extend(
	{
		ready: function() {
			const { Length } = cw.components
			const control  = this

			const onChange = ( data ) => {
				control.setting.set( data )
			}

			const params = {
				onChange,
				label: control.params.label,
				subType: control.params.subType,
				val: control.setting._value,
				units: control.params.units
			}
			params.val = ( undefined === params.val ) ? '' : params.val

			ReactDOM.render(
				<div className='cw-control'><Length { ...params } /></div>,
				document.getElementById( control.id + '-root' )
			)
		}
	}
)
