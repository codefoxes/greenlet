/**
 * Greenlet Customizer Controls.
 *
 * @package greenlet\library\backend\assets\js
 */

(function( $ ) {

	$( window ).on(
		'load',
		function() {
			$( 'html' ).addClass( 'window-loaded' );
		}
	);

	/**
	 * Run function when customizer is ready.
	 */
	wp.customize.bind(
		'ready',
		function () {
			wp.customize.control.each(
				function ( controlObj ) {
					if ( controlObj.params.type === 'multicheck' ) {
						multicheckControl( controlObj )
					} else if ( controlObj.params.type === 'radio-image' ) {
						radioImageControl( controlObj )
					} else if ( controlObj.params.type === 'template-selector' ) {
						templateSelectorControl( controlObj )
					} else if ( controlObj.params.type === 'range' ) {
						rangeControl( controlObj )
					} else if ( controlObj.params.type === 'gl-color' ) {
						colorControl( controlObj )
					} else if ( controlObj.params.type === 'border' ) {
						borderControl( controlObj )

						// Manage dependencies.
					} else if ( controlObj.id === 'custom_logo' ) {
						manageLogoDependencies( controlObj )
					} else if ( controlObj.id === 'show_topbar' ) {
						manageTopbarDependencies( controlObj )
					} else if ( controlObj.id === 'show_semifooter' ) {
						manageSemifooterDependencies( controlObj )
					} else if ( controlObj.id === 'sidebars_qty' ) {
						manageSidebarDependencies( controlObj )
					}
				}
			);
		}
	);

	/**
	 * Set multicheck Controller Values.
	 *
	 * @param {object} controlObj multicheck control Object.
	 */
	function multicheckControl( controlObj ) {
		wp.customize.control(
			controlObj.id,
			function ( control ) {
				var checkboxes = $( controlObj.selector + ' input[type="checkbox"]' )
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
		)
	}

	/**
	 * Set radio-image Controller Values.
	 *
	 * @param {object} controlObj radio-image control Object.
	 */
	function radioImageControl( controlObj ) {
		wp.customize.control(
			controlObj.id,
			function ( control ) {
				var radios = $( controlObj.selector + ' input[type="radio"]' )

				radios.on(
					'change',
					function () {
						control.setting.set( this.value )
					}
				)
			}
		)
	}

	/**
	 * Set template-selector Controller Values.
	 *
	 * @param {object} controlObj template-selector control Object.
	 */
	function templateSelectorControl( controlObj ) {
		wp.customize.control(
			controlObj.id,
			function ( control ) {
				var radios   = $( controlObj.selector + ' input[type="radio"]' )
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
							matcherHtml += '<div class="gl-template-matcher col-' + cols[ i - 1 ] + '">'
							matcherHtml += '<select class="gl-template-selection">'
							var selected = ( i === 1 ) ? 'selected' : ''
							matcherHtml += '<option value="main" ' + selected + '>Main Content</option>'
							for ( var j = 1; j <= sidebars; j ++ ) {
								selected     = ( i === ( j + 1 ) ) ? 'selected' : ''
								matcherHtml += '<option value="sidebar-' + j + '" ' + selected + '>Sidebar ' + j + '</option>'
							}
							matcherHtml += '</select>'
							matcherHtml += '<div class="gl-template-matcher-column">col ' + i + ' (' + cols[ i - 1 ] + ')</div>'
							matcherHtml += '</div>'
							if ( i < colsLength ) {
								sequence.push( 'sidebar-' + i )
							}
						}

						$( '#customize-control-' + controlObj.id ).find( '.gl-template-matcher-sequence' ).html( matcherHtml )

						val = {
							template: template,
							sequence: sequence
						}

						control.setting.set( JSON.stringify( val ) )
					}
				)

				// Listen to Template column sequence change.
				$( controlObj.selector ).on(
					'change',
					'.gl-template-matcher select',
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

						control.setting.set( JSON.stringify( val ) )
					}
				)
			}
		)
	}

	/**
	 * Add range Controller reset.
	 *
	 * @param {object} controlObj range control Object.
	 */
	function rangeControl( controlObj ) {
		wp.customize.control(
			controlObj.id,
			function ( control ) {
				controlObj.container.append( '<span class="reset dashicons dashicons-undo"></span>' )
				var resetVal = control.setting._value

				$( controlObj.selector + ' .reset' ).on(
					'click',
					function() {
						control.setting.set( resetVal )
					}
				)
			}
		)
	}

	/**
	 * Set radio-image Controller Values.
	 *
	 * @param {object} controlObj radio-image control Object.
	 */
	function colorControl( controlObj ) {
		wp.customize.control(
			controlObj.id,
			function ( control ) {
				var picker  = $( controlObj.selector + ' .color-picker' )
				var options = {
					change: function(event, ui) {
						var color = ui.color.toString();
						if ( $( 'html' ).hasClass( 'window-loaded' ) ) {
							control.setting.set( color )
						}
					},
					clear: function() {
						control.setting.set( '' );
					}
				}
				if ( controlObj.params.palettes.length > 0 ) {
					options['palettes'] = controlObj.params.palettes
				}
				picker.wpColorPicker( options )
			}
		)
	}

	/**
	 * Set border Controller Values.
	 *
	 * @param {object} controlObj border control Object.
	 */
	function borderControl( controlObj ) {
		wp.customize.control(
			controlObj.id,
			function ( control ) {
				// Set initial Values.
				var widthSelector = $( '#border-width-' + controlObj.id )
				var styleSelector = $( '#border-style-' + controlObj.id )
				var colorSelector = $( '#border-color-' + controlObj.id )

				var border      = control.setting._value
				var borderParts = border.split( ' ' )

				var width = 0
				var style = 'none'
				var color = '#000000'

				if ( borderParts.length === 3 ) {
					width = borderParts[0]
					style = borderParts[1]
					color = borderParts[2]

					// Set width.
					if ( width.indexOf( 'px' ) !== -1 ) {
						width = width.split( 'px' )[0]
					}

					// Set style options.
					var options      = ''
					var styles       = [ 'dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset', 'none', 'hidden' ]
					var stylesLength = styles.length
					for ( var i = 0; i < stylesLength; i++ ) {
						var selected = ( styles[ i ] === style ) ? 'selected' : ''
						options     += '<option value="' + styles[ i ] + '" ' + selected + '>' + styles[ i ] + '</option>'
					}
					styleSelector.html( options )
				}

				widthSelector.val( width )
				styleSelector.val( style )
				colorSelector.val( color )

				function setBorder() {
					if ( $( 'html' ).hasClass( 'window-loaded' ) ) {
						var newValue = widthSelector.val() + 'px ' + styleSelector.val() + ' ' + colorSelector.val()
						control.setting.set( newValue );
					}
				}

				// Listen to changes.
				widthSelector.on( 'change', setBorder )
				styleSelector.on( 'change', setBorder )
				colorSelector.on( 'change', setBorder )
			}
		)
	}

	function manageLogoDependencies( controlObj ) {
		if ( $( '#customize-control-custom_logo img' ).length === 0 ) {
			$( '#customize-control-logo_width' ).hide()
			$( '#customize-control-logo_height' ).hide()
		}

		controlObj.setting.bind(
			function() {
				if ( controlObj.setting._value === '' ) {
					$( '#customize-control-logo_width' ).hide()
					$( '#customize-control-logo_height' ).hide()
					$( '#customize-control-show_title' ).show()
				} else {
					$( '#customize-control-logo_width' ).show()
					$( '#customize-control-logo_height' ).show()
					$( '#customize-control-show_title' ).hide()

					var logo = document.querySelector( '#customize-control-custom_logo .attachment-thumb' )
					wp.customize.control( 'logo_width' ).setting.set( logo.naturalWidth )
					wp.customize.control( 'logo_height' ).setting.set( logo.naturalHeight )
				}
			}
		)
	}

	/**
	 * Show and hide topbar dependencies.
	 *
	 * @param {object} controlObj topbar control Object.
	 */
	function manageTopbarDependencies( controlObj ) {
		var section = controlObj.container.closest( '.control-section' )

		if ( controlObj.setting._value === false ) {
			section.find( '#customize-control-fixed_topbar' ).hide()
			section.find( '#customize-control-topbar_template' ).hide()
			section.find( '#customize-control-topbar_content_source' ).hide()
			section.find( '#customize-control-topbar_width' ).hide()
			section.find( '#customize-control-topbar_container' ).hide()
			$( '#customize-control-topbar_bg' ).hide()
			$( '#customize-control-topbar_color' ).hide()
		}

		var checkboxes = $( controlObj.selector + ' input[type="checkbox"]' )
		checkboxes.on(
			'change',
			function () {
				section.find( '#customize-control-fixed_topbar' ).toggle()
				section.find( '#customize-control-topbar_template' ).toggle()
				section.find( '#customize-control-topbar_content_source' ).toggle()
				section.find( '#customize-control-topbar_width' ).toggle()
				section.find( '#customize-control-topbar_container' ).toggle()
				$( '#customize-control-topbar_bg' ).toggle()
				$( '#customize-control-topbar_color' ).toggle()
			}
		)
	}

	/**
	 * Show and hide semifooter dependencies.
	 *
	 * @param {object} controlObj semifooter control Object.
	 */
	function manageSemifooterDependencies( controlObj ) {
		var section = controlObj.container.closest( '.control-section' )

		if ( controlObj.setting._value === false ) {
			section.find( '#customize-control-semifooter_template' ).hide()
			section.find( '#customize-control-semifooter_content_source' ).hide()
			section.find( '#customize-control-semifooter_width' ).hide()
			section.find( '#customize-control-semifooter_container' ).hide()
			$( '#customize-control-semifooter_bg' ).hide()
			$( '#customize-control-semifooter_color' ).hide()
		}

		var checkboxes = $( controlObj.selector + ' input[type="checkbox"]' )
		checkboxes.on(
			'change',
			function () {
				section.find( '#customize-control-semifooter_template' ).toggle()
				section.find( '#customize-control-semifooter_content_source' ).toggle()
				section.find( '#customize-control-semifooter_width' ).toggle()
				section.find( '#customize-control-semifooter_container' ).toggle()
				$( '#customize-control-semifooter_bg' ).toggle()
				$( '#customize-control-semifooter_color' ).toggle()
			}
		)
	}

	/**
	 * Change Sidebars quantity dependencies.
	 *
	 * @param {object} controlObj sidebars_qty control Object.
	 */
	function manageSidebarDependencies( controlObj ) {
		var selector = $( '#_customize-input-sidebars_qty' )

		selector.on(
			'change',
			function() {
				var controls = $( '#customize-theme-controls' )
				var template = controls.find( '.gl-template-selection' )
				var sidebars = this.value
				template.each(
					function() {
						var current     = this.value
						var selected    = ( current === 'main' ) ? 'selected' : ''
						var matcherHtml = '<option value="main" ' + selected + '>Main Content</option>'

						for ( var j = 1; j <= sidebars; j ++ ) {
							selected     = ( current === 'sidebar-' + j ) ? 'selected' : ''
							matcherHtml += '<option value="sidebar-' + j + '" ' + selected + '>Sidebar ' + j + '</option>'
						}

						this.innerHTML = matcherHtml
					}
				);
			}
		)
	}

})( jQuery );
