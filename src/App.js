import React from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const renderer = new window.marked.Renderer();

renderer.link = function (href, title, text) {
  return `<a target="_blank" href="${href}">${text}</a>`;
};


function Toolbar(props){
  return(
    <div className="header"> 
      <FontAwesomeIcon className="logo" icon={['fab', 'markdown']} title='markdown editor' />
      {props.text}
      <FontAwesomeIcon onClick={props.clickEvent} className="minimize" icon={props.icon} />
    </div>
  )
};

function Editor(props){
  return(
    <div>
      <textarea id="editor" type="text" value={props.content} onChange={props.clickEvent} className="textarea"/>
    </div>
  )
};
function Previewer(props){
  return(
    <div id="preview"  dangerouslySetInnerHTML={{
      __html: window.marked(props.content, { renderer: renderer,
  gfm: true,
  tables: true,
  breaks: true,
  smartLists: false                                   }
                    )
    }}/>

  )
};

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      markdown: defaultText,
      editorMaximized: false,
      previewMaximized: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleEditorMaximizer = this.handleEditorMaximizer.bind(this);
    this.handlePreviewMaximizer = this.handlePreviewMaximizer.bind(this);
  }
  handleChange(e){
    this.setState({
      markdown: e.target.value
    });
  }
  
  handleEditorMaximizer() {
    this.setState({
      editorMaximized: !this.state.editorMaximized
    });
  }
  handlePreviewMaximizer() {
    this.setState({
      previewMaximized: !this.state.previewMaximized
    });
  }
  render(){
    const insertClass = this.state.editorMaximized
    ? ['editorContainer maximized', 'previewContainer hide', 'window-minimize']
    : this.state.previewMaximized
    ? ['editorContainer hide', 'previewContainer maximized', 'window-minimize']
    : ['editorContainer', 'previewContainer', 'window-maximize']; 

    return (
      <div>
        <div className={insertClass[0]}>
          <Toolbar icon={insertClass[2]} clickEvent={this.handleEditorMaximizer} text="Markdown Editor"/>
          <Editor content={this.state.markdown} clickEvent={this.handleChange} />
        </div>
        <div />
        <div className={insertClass[1]}>
          <Toolbar icon={insertClass[2]} clickEvent={this.handlePreviewMaximizer} text="Markdown Previewer"/>
          <Previewer content={this.state.markdown} />
        </div>
      </div>
    )
  }
}
export default App;

// const renderer = window.marked.Renderer();
const defaultText = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
`;