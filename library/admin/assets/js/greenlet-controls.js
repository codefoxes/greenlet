(function( $ ){
	/**
	 * Run function when customizer is ready.
	 */
	wp.customize.bind('ready', function () {
		wp.customize.control('show_author', function (control) {
			var checkboxes = $('#customize-control-show_author input[type="checkbox"]');
			var input = $('#_customize-input-show_author');
			var val = control.setting._value;

			checkboxes.on('change', function() {
				var current = $(this).val();
				var index = val.indexOf( current )

				if ( $(this).prop('checked') ) {
					if ( index === -1 ) {

						console.log(index)

						val.push( current );
						control.setting.set(val);

						console.log(val);
					}
				} else {
					if ( index !== -1 ) {
						console.log(index)

						val.splice(index, 1)
						control.setting.set(val);

						console.log(val);
					}
				}

				$( input ).attr( 'value', JSON.stringify( val ) ).trigger( 'change' );
				control.setting.set(val);
			})
		});
	});
})( jQuery );
