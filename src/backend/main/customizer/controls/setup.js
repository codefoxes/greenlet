import { $ } from '../Helpers'
import popupStyles from './components/Popup/Popup.scss'
import styles from '../greenlet-controls.scss'

$( window ).on(
	'load',
	function() {
		$( 'html' ).addClass( 'window-loaded' );
	}
)

const extUrl = 'https://greenletwp.com'
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

	const markUp = `<a href="${ extUrl }/pro" target="_blank"><span>${ glControlData.extText }</span></a>`

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

const insertDocLinks = () => {
	const { __ } = wp.i18n

	const items = [{
		id: 'sub-accordion-section-title_tagline',
		link: 'customize/logo-title-tagline/',
	}, {
		id: 'sub-accordion-section-framework',
		link: 'customize/css-framework/',
	}, {
		id: 'sub-accordion-section-header_section',
		link: 'customize/header-footer-builder/'
	}, {
		id: 'sub-accordion-section-footer_section',
		link: 'customize/header-footer-builder/'
	}, {
		id: 'sub-accordion-section-main_layout',
		link: 'customize/page-layout/'
	}, {
		id: 'sub-accordion-section-blog_list',
		link: 'customize/post-list-design/'
	}, {
		id: 'sub-accordion-section-blog_single',
		link: 'customize/single-post-design/'
	}, {
		id: 'sub-accordion-section-blog_page',
		link: 'customize/single-page-design/'
	}, {
		id: 'sub-accordion-section-performance',
		link: 'customize/performance/'
	}, {
		id: 'sub-accordion-section-presets',
		link: 'customize/presets/'
	}, {
		id: 'sub-accordion-section-extra_styles',
		link: 'customize/colorwings-visual-style-editor/'
	}]

	items.forEach( ( item ) => {
		const el = document.querySelector( `#${ item.id } .customize-section-title` )
		if ( null === el ) return

		const link = document.createElement( 'a' )
		link.classList.add( 'gl-doc-link' )
		link.href = `${ extUrl }/docs/${ item.link }`; link.target = '_blank'
		link.innerHTML = `<span class="dashicons dashicons-book"></span><span class="tip">${ __( 'Documentation', 'greenlet' ) }</span>`

		el.insertAdjacentElement( 'beforeend', link )
	})
}

wp.customize.bind( 'ready', () => {
	insertExtLinks()
	insertDocLinks()
} )
