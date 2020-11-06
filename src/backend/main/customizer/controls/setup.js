import { $ } from '../Helpers'
import popupStyles from './components/Popup/Popup.scss'
import styles from '../greenlet-controls.scss'

$( window ).on(
	'load',
	function() {
		$( 'html' ).addClass( 'window-loaded' );
	}
)

const style = document.createElement( 'style' )
style.id = 'greenlet-controls'
style.innerHTML = `${ popupStyles } ${ styles }`
document.body.appendChild( style )

const insertExtLinks = () => {
	if ( [ '1', 'true', true ].includes( glControlData.ext ) ) return
	const items = [{
		id: 'accordion-section-title_tagline',
		place: 'before',
		type: 'section',
		tagName: 'li',
	}, {
		id: 'sub-accordion-section-blog_extra',
		place: 'append',
		type: 'control',
		tagName: 'li',
	}, {
		id: 'customize-control-post_list_layout',
		place: 'append',
		type: 'control',
	}, {
		id: 'customize-control-css_framework',
		place: 'append',
		type: 'control',
	}]

	const extUrl = 'https://greenletwp.com/pro'
	const markUp = `<a href="${ extUrl }" target="_blank"><span>${ glControlData.extText }</span></a>`

	items.forEach( ( item ) => {
		const el = document.getElementById( item.id )
		if ( null === el ) return

		const link = document.createElement( item.tagName || 'div' )
		link.classList.add( 'gl-ext-link' )
		link.innerHTML = markUp

		if ( 'control' === item.type ) {
			link.classList.add( 'control' )
		}

		if ( 'before' === item.place ) {
			el.insertAdjacentElement( 'beforebegin', link )
		} else if ( 'append' === item.place ) {
			el.appendChild( link )
		}
	})
}

wp.customize.bind( 'ready', () => {
	insertExtLinks()
} )
