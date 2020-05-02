import { MainStore, useStore } from '../../global/MainStore'
import Editor from '../editor/Editor'
import CodeEditor from '../Code/CodeEditor'

function Panel() {
	const [ tab, setTab ] = React.useState('editor')
	const [ popState, setPopState ] = React.useState( {
		show: false,
		style: {
			content: { top: 0 },
			arrow: { right: 0 }
		}
	} )

	const { previewObject } = useStore( MainStore )

	const allPages = [ {
			type: 'global',
			name: 'global',
			title: 'All Pages'
		}
	]

	if ( ( 'is_home' in previewObject ) && ( previewObject.is_home === '1' ) ) {
		allPages.push( { type: 'template', name: 'is_home', title: 'Blog Post List Page' } )
	}

	if ( ( 'is_front_page' in previewObject ) && ( previewObject.is_front_page === '1' ) ) {
		allPages.push( { type: 'template', name: 'is_front_page', title: 'Front Page' } )
	}

	const { currentPage } = MainStore.get()
	let currentTitle = 'All Pages'
	for ( const page in allPages ) {
		if ( allPages.hasOwnProperty( page ) && allPages[ page ].name === currentPage ) {
			currentTitle = allPages[ page ].title
			break
		}
	}

	const changePage = ( page ) => {
		MainStore.changePage( page.name, page.type )
		setPopState( prev => ( { ...prev, show: false } ) )
	}

	const popupNow = ( e ) => {
		const clientRect = e.target.getBoundingClientRect()
		const buttonBottom = clientRect.bottom - e.target.offsetParent.getBoundingClientRect().top
		setPopState( prevPopState => ( { show: ! prevPopState.show, style: { content: { top: `${buttonBottom + 10}px` }, arrow: { right: `${clientRect.width / 2}px` } } } ) )
	}

	return (
		<div className="cw-panel">
			<div className="cw-panel-heading cw-row">
				<div className="col-6"><span>Editing Styles for: </span></div>
				<div className="col-6">
					<div className="button button-block" onClick={ popupNow }>{ currentTitle }</div>
					<div className={ `popup-overlay ${ popState.show ? '' : 'hidden' }` } onClick={ () => setPopState( prev => ( { ...prev, show: false } ) ) } />
					<div className={ `page-selector popup-content ${ popState.show ? '' : 'hidden' }` } style={ popState.style.content }>
						<div className="popup-arrow" style={ popState.style.arrow } />
						<ul>
							{ allPages.map( ( page ) => (
								<li key={ page.name } onClick={ () => changePage( page ) }>{ page.title }</li>
							) ) }
						</ul>
					</div>
				</div>
			</div>
			<div className="panel-main">
				<div className="tabs cw-row">
					<div className={ 'editor-tab col-6 tab' + ( tab === 'editor' ? ' active' : '' ) } onClick={ () => setTab( 'editor' ) } >Visual Editor</div>
					<div className={ "code-tab col-6 tab" + ( tab === 'code' ? ' active' : '' ) } onClick={ () => setTab( 'code' ) }>Code Editor</div>
				</div>
				<div className={ 'tab-content' + ( tab !== 'editor' ? ' hidden' : '' ) }>
					<Editor />
				</div>
				<div className={ 'tab-content' + ( tab !== 'code' ? ' hidden' : '' ) } >
					<CodeEditor />
				</div>
			</div>
		</div>
	)
}

export default Panel
