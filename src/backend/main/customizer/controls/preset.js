/**
 * Preset Control.
 *
 * @package greenlet
 */

import { $, clone } from '../Helpers'

wp.customize.controlConstructor['preset'] = wp.customize.Control.extend(
	{
		ready: function () {
			var control = this
			var radios  = $( control.selector + ' input[type="radio"]' )

			var defaultPreset = control.params.presets['Default']
			const cw = clone( defaultPreset.color_wings )
			defaultPreset.color_wings = wp.customize.control( 'color_wings' ).setting._value
			defaultPreset.color_wings[ cwControlObject.theme ] = cw

			var deepMerge = function(targetObject, source) {
				var target   = Object.assign( {}, targetObject )
				for ( var key in source ) {
					if ( ! Object.hasOwnProperty.call( source, key ) ) {
						continue
					}
					if ( ! ( key in target ) ) {
						target[ key ] = source[ key ]
					} else if ( ( typeof source[ key ] === 'object' ) && ! Array.isArray( source[ key ] ) ) {
						target[ key ] = deepMerge( target[ key ], source[ key ] )
					}
				}
				return target
			}

			radios.on(
				'change',
				function () {
					var confirm = window.confirm( 'This will override all customizer settings and\nApply "' + this.value + '" preset.\nProceed?' )
					if ( confirm === false ) {
						return
					}
					const preset = clone( control.params.presets[ this.value ] )
					preset.color_wings = { [ cwControlObject.theme ]: preset.color_wings }
					var currentPreset = ( this.value === 'Default' ) ? defaultPreset : deepMerge( preset, defaultPreset )
					for (var prop in currentPreset) {
						const singleControl = wp.customize.control( prop )
						if( undefined !== singleControl ) {
							singleControl.setting.set( currentPreset[ prop ] )
						}
					}
					wp.customize.previewer.refresh()
				}
			)
		}
	}
)
