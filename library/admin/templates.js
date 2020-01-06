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

		var tempValue = $(this).val();

		jQuery.ajax({
		type : "post",
		dataType : 'html',
		url : template_ajax.ajaxurl,
		data : {action: "greenlet_template_sequence", template: tempValue },
		success: function(response) {
			$("#sequence").html( response );
			$(".sequence.spinner").hide();
			$("#sequence").fadeTo( "fast", 1 );
			}
		});
	});

	$( "#optionsframework .of-radio-img-img" ).click( function() {

		var input = $(this).prev().prev();
		var ipValue = input.val();
		var ipName = input.attr( "name" );
		var primary = ipName.match(/\[(.*?)\]/);
		if (primary[1].indexOf("template") > -1){
			var sequence = primary[1].replace( "_template", "_sequence" );
				container = $(this).parent().parent().parent().parent().find( "#section-" + sequence + " .controls" );
				spinner = container.find( ".spinner" );
				matcher = container.find( ".matcher" );

			matcher.fadeTo( "fast", 0.5 );
			spinner.show();

			jQuery.ajax({
				type : "post",
				dataType : 'html',
				url : template_ajax.ajaxurl,
				data : {action: "greenlet_template_sequence", template: ipValue, context: sequence },
				success: function(response) {
					matcher.html( response );
					spinner.hide();
					matcher.fadeTo( "fast", 1 );
				}
			});
		};
	});
});
