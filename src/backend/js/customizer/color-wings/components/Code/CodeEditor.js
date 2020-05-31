import './CodeEditorHandler'
import { Evt } from '../../global/Event'
import { StylesStore, useStore } from '../../global/StylesStore'
import { MainStore } from '../../global/MainStore'

function CodeEditor() {
	const { allOutputs } = useStore( StylesStore )
	const { currentPage } = useStore( MainStore )

	const textAreaId = 'cw-code-editor'
	Evt.emit( 'textarea-ready', { textAreaId } )

	return <textarea id={ textAreaId } defaultValue={ allOutputs[ currentPage ] } />
}

export default CodeEditor
