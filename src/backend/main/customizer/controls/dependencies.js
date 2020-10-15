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
 * Manage Performance dependencies.
 */
function managePerformanceDependencies() {
	const control  = wp.customize.control( 'disable_block_editor' )

	if ( control.setting._value !== false ) {
		document.getElementById( 'customize-control-defer_block_css' ).style.display = 'none'
	}

	control.setting.bind( () => {
		if ( control.setting._value !== false ) {
			document.getElementById( 'customize-control-defer_block_css' ).style.display = 'none'
		} else {
			document.getElementById( 'customize-control-defer_block_css' ).style.display = ''
		}
	} )
}

wp.customize.bind( 'ready', () => {
	manageSidebarDependencies()
	managePerformanceDependencies()
} )
