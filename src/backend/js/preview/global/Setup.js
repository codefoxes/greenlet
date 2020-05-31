window.cw = window.parent.cw

if ( 'cwPreviewObject' in window ) {
	cw.Evt.emit( 'preview-object-ready', window.cwPreviewObject )
}
