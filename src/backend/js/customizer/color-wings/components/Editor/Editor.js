import { MainStore, useStore } from '../../global/MainStore'
import { StylesStore } from '../../global/StylesStore'
import Length from './length/Length'
import Color from './Color'
import Select from './Select'
import QuickSelect from './QuickSelect/QuickSelect'

import styles from './Editor.scss'
import selectStyles from './Select.scss'

function Editor() {
	const { currentSelector, openSection, currentStyles, quickSelectors } = useStore( MainStore )
	const [ font, setFontParams ] = React.useState( {
		styleOptions: ['normal', 'italic'],
		weightOptions: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
	} )

	React.useEffect( () => {
		setFontParams( prev => ( { ...prev, family: currentStyles.fontFamily, style: currentStyles.fontStyle, weight: currentStyles.fontWeight } ) )
	}, [ currentStyles ] )

	const getFontsOptions = () => {
		const options = []
		for ( const fontSet in colorWingsFonts.allFonts ) {
			let setName = fontSet
			if ( 'system' === fontSet ) {
				setName = 'System Fonts'
			} else if ( 'google' === fontSet ) {
				setName = 'Google Fonts'
			}
			const families = []
			for ( const family in colorWingsFonts.allFonts[ fontSet ] ) {
				const name = ( 'Default' === family ) ? 'Default System Font' : family
				families.push( { name, value: family } )
			}
			options.push( {
				type: 'group',
				name: setName,
				items: families
			} )
		}
		return options
	}

	const getFontDetails = ( fontFamily ) => {
		const details = { 'family': fontFamily, 'source': 'system' }
		if ( colorWingsFonts.allFonts.system.hasOwnProperty( fontFamily ) ) {
			details[ 'variants' ] = colorWingsFonts.defaults.variants
			details[ 'category' ] = colorWingsFonts.allFonts.system[ fontFamily ].category
		} else if ( colorWingsFonts.allFonts.google.hasOwnProperty( fontFamily ) ) {
			const variants = colorWingsFonts.allFonts.google[ fontFamily ][ 0 ]
			const category = colorWingsFonts.allFonts.google[ fontFamily ][ 1 ]

			details[ 'source' ]   = 'google'
			details[ 'category' ] = category
			details[ 'variants' ] = {}
			if ( variants[0].length > 0 ) {
				details[ 'variants' ][ 'normal' ] = variants[0]
			}
			if ( variants[1].length > 0 ) {
				details[ 'variants' ][ 'italic' ] = variants[1]
			}
		}
		return details;
	}

	const getNearestWeight = ( weight, weightsArray ) => {
		return weightsArray.reduce(
			function ( prev, curr ) {
				return Math.abs( curr - weight ) < Math.abs( prev - weight ) ? curr : prev
			}
		)
	}

	const setFontOptions = ( fontFamily = false, fontStyle = false, fontWeight = false ) => {
		// Todo: Get latest currentStyles
		fontFamily = fontFamily ? fontFamily : font.family
		const currentFontDetails = getFontDetails( fontFamily )

		// If fontFamily is given set Font Style options.
		if ( ! fontStyle ) {
			fontStyle    = font.style

			// If fontStyle not in currentFontDetails.style set first available style.
			if ( ! currentFontDetails.variants.hasOwnProperty( fontStyle ) ) {
				fontStyle = Object.keys( currentFontDetails.variants )[0]
			}
		}

		// If fontStyle is given set Font Weight options.
		if ( ! fontWeight ) {
			fontWeight = font.weight

			// If fontWeight not in currentFontDetails.style[ fontStyle ] set nearest weight.
			if ( currentFontDetails.variants[ fontStyle ].indexOf( fontWeight ) === -1 ) {
				fontWeight = getNearestWeight( fontWeight, currentFontDetails.variants[ fontStyle ] )
			}
		}

		setFontParams( {
			styleOptions: Object.keys( currentFontDetails.variants ),
			weightOptions: currentFontDetails.variants[ fontStyle ],
			family: fontFamily,
			style: fontStyle,
			weight: fontWeight.toString()
		} )

		const newFont = {
			family: fontFamily,
			style: fontStyle,
			weight: fontWeight,
			source: currentFontDetails.source,
			category: currentFontDetails.category
		}

		MainStore.addFont( newFont )
		StylesStore.addFont()

		;( font.family !== fontFamily ) && StylesStore.addStyleNow( currentSelector, 'font-family', fontFamily )
		;( font.style !== fontStyle ) && StylesStore.addStyleNow( currentSelector, 'font-style', fontStyle )
		;( font.weight !== fontWeight ) && StylesStore.addStyleNow( currentSelector, 'font-weight', fontWeight )
	}

	const onFontChange = val => ( setFontOptions( val, false, false ) )
	const onStyleChange = val => ( setFontOptions( false, val, false ) )
	const onWeightChange = val => ( setFontOptions( false, false, val ) )

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
					property: 'font-family',
					Component: Select,
					params: {
						label: 'Font Family',
						name: 'font-family',
						options: getFontsOptions(),
						val: font.family,
						search: true,
						onChange: onFontChange
					}
				},
				{
					property: 'font-style',
					Component: Select,
					params: {
						label: 'Font Style',
						name: 'font-style',
						options: font.styleOptions,
						val: font.style,
						onChange: onStyleChange
					}
				},
				{
					property: 'font-weight',
					Component: Select,
					params: {
						label: 'Font Weight',
						name: 'font-weight',
						options: font.weightOptions,
						val: font.weight,
						onChange: onWeightChange
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
				{
					property: 'text-align',
					Component: Select,
					params: {
						label: 'Text Align',
						name: 'text-align',
						options: ['none', 'center', 'left', 'right', 'justify'],
						val: currentStyles.textAlign,
					}
				},
				{
					property: 'text-decoration',
					Component: Select,
					params: {
						label: 'Text Decoration',
						name: 'text-decoration',
						options: ['none', 'overline', 'underline', 'line-through'],
						val: currentStyles.textDecoration,
					}
				},
				{
					property: 'text-transform',
					Component: Select,
					params: {
						label: 'Text Transform',
						name: 'text-transform',
						options: ['none', 'capitalize', 'lowercase', 'uppercase'],
						val: currentStyles.textTransform,
					}
				},
				{
					property: 'word-spacing',
					Component: Length,
					params: {
						label: 'Word Spacing',
						subType: 'size',
						val: currentStyles.wordSpacing,
					}
				},
				{
					property: 'text-indent',
					Component: Length,
					params: {
						label: 'Text Indent',
						subType: 'size',
						val: currentStyles.textIndent,
					}
				}
			]
		},
		{
			id: 'border',
			title: 'Border',
			controls: [
				{
					property: 'border-radius',
					Component: Length,
					params: {
						label: 'Border Radius',
						subType: 'radius',
						val: currentStyles.borderRadius,
					}
				}
			]
		},
		{
			id: 'size',
			title: 'Size',
			controls: [
				{
					property: 'width',
					Component: Length,
					params: {
						label: 'Width',
						subType: 'size',
						val: currentStyles.width,
					}
				},
				{
					property: 'height',
					Component: Length,
					params: {
						label: 'Height',
						subType: 'size',
						val: currentStyles.height,
					}
				}
			]
		},
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
				{ ( currentSelector !== '' ) ? (
					<>
						<div className="cw-panel-title">
							<span>You are editing: <span className="selector">{ currentSelector }</span></span>
						</div>
						<div className="cw-panel-main">
							<ul className="cw-panel-sections">
								{ sections.map( ( section ) => (
									<li key={ section.id } className={ `cw-panel-section ${ ( openSection === section.id ) ? 'open' : '' }` }>
										<h3 className="cw-section-title" onClick={ () => MainStore.toggleSection( section.id ) }>{ section.title }</h3>
										<div className="cw-section-content">
											{ section.controls.map( ( control ) => (
												<div key={ control.property } className={`cw-control ${ control.property }`}>
													<control.Component { ...control.params } />
												</div>
											) ) }
										</div>
									</li>
								) ) }
							</ul>
						</div>
					</>
				) : <QuickSelect selectors={ quickSelectors } /> }
			</div>
			<style type="text/css">{ styles } { selectStyles }</style>
		</div>
	)
}

export default Editor
