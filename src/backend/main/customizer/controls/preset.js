/**
 * Preset Control.
 *
 * @package greenlet
 */

import { clone } from '../Helpers'

wp.customize.controlConstructor['preset'] = wp.customize.Control.extend(
	{
		ready: function () {
			const control = this
			const radios = document.querySelector( `${ control.selector } .gl-radio-images` )

			const defaultPreset = control.params.presets['Default']
			const cw = clone( defaultPreset.color_wings )
			defaultPreset.color_wings = clone( wp.customize.control( 'color_wings' ).setting._value )
			defaultPreset.color_wings[ cwControlObject.theme ] = cw

			const deepMerge = function(targetObject, source) {
				const target   = Object.assign( {}, targetObject )
				for ( let key in source ) {
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

			let confirmShown = false

			const onRadiosChange = function( e ) {
				if ( 'radio' !== e.target.type ) return

				let confirm = true
				if ( ! confirmShown ) {
					confirm = window.confirm( 'This will override all customizer settings and\nApply "' + this.value + '" preset.\nProceed?' )
					confirmShown = true
				}
				if ( confirm === false ) {
					return
				}
				const preset = clone( control.params.presets[ e.target.value ] )
				preset.color_wings = { [ cwControlObject.theme ]: preset.color_wings }
				const currentPreset = ( e.target.value === 'Default' ) ? defaultPreset : deepMerge( preset, defaultPreset )
				for ( let prop in currentPreset ) {
					const singleControl = wp.customize.control( prop )
					if( undefined !== singleControl ) {
						singleControl.setting.set( currentPreset[ prop ] )
					}
				}
				wp.customize.previewer.refresh()
			}

			radios.addEventListener( 'change', onRadiosChange )
		}
	}
)
