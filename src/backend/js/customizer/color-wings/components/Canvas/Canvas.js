import Editor from '../Editor/Editor'
import CodeEditor from '../Code/CodeEditor'
import styles from '../../ColorWings.scss'
import { EditorStore, useStore } from '../Editor/EditorStore'

function Panel() {
	const [ tab, setTab ] = React.useState('editor')
	const { currentSelector } = useStore( EditorStore )

	return (
		<div className="cw-panel">
			<div className="cw-panel-heading cw-row">
				<div className="col-6"><span>Editing Styles for: </span></div>
				<div className="col-6">
					<select name="page" id="cw-page">
						<option value="all">All Pages</option>
						<option value="single">Single Page</option>
					</select>
				</div>
			</div>
			<div className="cw-panel-title">{ currentSelector ? currentSelector : 'No Element Selected' }</div>
			{ ( currentSelector !== '' ) && (
				<div className="panel-main">
					<div className="tabs cw-row">
						<div className={ 'editor-tab col-6 tab' + ( tab === 'editor' ? ' active' : '' ) } onClick={ () => setTab( 'editor' ) } >Visual Editor</div>
						<div className={ "code-tab col-6 tab" + ( tab === 'code' ? ' active' : '' ) } onClick={ () => setTab( 'code' ) }>Code Editor</div>
					</div>
					<div className={ 'tab-content' + ( tab !== 'editor' ? ' hidden' : '' ) }>
						<Editor />
					</div>
					<div className={ 'tab-content' + ( tab !== 'code' ? ' hidden' : '' ) } >
						<CodeEditor />
					</div>
				</div>
			) }
		</div>
	)
}

function Canvas () {
	return (
		<div id="cw-canvas" >
			<Panel />
			<style type="text/css">{ styles }</style>
		</div>
	)
}

export default Canvas
