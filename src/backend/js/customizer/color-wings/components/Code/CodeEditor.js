import './CodeEditorHandler'
import { Evt } from '../../global/Event'
import { StylesStore, useStore } from '../../global/StylesStore'

function CodeEditor() {
	const { output } = useStore( StylesStore )

	const textAreaId = 'cw-code-editor'
	Evt.emit( 'textarea-ready', { textAreaId } )

	return <textarea id={ textAreaId } defaultValue={ output } />
}

export default CodeEditor
