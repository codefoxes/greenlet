import styles from './greenlet-meta.scss'

const { registerPlugin } = wp.plugins
const { PluginDocumentSettingPanel } = wp.editPost
const { withSelect, withDispatch } = wp.data
const { Button, ButtonGroup } = wp.components
const { useState } = wp.element
const { __ } = wp.i18n

const LayoutMetaField = withDispatch( ( dispatch ) => {
	return {
		updateMetaValue: ( v ) => {
			dispatch( 'core/editor' ).editPost( {
				meta: { greenlet_layout: v }
			} )
		}
	}
} )( withSelect( ( select ) => {
	const meta = select( 'core/editor' ).getEditedPostAttribute( 'meta' )
	if ( ( undefined === meta ) || ! ( 'greenlet_layout' in meta ) ) {
		return {}
	}
	return { greenlet_layout: meta.greenlet_layout }
} )( ( props ) => {
	if ( ! ( 'greenlet_layout' in props ) ) return null
	const template = ( 'template' in props.greenlet_layout ) ? props.greenlet_layout.template : 'default'
	const sequence  = ( 'sequence' in props.greenlet_layout ) ? props.greenlet_layout.sequence : [ 'main', 'sidebar-1', 'sidebar-2', 'sidebar-3' ]

	const [ primary, setPrimary ] = useState( template )

	const updateOption = ( v ) => { setPrimary( v ); props.updateMetaValue( { template: 'default', sequence } ) }
	const updateTemplate = ( e ) => { props.updateMetaValue( { template: e.currentTarget.value, sequence } ) }
	const updateSequence = ( e ) => {
		const currentSeq = []
		e.currentTarget.parentNode.parentNode.querySelectorAll( 'select.gl-sequence-content' ).forEach( el => currentSeq.push( el.value ) )
		props.updateMetaValue( { template, sequence: currentSeq } )
	}

	return (
		<div className="gl-layout">
			<ButtonGroup className="gl-layout-control gl-layout-options" aria-label="options">
				<Button isSmall className={ ( 'default' === primary ) ? 'is-primary' : 'is-secondary' } onClick={ () => updateOption( 'default' ) }>{ __( 'Default', 'greenlet' ) }</Button>
				<Button isSmall className={ ( 'default' === primary ) ? 'is-secondary' : 'is-primary' } onClick={ () => updateOption( 'custom' ) }>{ __( 'Custom', 'greenlet' ) }</Button>
			</ButtonGroup>
			{ 'default' !== primary && (
				<div className="gl-layout-control gl-meta-template">
					<div className="gl-radio-images">
						{ Object.entries( greenletMeta.templates ).map( ( [ key, choice ] ) => (
							<div key={ key } className="gl-radio-image">
								<label>
									<input type="radio" name="template" value={ key } onChange={ updateTemplate } defaultChecked={ template === key } />
									<img src={ choice } alt={ key } />
									<span className="template-name">{ key }</span>
								</label>
							</div>
						) ) }
					</div>
				</div>
			) }
			{ 'default' !== template && (
				<div className="gl-layout-control gl-meta-sequence">
					<svg className="svg-def" width="0" height="0" viewBox="0 0 201 11">
						<defs>
							<g id="gl-arrow-shape" fill="#ccc">
								<rect x="2" y="5" width="199" height="1" />
								<rect x="0" y="0" width="1" height="11" fill="#ddd" />
								<polygon points="1 5.5 4 2 4 9" />
							</g>
						</defs>
					</svg>
					<div className="gl-sequence gl-row">
						{ template.split( '-' ).map( ( col, i ) => (
							<div key={ i } className={ `gl-sequence-col col-${ col }` } >
								<select className="gl-sequence-content" defaultValue={ sequence[ i ] ? sequence[ i ] : 'main' } onChange={ updateSequence }>
									{ Object.entries( greenletMeta.contents ).map( ( [ id, content ] ) => (
										<option key={ id } value={ id }>{ content }</option>
									) ) }
								</select>
								<div className="gl-sequence-name">
									<svg className="gl-arrow left" width="201px" height="11px" viewBox="0 0 201 11">
										<use href="#gl-arrow-shape" />
									</svg>
									<svg className="gl-arrow right" width="201px" height="11px" viewBox="0 0 201 11">
										<use href="#gl-arrow-shape" />
									</svg>
									<span>{ col }</span>
								</div>
							</div>
						) ) }
					</div>
				</div>
			) }
		</div>
	)
} ) )

const GreenletLayout = () => (
	<PluginDocumentSettingPanel
		name="greenlet-layout"
		title={ __( 'Page Layout', 'greenlet' ) }
		className="greenlet-layout"
		icon="greenlet-layout"
	>
		<LayoutMetaField />
		<style type="text/css">{ styles }</style>
	</PluginDocumentSettingPanel>
)

if ( greenletMeta.hasMeta ) {
	registerPlugin( 'greenlet-layout', {
		render: GreenletLayout
	} )
}
