/**
 * Greenlet Admin JavaScript.
 *
 */

function hide_attributes( panels ) {
	panels.forEach( ( panel ) => {
		if ( panel.innerText === 'Page Attributes' ) {
			panel.classList.add('hidden');
		}
	} );
}

function init_hide_attributes() {
	// Hide Default Page Attributes Panel.
	let i = 0;
	const intId = setInterval(() => {
		if ( i > 50 ) {
			clearInterval( intId );
		}
		let panels = document.querySelectorAll( '.components-panel__body' );
		if ( panels.length > 0 ) {
			clearInterval( intId );

			document.addEventListener( 'click', function(e) {
				if ( e.target && e.target.classList.contains('edit-post-sidebar__panel-tab') ) {
					let newPanels = document.querySelectorAll( '.components-panel__body' );
					if ( newPanels.length > 0 ) {
						hide_attributes( newPanels );
					}
				}
			});

			hide_attributes( panels );
		}
		i++;
	}, 200 )
}

jQuery( document ).ready( function( $ ) {

	init_hide_attributes();

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
