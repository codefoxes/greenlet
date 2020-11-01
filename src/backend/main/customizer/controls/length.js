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
				subType: 'size',
				val: control.setting._value,
				units: {
					'px': { step: 1, min: 0, max: 2000 },
					'%': { step: 1, min: 0, max: 100 },
				}
			}
			params.val = ( undefined === params.val ) ? '' : params.val

			ReactDOM.render(
				<div className='cw-control'><Length { ...params } /></div>,
				document.getElementById( control.id + '-root' )
			)
		}
	}
)
