/**
 * Quick Select selectors.
 */
function QuickSelect( { selectors } ) {
	const selectElement = ( selector ) => {
		cw.Evt.emit( 'select-element', selector )
	}

	const rightArrow = ( <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23 16" width="23" height="16"><g transform="translate(1.58 1.26)" fill="none" fillRule="evenodd"><rect stroke="#08850F" fill="#BEFA91" x="-.49" y="3.88" width="18.57" height="5.18" rx="2.59"/><path d="M16.12 4.4v4.16H4.57c.46-.28.49-.3.74-.49.24-.19.72-.83.57-1.3-.1-.3-.38-.56-.57-.84a1.64 1.64 0 01-.06-1.55l10.87.02z" fill="#D0FFAD"/><path d="M14.76 6.47l-3.25-3.25A2.18 2.18 0 1114.6.14l2.8 2.8h0l2.8 2.8c.4.4.4 1.06 0 1.46l-5.6 5.6a2.18 2.18 0 11-3.08-3.08l3.25-3.25z" stroke="#08850F" fill="#BEFA91" fillRule="nonzero"/><path d="M19.84 6.85l-5.6 5.6c-.82.81-2.26.6-2.73-.54a5.82 5.82 0 012.2-1.75c1.01-.45 1.93-.55 3.1-1.38.49-.35.93-.76 1.21-1.27.3-.52.42-1.13.28-1.7-.17-.68-.67-1.19-.67-1.93l2.2 2.2c.22.22.22.56 0 .77z" fill="#D0FFAD" fillRule="nonzero"/><path d="M12.62 1.36c-.07.3.1.64.3.73.15.08.35.03.52.06.25.05.45.24.68.35.08.03.18.06.25.01.08-.04.1-.14.1-.23a.58.58 0 00-.13-.24c-.25-.33-1.5-1.63-1.72-.68z" fill="#FFF" fillRule="nonzero"/></g></svg> )

	return (
		<div id="cw-quick-select">
			<div className="cw-panel-title">
				<span>No Element Selected.</span>
			</div>

			<div className="cw-qs-content">
				<div className="cw-qs-title">Click on any element to edit the styles { rightArrow }<br />OR<br />Quick select an Element below</div>
				<ul className="cw-qs-btns">
					{ selectors.map( selector => (
						<li key={ selector.name } className="cw-qs-btn" onClick={ () => selectElement( selector.sel ) }>{ selector.name }</li>
					) ) }
				</ul>
			</div>
		</div>
	)
}

export default QuickSelect
