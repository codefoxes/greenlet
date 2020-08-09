/**
 * Template Control.
 *
 * @package greenlet
 */

import { $, debounce } from '../Helpers'

wp.customize.controlConstructor['template'] = wp.customize.Control.extend(
	{
		ready: function () {
			var control  = this
			var radios   = $( control.selector + ' input[type="radio"]' )
			var rawInput = $( control.selector + ' #' + control.id + '-text' )

			var setValue = function( value, element ) {
				if ( element === 'input' ) {
					rawInput.val( value )
				} else if ( element === 'radios' ) {
					radios.val( [ value ] )
				}
				control.setting.set( value )
			}

			rawInput.on( 'input', debounce( function() { setValue( this.value, 'radios' ) }, 500 ) )
			radios.on( 'change', function () { setValue( this.value, 'input' ) } )
		}
	}
)
