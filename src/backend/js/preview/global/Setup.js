window.cw = window.parent.cw

if ( 'previewObject' in window ) {
	cw.Evt.emit( 'preview-object-ready', window.previewObject )
}
