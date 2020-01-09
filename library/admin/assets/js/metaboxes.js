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

		$("#sequence").fadeTo( "fast", 0.5 );
		$(".sequence.spinner").show();

		var postType = document.getElementById( 'greenlet-post-type' ).getAttribute( 'data-value' );
		var tempValue = $(this).val();

		jQuery.ajax({
			type : "post",
			dataType : 'html',
			url : template_ajax.ajaxurl,
			data : {action: "greenlet_template_sequence", template: tempValue, post_type: postType },
			success: function(response) {
				$("#sequence").html( response );
				$(".sequence.spinner").hide();
				$("#sequence").fadeTo( "fast", 1 );
			}
		});
	});
});
