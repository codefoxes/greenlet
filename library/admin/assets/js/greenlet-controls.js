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
			} else if( controlObj.params.type === 'matcher' ) {
				matcherControl( controlObj )
			}
		})
	});

	function multicheckControl ( controlObj ) {
		wp.customize.control(controlObj.id, function (control) {
			var checkboxes = $(controlObj.selector + ' input[type="checkbox"]');
			var input = $('#_customize-input-' + controlObj.id);
			var val = control.setting._value;

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

			radios.on('change', function() {
				val = $(this).val();
				var nums = val.split('-');
				console.log(nums)
			})
		});
	}

	function matcherControl ( controlObj ) {
		wp.customize.control(controlObj.id, function (control) {
			//
		});
	}

})( jQuery );
