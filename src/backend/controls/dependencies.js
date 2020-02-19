/**
 * Logo height and width dependencies.
 */
function manageLogoDependencies() {
	var control = wp.customize.control( 'custom_logo' )
	if ( $( '#customize-control-custom_logo img' ).length === 0 ) {
		$( '#customize-control-logo_width' ).hide()
		$( '#customize-control-logo_height' ).hide()
	}

	control.setting.bind(
		function() {
			if ( control.setting._value === '' ) {
				$( '#customize-control-logo_width' ).hide()
				$( '#customize-control-logo_height' ).hide()
				$( '#customize-control-show_title' ).show()
			} else {
				$( '#customize-control-logo_width' ).show()
				$( '#customize-control-logo_height' ).show()
				$( '#customize-control-show_title' ).hide()

				var logo = document.querySelector( '#customize-control-custom_logo .attachment-thumb' )
				wp.customize.control( 'logo_width' ).setting.set( logo.naturalWidth )
				wp.customize.control( 'logo_height' ).setting.set( logo.naturalHeight )
			}
		}
	)
}

/**
 * Get Cover default Columns.
 *
 * @param {string} pos Cover position.
 * @returns {string[]} Default Columns.
 */
function topBottomDefaultColumns( pos ) {
	switch ( pos ) {
		case 'topbar':
			return ['4', '8']
		case 'header':
			return ['3', '9']
		case 'semifooter':
			return ['4', '4', '4']
		case 'footer':
			return ['12']
		default:
			return ['12']
	}
}

/**
 * Get Cover columns.
 *
 * @param {array} positions Cover positions.
 * @returns {object} Cover columns.
 */
function getCoverColumns( positions = [ 'topbar', 'header', 'semifooter', 'footer' ] ) {
	var coverColumns = { 'dont-show': 'Do Not Show' }

	var ucfirst = function( s ) {
		if ( typeof s !== 'string' ) {
			return ''
		}
		return s.charAt( 0 ).toUpperCase() + s.slice( 1 )
	}

	var positionsLength = positions.length
	for ( var i = 0; i < positionsLength; i++ ) {
		var control = wp.customize.control( positions[i] + '_template' )
		var cols    = ( control.setting._value === '' ) ? topBottomDefaultColumns( positions[i] ) : control.setting._value.split( '-' )

		var colsLength = cols.length
		for ( var j = 1; j <= colsLength; j++ ) {
			coverColumns[ positions[i] + '-' + j ] = ucfirst( positions[i] ) + ' Column ' + j + ' (width = ' + cols[j - 1] + ')'
		}
	}

	return coverColumns
}

/**
 * Set logo and menu position options based on cover columns.
 */
function setCoverDependentColumns() {
	var control = wp.customize.control( 'show_topbar' )
	var columns
	if ( control.setting._value === false ) {
		columns = getCoverColumns( ['header'] )
	} else {
		columns = getCoverColumns( ['topbar', 'header'] )
	}

	var lControl = wp.customize.control( 'logo_position' )
	var mControl = wp.customize.control( 'mmenu_position' )
	var sControl = wp.customize.control( 'smenu_position' )

	var selected = ''
	var lOptions = ''
	var mOptions = ''
	var sOptions = ''
	for ( var column in columns ) {
		selected  = ( lControl.setting._value === column ) ? 'selected' : ''
		lOptions += '<option value="' + column + '" ' + selected + '>' + columns[column] + '</option>'
		selected  = ( mControl.setting._value === column ) ? 'selected' : ''
		mOptions += '<option value="' + column + '" ' + selected + '>' + columns[column] + '</option>'
		selected  = ( sControl.setting._value === column ) ? 'selected' : ''
		sOptions += '<option value="' + column + '" ' + selected + '>' + columns[column] + '</option>'
	}

	$( '#_customize-input-logo_position' ).html( lOptions )
	$( '#_customize-input-mmenu_position' ).html( mOptions )
	$( '#_customize-input-smenu_position' ).html( sOptions )
}

/**
 * Manage Topbar and Header Columns dependencies.
 * Used to adjust logo and menu positions.
 */
function manageTopCoverDependencies() {
	setCoverDependentColumns()

	var showControl = wp.customize.control( 'show_topbar' )
	showControl.setting.bind( function() { setCoverDependentColumns() } )

	var topbarControl = wp.customize.control( 'topbar_template' )
	topbarControl.setting.bind( function() { setCoverDependentColumns() } )

	var headerControl = wp.customize.control( 'header_template' )
	headerControl.setting.bind( function() { setCoverDependentColumns() } )
}

/**
 * Show and hide topbar dependencies.
 */
function manageTopbarDependencies() {
	var control = wp.customize.control( 'show_topbar' )
	var section = control.container.closest( '.control-section' )

	if ( control.setting._value === false ) {
		section.find( '#customize-control-fixed_topbar' ).hide()
		section.find( '#customize-control-topbar_template' ).hide()
		section.find( '#customize-control-topbar_content_source' ).hide()
		section.find( '#customize-control-topbar_width' ).hide()
		section.find( '#customize-control-topbar_container' ).hide()
		$( '#customize-control-topbar_bg' ).hide()
		$( '#customize-control-topbar_color' ).hide()
	}

	var checkboxes = $( control.selector + ' input[type="checkbox"]' )
	checkboxes.on(
		'change',
		function () {
			section.find( '#customize-control-fixed_topbar' ).toggle()
			section.find( '#customize-control-topbar_template' ).toggle()
			section.find( '#customize-control-topbar_content_source' ).toggle()
			section.find( '#customize-control-topbar_width' ).toggle()
			section.find( '#customize-control-topbar_container' ).toggle()
			$( '#customize-control-topbar_bg' ).toggle()
			$( '#customize-control-topbar_color' ).toggle()
		}
	)
}

/**
 * Show and hide semifooter dependencies.
 */
function manageSemifooterDependencies() {
	var control = wp.customize.control( 'show_topbar' )
	var section = control.container.closest( '.control-section' )

	if ( control.setting._value === false ) {
		section.find( '#customize-control-semifooter_template' ).hide()
		section.find( '#customize-control-semifooter_content_source' ).hide()
		section.find( '#customize-control-semifooter_width' ).hide()
		section.find( '#customize-control-semifooter_container' ).hide()
		$( '#customize-control-semifooter_bg' ).hide()
		$( '#customize-control-semifooter_color' ).hide()
	}

	var checkboxes = $( control.selector + ' input[type="checkbox"]' )
	checkboxes.on(
		'change',
		function () {
			section.find( '#customize-control-semifooter_template' ).toggle()
			section.find( '#customize-control-semifooter_content_source' ).toggle()
			section.find( '#customize-control-semifooter_width' ).toggle()
			section.find( '#customize-control-semifooter_container' ).toggle()
			$( '#customize-control-semifooter_bg' ).toggle()
			$( '#customize-control-semifooter_color' ).toggle()
		}
	)
}

/**
 * Change Sidebars quantity dependencies.
 */
function manageSidebarDependencies() {
	var selector = $( '#_customize-input-sidebars_qty' )

	selector.on(
		'change',
		function() {
			var controls = $( '#customize-theme-controls' )
			var template = controls.find( '.gl-template-selection' )
			var sidebars = this.value
			template.each(
				function() {
					var current     = this.value
					var selected    = ( current === 'main' ) ? 'selected' : ''
					var matcherHtml = '<option value="main" ' + selected + '>Main Content</option>'

					for ( var j = 1; j <= sidebars; j ++ ) {
						selected     = ( current === 'sidebar-' + j ) ? 'selected' : ''
						matcherHtml += '<option value="sidebar-' + j + '" ' + selected + '>Sidebar ' + j + '</option>'
					}

					this.innerHTML = matcherHtml
				}
			);
		}
	)
}

wp.customize.bind(
	'ready',
	function () {
		manageLogoDependencies()
		manageTopCoverDependencies()
		manageTopbarDependencies()
		manageSemifooterDependencies()
		manageSidebarDependencies()
	}
);
