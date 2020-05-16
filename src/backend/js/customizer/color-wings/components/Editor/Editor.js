import { MainStore, useStore } from '../../global/MainStore'
import { StylesStore } from '../../global/StylesStore'
import Length from './length/Length'
import Color from './Color'
import Select from './Select'

import styles from './Editor.scss'
import selectStyles from './Select.scss'

function Editor() {
	const { currentSelector, openSection, currentStyles } = useStore( MainStore )

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
						val: currentStyles.padding
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
						val: currentStyles.margin,
					}
				}
			]
		},
		{
			id: 'background',
			title: 'Background',
			controls: [
				{
					property: 'background',
					Component: Color,
					params: {
						label: 'Background Color',
						val: currentStyles.backgroundColor,
					}
				}
			]
		},
		{
			id: 'text',
			title: 'Text',
			controls: [
				{
					property: 'color',
					Component: Color,
					params: {
						label: 'Font Color',
						val: currentStyles.color,
					}
				},
				{
					property: 'font-size',
					Component: Length,
					params: {
						label: 'Font Size',
						subType: 'size',
						val: currentStyles.fontSize,
					}
				},
				{
					property: 'line-height',
					Component: Length,
					params: {
						label: 'Line Height',
						subType: 'size',
						val: currentStyles.lineHeight,
					}
				},
				{
					property: 'font-weight',
					Component: Select,
					params: {
						label: 'Font Weight',
						name: 'font-weight',
						options: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
						val: currentStyles.fontWeight,
					}
				},
				{
					property: 'letter-spacing',
					Component: Length,
					params: {
						label: 'Letter Spacing',
						subType: 'size',
						val: currentStyles.letterSpacing,
					}
				},
			]
		}
	]

	sections.forEach( ( section ) => { section.controls.forEach( ( control ) => {
		if ( ! ( 'onChange' in control.params ) ) {
			control.params.onChange = ( data ) => {
				StylesStore.addStyle( currentSelector, control.property, data )
			}
		}
	} ) } )

	return (
		<div id="cw-editor-wrap" >
			<div id="cw-editor-panel" className="cw-panel">
				<div className="cw-panel-title">
					<span>{ currentSelector ? 'You are editing: ' : 'No Element Selected' }</span>
					{ ( currentSelector !== '' ) && ( <span className="selector">{ currentSelector }</span> ) }
				</div>
				{ ( currentSelector !== '' ) && (
					<div className="cw-panel-main">
						<ul className="cw-panel-sections">
							{ sections.map( ( section ) => (
								<li key={ section.id } className={ `cw-panel-section ${ ( openSection === section.id ) ? 'open' : '' }` }>
									<h3 className="cw-section-title" onClick={ () => MainStore.toggleSection( section.id ) }>{ section.title }</h3>
									<div className="cw-section-content">
										{ section.controls.map( ( control ) => (
											<div key={ control.property } className="cw-control">
												<control.Component { ...control.params } />
											</div>
										) ) }
									</div>
								</li>
							) ) }
						</ul>
					</div>
				) }
			</div>
			<style type="text/css">{ styles } { selectStyles }</style>
		</div>
	)
}

export default Editor
