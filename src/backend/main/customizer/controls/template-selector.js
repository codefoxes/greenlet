/**
 * Template Selector Control.
 *
 * @package greenlet
 */

import { $ } from '../Helpers'

wp.customize.controlConstructor['template-sequence'] = wp.customize.Control.extend(
	{
		ready: function() {
			const { __ } = wp.i18n
			var control  = this
			var radios   = $( control.selector + ' input[type="radio"]' )
			var val      = control.setting._value
			var template = val.template

			// Listen to Template selection change.
			radios.on(
				'change',
				function () {
					template        = $( this ).val()
					var cols        = template.split( '-' )
					var colsLength  = cols.length
					var matcherHtml = ''
					var sequence    = [ 'main' ]
					var sidebars    = $( '#_customize-input-sidebars_qty' ).val()

					for ( var i = 1; i <= colsLength; i ++ ) {
						matcherHtml += '<div class="gl-sequence-col col-' + cols[ i - 1 ] + '">'
						matcherHtml += '<select class="gl-sequence-content">'
						var selected = ( i === 1 ) ? 'selected' : ''
						matcherHtml += `<option value="main" ${ selected }>${ __( 'Main Content', 'greenlet' ) }</option>`
						for ( var j = 1; j <= sidebars; j ++ ) {
							selected     = ( i === ( j + 1 ) ) ? 'selected' : ''
							matcherHtml += `<option value="sidebar-${ j }" ${ selected }>${ __( 'Sidebar', 'greenlet' ) } ${ j }</option>`
						}
						matcherHtml += '</select>'
						matcherHtml += `<div class="gl-sequence-name">
							<svg class="gl-arrow left" width="201px" height="11px" viewBox="0 0 201 11">
								<use href="#gl-arrow-shape" />
							</svg>
							<svg class="gl-arrow right" width="201px" height="11px" viewBox="0 0 201 11">
								<use href="#gl-arrow-shape" />
							</svg>
							<span>${ cols[ i - 1 ] }</span>
						</div>`
						matcherHtml += '</div>'
						if ( i < colsLength ) {
							sequence.push( 'sidebar-' + i )
						}
					}

					$( '#customize-control-' + control.id ).find( '.gl-sequence' ).html( matcherHtml )

					val = {
						template: template,
						sequence: sequence
					}

					control.setting.set( val )
				}
			)

			// Listen to Template column sequence change.
			$( control.selector ).on(
				'change',
				'.gl-sequence-content',
				function () {
					// Update control value.
					var sequence = []
					$( this ).parent().parent().find( 'select' ).each(
						function () {
							sequence.push( $( this ).val() )
						}
					);

					val = {
						template: template,
						sequence: sequence
					}

					control.setting.set( val )
				}
			)
		}
	}
)
