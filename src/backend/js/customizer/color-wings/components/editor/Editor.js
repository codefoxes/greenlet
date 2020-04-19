import { EditorStore, useStore } from './EditorStore'
import { StylesStore } from '../../global/StylesStore'
import Length from './length/Length'
import root from '../../../../common/lib/react-shadow/root'

import styles from './Editor.scss'

function Editor() {
	const { currentSelector, openSection, currentStyles } = useStore( EditorStore )

	const onChange = ( data ) => {
		StylesStore.addStyle( currentSelector, 'padding', data )
	}

	const sections = [
		{
			id: 'padding',
			title: 'Padding',
			controls: [
				{
					property: 'padding',
					Component: Length,
					params: {
						subType: 'padding',
						val: currentStyles.padding,
						onChange
					}
				}
			]
		},
		{
			id: 'margin',
			title: 'Margin',
			controls: [
				{
					property: 'margin',
					Component: Length,
					params: {
						subType: 'margin',
						val: '2px',
						onChange
					}
				}
			]
		}
	]

	return (
		<root.div id="cw-editor">
			<div id="cw-editor-wrap" >
				<div id="cw-editor-panel" className="cw-panel">
					<div className="cw-panel-title">{ currentSelector ? currentSelector : 'No Element Selected' }</div>
					<div className="cw-panel-main">
						{ ( currentSelector !== '' ) && (
							<ul className="cw-panel-sections">
								{ sections.map( ( section ) => (
									<li key={ section.id } className={ `cw-panel-section ${ ( openSection === section.id ) ? 'open' : '' }` }>
										<h3 className="cw-section-title" onClick={ () => EditorStore.toggleSection( section.id ) }>{ section.title }</h3>
										<div className="cw-section-content">
											{ section.controls.map( ( control ) => (
												<div key={ control.property } className="cw-control">
													<control.Component { ...control.params } />
												</div>
											) ) }
										</div>
									</li>
								) ) }
								<li key="text" className="cw-padding-section">
									<h3 className="cw-section-title">Text</h3>
								</li>
								<li key="bg" className="cw-padding-section">
									<h3 className="cw-section-title">Background</h3>
								</li>
							</ul>
						) }
					</div>
				</div>
			</div>
			<style type="text/css">{ styles }</style>
		</root.div>
	)
}

export default Editor
