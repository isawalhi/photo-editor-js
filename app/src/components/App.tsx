import React from 'react';

import { useFileUpload } from '../../../packages/file-uploader';
import { Button } from '../../../packages/ui-components/index';

const App = () => {
    const [file, selectFile] = useFileUpload()

    return (
        <div>
            <Button
                onClick={() => {
                    selectFile()
                }}
            >
                Click to Upload
            </Button>

            {file ? (
                <div>
                    <img src={file.source} alt='preview' />
                    <span> Name: {file.name} </span>
                    <span> Size: {file.size} </span>
                </div>
            ) : (
                <span>No file selected</span>
            )}
        </div>
    )
}

export default App