jQuery( document ).ready( function() {

	jQuery( '.customize-control-multicheck input[type="checkbox"]' ).on(
		'change',
		function() {
			var checkbox_values = jQuery( this ).parents( '.customize-control' ).find( 'input[type="checkbox"]:checked' ).map(
				function() {
					return this.value;
				}
			).get().join( ',' );

			jQuery( this ).parents( '.customize-control' ).find( 'input[type="hidden"]' ).val( checkbox_values ).trigger( 'change' );
		}
	);

} );


jQuery( document ).ready(function($) {
	wp.customize('multicheck', function(control) {
		control.bind(function( controlValue ) {
			console.log(controlValue);
			if( controlValue == true ) {
			}
			else {
			}
		});
	});
});
