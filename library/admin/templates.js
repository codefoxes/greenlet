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

	$("#optionsframework .google-fonts input").click( function() {

		var container = $(this).parent().parent();
			wrap = container.find( ".typowrap" );
			size = wrap.find( ".of-typography-size" );
			face = wrap.find( ".of-typography-face" );
			style = wrap.find( ".of-typography-style" );
			spinner = container.find( ".spinner" );
			name = $(this).attr( "name" );
			id = name.match(/\[(.*?)\]/)[1];

		if ( $(this).is(':checked') ) { var add = 'true'; } else { var add = 'false' };

		wrap.fadeTo( "fast", 0.5 );
		spinner.show();

		$.ajax({
			type : "post",
			dataType : 'json',
			url : template_ajax.ajaxurl,
			data : {action: "greenlet_google_fonts", id: id, add: add},
			success: function(response) {
				var content, style_content;

				for (var key in response) {

					var fonts = response[key];

					if (key==='default') {
						content += '<optgroup label="Default Fonts">';
						for(var k in fonts) {
							content += '<option value="' + k + '">' + fonts[k] + '</option>';
						}
						content += '</optgroup>';
					} else if (key==='google') {
						content += '<optgroup label="Google Fonts">';
						var j = 0;
						for ( var j = 0; j < fonts.length; j++) {
							content += '<option value="' + fonts[j] + '">' + fonts[j] + '</option>';
						}
						content += '</optgroup>';
					} else {
						for(var l in fonts) {
							style_content += '<option value="' + l + '">' + fonts[l] + '</option>';
						}
					};

				};

				face.html(content);
				style.html('');
				if (style_content) {style.html(style_content)};
				spinner.hide();
				wrap.fadeTo( "fast", 1 );
			}
		});
	});

	gflink = '<link href="http://fonts.googleapis.com/css?family=';
	demo = '<span>1 2 3 4 5 6 7 8 9 0 A B C D E F G H I J K L M N O P Q R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x y z</span>';

	$("#optionsframework .of-typography-face").change( function() {

		var container = $(this).parent().parent();
		var value = $(this).val();
		var test = container.find( ".font-test" );
		var size = $(this).prev().val();

		if ( container.find("input").is(':checked') ){
			var spinner = container.find( ".spinner" );
			var style = $(this).next();

			style.fadeTo( "fast", 0.5 );
			spinner.show();

			$.ajax({
				type : "post",
				dataType : 'json',
				url : template_ajax.ajaxurl,
				data : {action: "greenlet_google_fonts", name: value},
				success: function(response) {
					var content = '';
					for(var key in response) {
						content += '<option value="' + key + '">' + response[key] + '</option>';
					}
					style.html( content );
					family = value.replace(' ', '+');
					variation = style.val();
					test.html( gflink + family + ':' + variation + '" rel="stylesheet" type="text/css">' + demo );
					test.css({"font-family": value, "font-size": size});
					spinner.hide();
					style.fadeTo( "fast", 1 );
				}
			});
		} else {
			test.html( demo );
			test.css({"font-family": value, "font-size": size});
		};
	});

	$("#optionsframework .of-typography-style").change( function() {

		var container = $(this).parent().parent();
		var test = container.find( ".font-test" );
		var variation = $(this).val();

		if ( container.find("input").is(':checked') ){
			var face = $(this).prev();
			var value = $(this).prev().val();

			family = value.replace(' ', '+');
			test.html( gflink + family + ':' + variation + '" rel="stylesheet" type="text/css">' + demo );
			test.css({
				"font-weight": variation.substring(0, 3),
				"font-style": variation.substring(3)
			});
		} else {
			var weight, style;
			switch(variation){
				case 'normal': weight = style = 'normal';
				break;
				case 'bold': weight = 'bold', style = 'normal';
				break;
				case 'italic': weight = 'normal', style = 'italic';
				break;
				case 'bold italic':
				case 'italic bold': weight = 'bold', style = 'italic';
				break;
			}
			test.css({
				"font-weight": weight,
				"font-style": style
			});
		};
	});

	$("#optionsframework .of-typography-size").change( function() {

		var container = $(this).parent().parent();
		var test = container.find( ".font-test" );
		size = $(this).val();
		test.css({"font-size": size});
	});



});
