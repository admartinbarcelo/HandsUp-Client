import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function MyCkEditor({ descriptionHandler, description }) {
    return (
        <div>
            <div className="App">
                <CKEditor
                    editor={ClassicEditor}
                    data={description}
                    onReady={editor => {
                        console.log('Editor is ready to use!', editor);
                    }}
                    onBlur={(event, editor) => {
                        const data = editor.getData();
                        console.log({ event, editor, data });
                        descriptionHandler(data)
                    }}
                    onFocus={(event, editor) => {
                        const data = editor.getData();
                        console.log({ event, editor, data });
                        descriptionHandler(data)
                    }}
                />
            </div>
        </div>
    )
}
export default MyCkEditor;