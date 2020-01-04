/**
 * Greenlet Admin JavaScript.
 *
 */

( function( wp ) {
    // console.log( wp )
} )( window.wp );

jQuery(document).ready(function($){

	$( "#postparentdiv #page_template" ).change( function() {

		$("#sequence").fadeTo( "fast", 0.5 );
		$(".sequence.spinner").show();

		var value = $(this).val();

		jQuery.ajax({
		type : "post",
		dataType : 'html',
		url : template_ajax.ajaxurl,
		data : {action: "greenlet_template_sequence", template: value },
		success: function(response) {
			console.log(response);
			$("#sequence").html( response );
			$(".sequence.spinner").hide();
			$("#sequence").fadeTo( "fast", 1 );
			}
		});
	});

	$( "#optionsframework .of-radio-img-img" ).click( function() {

		var input = $(this).prev().prev();
			value = input.val();
			name = input.attr( "name" );
			primary = name.match(/\[(.*?)\]/);
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
				data : {action: "greenlet_template_sequence", template: value, context: sequence },
				success: function(response) {
					matcher.html( response );
					spinner.hide();
					matcher.fadeTo( "fast", 1 );
				}
			});
		};
	});
});
