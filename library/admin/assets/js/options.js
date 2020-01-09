/**
 * Custom scripts needed for options.
 */

jQuery(document).ready(function($) {

	$("#import-btn").click(function(e){

		var data = $(this).prev().val();
		e.preventDefault();

		jQuery.ajax({
		type : "post",
		url : ajaxurl,
		data : {action: "options_framework_import", value: data },
		success: function(response) {
			if (response == 1) {
				$('.import-success').slideDown().delay(5000).slideUp();
			} else if (response == 2) {
				$('.import-warning').slideDown().delay(3000).slideUp();
			} else {
				$('.import-error').slideDown().delay(5000).slideUp();
			}
		}});
	});
});
