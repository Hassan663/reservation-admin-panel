import { useEffect, useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import './Editor.scss';
function Editor2({ textFile, setTextFile ,setEditorStateData}) {
  const [text, setText] = useState('');
  const editorRef = useRef();
  let c;
  const handle = content => {
    // console.log(editorRef.current.getContent())
    console.log(content);
    setTextFile(content);
  };
  const add = (evt, editor) => (editorRef.current = editor);
  // setTextFile(editorRef.current.getContent())
  return (
    <div>
      <Editor
        apiKey="u1uuljgsgfdlmm2q3jhmy1jsgati928gouyy0e2wmdci0687"
        value={setEditorStateData}
        onInit={(evt, editor) => {
          editorRef.current = editor;
        }}
        onEditorChange={handle}
        init={{
          height: 300,
          placeholder: 'Enter Content here...',
          // menubar: false,
          // toolbar: false,
          removed_menuitems: 'newdocument image link code',
          branding: false,
          statusbar: false,
          // resize:true,
          // height: 450,
          // width:530,
          // content_css:'./editor.scss',
          plugins: 'link image code',
          content_style:
            'body { background-color:#ffffff;color:black }  .tox :not(svg):not(rect) {background: #ffffff}',
          content_css: './Editor.scss',
          toolbar:
            'undo redo h1 h2 h3 backcolor forecolor bold italic underline alignleft aligncenter alignright',
        }}
      />
      {/* <button onClick={handle}>Submit</button> */}
    </div>
  );
}
export default Editor2;
