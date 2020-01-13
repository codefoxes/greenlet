/**
 * Greenlet Admin JavaScript.
 *
 */

jQuery( document ).ready( function( $ ) {

	// Hide Default Page Attributes Panel.
	// Todo: Do this only if Gutenberg.
	let i = 0;
	const intId = setInterval(() => {
		if ( i > 50 ) {
			clearInterval( intId );
		}
		let panels = document.querySelectorAll( '.components-panel__body' );
		if ( panels.length > 0 ) {
			clearInterval( intId );

			panels.forEach( ( panel ) => {
				if ( panel.innerText === 'Page Attributes' ) {
					panel.remove();
				}
			} );
		}
		i++;
	}, 200 )

	$( "#postparentdiv #page_template" ).change( function() {

		$("#sequence").fadeTo( 'fast', 0.5 );
		$(".sequence.spinner").show().css({ visibility: 'visible' });

		var tempValue = $(this).val();
		var postType = document.getElementById( 'greenlet-post-type' ).value;
		var nonce = document.getElementById( 'greenlet_nonce' ).value;

		jQuery.ajax({
			type : 'POST',
			dataType : 'html',
			url : template_ajax.ajaxurl,
			data : { action: 'greenlet_template_sequence', template: tempValue, post_type: postType, nonce: nonce },
			success: function(response) {
				$("#sequence").html( response ).fadeTo( 'fast', 1 );
				$(".sequence.spinner").hide().css({ visibility: 'hidden' });
			}
		});
	});
});
