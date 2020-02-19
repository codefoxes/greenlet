/**
 * Multicheck Control.
 *
 * @package greenlet
 */

wp.customize.controlConstructor['multicheck'] = wp.customize.Control.extend(
	{
		ready: function() {
			var control    = this
			var checkboxes = $( control.selector + ' input[type="checkbox"]' )
			var val        = control.setting._value

			checkboxes.on(
				'change',
				function () {
					var current = $( this ).val()
					var index   = val.indexOf( current )

					if ( $( this ).prop( 'checked' ) ) {
						if ( index === - 1 ) {
							val.push( current )
						}
					} else {
						if ( index !== - 1 ) {
							val.splice( index, 1 )
						}
					}

					control.setting.set( JSON.stringify( val ) )
				}
			)
		}
	}
)
