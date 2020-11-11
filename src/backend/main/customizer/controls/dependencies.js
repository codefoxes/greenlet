/**
 * Change Sidebars quantity dependencies.
 */
function manageSidebarDependencies() {
	const { __ } = wp.i18n
	const selector = document.getElementById( '_customize-input-sidebars_qty' )

	selector.addEventListener( 'change', ( e ) => {
		const sidebars = e.target.value
		const templates = document.querySelectorAll( '.gl-template-selection' )
		templates.forEach( ( template ) => {
			let selected = ( template.value === 'main' ) ? 'selected' : ''
			let matcherHtml = `<option value="main" ${ selected }>${ __( 'Main Content', 'greenlet' ) }</option>`

			for ( let j = 1; j <= sidebars; j ++ ) {
				selected = ( template.value === 'sidebar-' + j ) ? 'selected' : ''
				matcherHtml += `<option value="sidebar-${ j }" ${ selected }>${ __( 'Sidebar', 'greenlet' ) } ${ j }</option>`
			}

			template.innerHTML = matcherHtml
		} )
	} )
}

/**
 * Manage Post List dependencies.
 */
function managePostListDependencies() {
	const control  = wp.customize.control( 'post_list_layout' )

	if ( control.setting._value === 'list' ) {
		document.getElementById( 'customize-control-posts_columns' ).style.display = 'none'
	}

	control.setting.bind( () => {
		if ( control.setting._value === 'list' ) {
			document.getElementById( 'customize-control-posts_columns' ).style.display = 'none'
		} else {
			document.getElementById( 'customize-control-posts_columns' ).style.display = ''
		}
	} )
}

/**
 * Manage Performance dependencies.
 */
function managePerformanceDependencies() {
	const control  = wp.customize.control( 'disable_block_editor' )

	if ( control.setting._value !== false ) {
		document.getElementById( 'customize-control-defer_block_css' ).style.display = 'none'
		document.getElementById( 'customize-control-inline_block_css' ).style.display = 'none'

	}

	control.setting.bind( () => {
		if ( control.setting._value !== false ) {
			document.getElementById( 'customize-control-defer_block_css' ).style.display = 'none'
			document.getElementById( 'customize-control-inline_block_css' ).style.display = 'none'
		} else {
			document.getElementById( 'customize-control-defer_block_css' ).style.display = ''
			document.getElementById( 'customize-control-inline_block_css' ).style.display = ''
		}
	} )
}

/**
 * Manage Back to top dependencies.
 */
function manageToTopDependencies() {
	const control  = wp.customize.control( 'to_top' )

	if ( control.setting._value === false ) {
		document.getElementById( 'customize-control-to_top_at' ).style.display = 'none'
	}

	control.setting.bind( () => {
		if ( control.setting._value === false ) {
			document.getElementById( 'customize-control-to_top_at' ).style.display = 'none'
		} else {
			document.getElementById( 'customize-control-to_top_at' ).style.display = ''
		}
	} )
}

wp.customize.bind( 'ready', () => {
	manageSidebarDependencies()
	managePostListDependencies()
	managePerformanceDependencies()
	manageToTopDependencies()
} )
