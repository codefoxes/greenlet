(function( $ ){
	/**
	 * Run function when customizer is ready.
	 */
	wp.customize.bind('ready', function () {
		wp.customize.control.each( function( controlObj ) {
			if( controlObj.params.type === 'multicheck' ) {
				multicheckControl( controlObj )
			} else if( controlObj.params.type === 'radio-image' ) {
				radioImageControl( controlObj )
			} else if( controlObj.params.type === 'template-selector' ) {
				templateSelectorControl( controlObj )
			}

			// Manage dependencies

			else if (controlObj.id === 'show_topbar') {
				manage_topbar_dependencies( controlObj )
			} else if (controlObj.id === 'show_semifooter') {
				manage_semifooter_dependencies( controlObj )
			}
		})
	});

	function multicheckControl ( controlObj ) {
		wp.customize.control(controlObj.id, function (control) {
			var checkboxes = $(controlObj.selector + ' input[type="checkbox"]');
			var input = $('#_customize-input-' + controlObj.id);
			var val = control.setting._value;

			// Todo: This is a hack.
			control.setting.set( JSON.stringify( val ) );

			checkboxes.on('change', function() {
				var current = $(this).val();
				var index = val.indexOf( current )

				if ( $(this).prop('checked') ) {
					if ( index === -1 ) {
						val.push( current );
						control.setting.set( JSON.stringify( val ) );
					}
				} else {
					if ( index !== -1 ) {
						val.splice(index, 1)
						control.setting.set( JSON.stringify( val ) );
					}
				}

				$( input ).attr( 'value', JSON.stringify( val ) ).trigger( 'change' );
				control.setting.set( JSON.stringify( val ) );
			})
		});
	}

	function radioImageControl ( controlObj ) {
		wp.customize.control(controlObj.id, function (control) {
			var radios = $(controlObj.selector + ' input[type="radio"]');
			var input = $('#_customize-input-' + controlObj.id);
			var val = control.setting._value;

			radios.on('change', function() {
				val = $(this).val();

				$( input ).attr( 'value', val ).trigger( 'change' );
				control.setting.set( val );
			})
		});
	}

	function templateSelectorControl ( controlObj ) {
		wp.customize.control(controlObj.id, function (control) {
			// Todo: Get correct numbers.
			var sidebars = 3;

			var radios = $(controlObj.selector + ' input[type="radio"]');
			var input = $('#_customize-input-' + controlObj.id);

			var val = control.setting._value;
			var template = val.template;

			// Todo: This is a hack.
			control.setting.set( JSON.stringify( val ) );

			// Listen to Template selection change.
			radios.on('change', function() {
				template = $(this).val();
				var cols = template.split('-');
				var colsLength = cols.length;
				var matcherHtml = '';
				var sequence = ['main'];

				for ( var i = 1; i <= colsLength; i++ ) {
					matcherHtml += '<div class="gl-template-matcher col-' + cols[ i - 1 ] + '">';
					matcherHtml += '<select class="gl-template-selection">';
					var selected = (i === 1) ? 'selected' : '';
					matcherHtml += '<option value="main" ' + selected + '>Main Content</option>';
					for ( var j = 1; j <= sidebars; j++ ) {
						selected = (i === (j + 1)) ? 'selected' : '';
						matcherHtml += '<option value="sidebar-' + j +'" ' + selected + '>Sidebar ' + j + '</option>';
					}
					matcherHtml += '</select>';
					matcherHtml += '<div class="gl-template-matcher-column">col ' + i + ' (' + cols[i - 1] + ')</div>';
					matcherHtml += '</div>';
					if ( i < colsLength ) {
						sequence.push('sidebar-' + i);
					}
				}

				$( '#customize-control-' + controlObj.id ).find('.gl-template-matcher-sequence').html(matcherHtml);

				val = {
					template: template,
					sequence: sequence
				}

				$( input ).attr( 'value', JSON.stringify( val ) ).trigger( 'change' );
				control.setting.set( JSON.stringify( val ) );
			})

			// Listen to Template column sequence change.
			$( controlObj.selector ).on('change', '.gl-template-matcher select', function() {
				// Todo: Rearrange sequence if needed.
				// Update control value.
				var sequence = []
				$(this).parent().parent().find('select').each(function() {
					sequence.push($(this).val())
				})

				val = {
					template: template,
					sequence: sequence
				}

				$( input ).attr( 'value', JSON.stringify( val ) ).trigger( 'change' );
				control.setting.set( JSON.stringify( val ) );
			});
		});
	}

	function manage_topbar_dependencies ( controlObj ) {
		var section = controlObj.container.closest('.control-section')

		if ( controlObj.setting._value === false ) {
			section.find('#customize-control-fixed_topbar').hide()
			section.find('#customize-control-topbar_template').hide()
			section.find('#customize-control-topbar_content_source').hide()
			section.find('#customize-control-topbar_width').hide()
			section.find('#customize-control-topbar_container').hide()
			$('#customize-control-topbar_bg').hide()
			$('#customize-control-topbar_color').hide()
		}

		var checkboxes = $(controlObj.selector + ' input[type="checkbox"]');
		checkboxes.on('change', function() {
			section.find('#customize-control-fixed_topbar').toggle()
			section.find('#customize-control-topbar_template').toggle()
			section.find('#customize-control-topbar_content_source').toggle()
			section.find('#customize-control-topbar_width').toggle()
			section.find('#customize-control-topbar_container').toggle()
			$('#customize-control-topbar_bg').toggle()
			$('#customize-control-topbar_color').toggle()
		})
	}

	function manage_semifooter_dependencies ( controlObj ) {
		var section = controlObj.container.closest('.control-section')

		if ( controlObj.setting._value === false ) {
			section.find('#customize-control-semifooter_template').hide()
			section.find('#customize-control-semifooter_content_source').hide()
			section.find('#customize-control-semifooter_width').hide()
			section.find('#customize-control-semifooter_container').hide()
			$('#customize-control-semifooter_bg').hide()
			$('#customize-control-semifooter_color').hide()
		}

		var checkboxes = $(controlObj.selector + ' input[type="checkbox"]');
		checkboxes.on('change', function() {
			section.find('#customize-control-semifooter_template').toggle()
			section.find('#customize-control-semifooter_content_source').toggle()
			section.find('#customize-control-semifooter_width').toggle()
			section.find('#customize-control-semifooter_container').toggle()
			$('#customize-control-semifooter_bg').toggle()
			$('#customize-control-semifooter_color').toggle()
		})
	}

})( jQuery );
