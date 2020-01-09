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

})( jQuery );
