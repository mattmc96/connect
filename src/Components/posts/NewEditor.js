import React from 'react'

// Import Brace and the AceEditor Component
import AceEditor from 'react-ace'
import Posts from './Posts'
import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/theme-monokai'
import 'ace-builds/src-noconflict/ext-language_tools'
import './editor.scss'

export default class extends React.Component {
  constructor(props) {
    super(props)

    this.onChange = this.onChange.bind(this)
  }

  onChange = (newValue) => {
    console.log('change', newValue)
  }

  render() {
    return (
      <div className="editor-box">
        <AceEditor
          placeholder="Nothing"
          mode="javascript"
          theme="monokai"
          name="editor1"
          className="editor-box"
          onLoad={this.onLoad}
          onChange={this.onChange}
          fontSize={14}
          showPrintMargin={true}
          showGutter={true}
          highlightActiveLine={true}
          value={`function onLoad(editor) {console.log("i've loaded");
          }`}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
            showLineNumbers: true,
            tabSize: 4,
          }}
        />
        <Posts />
      </div>
    )
  }
}
