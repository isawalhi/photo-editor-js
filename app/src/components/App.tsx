import React, { useCallback, useState } from "react";

import PhotoEditor from "./PhotoEditor";
import {
  getScaleFromInstructions,
  getPositionFromImageInstructions,
  getDimensionsFromImageInstructions,
} from "./PhotoEditor/utils";
import type { ImageInstructions } from "./PhotoEditor/types";

import { Button, PageHeader } from "./ui";
import { downloadJsonFile } from "./FileSaver/utils";
import { FileUpload, useFileUpload } from "./FileUploader";
import "./App.scss";

type useFileUploadResult = [FileUpload, any];

const App = () => {
  const [newKey, setNewKey] = useState<Date>(new Date());
  const [instructions, setInstructions] = useState<ImageInstructions>();

  const [file, selectFile] = useFileUpload() as useFileUploadResult;
  const [_, selectInstructionsFile] = useFileUpload() as useFileUploadResult;

  const handleImageUpload = useCallback(() => {
    selectFile({ accept: "image/*", multiple: false });
  }, []);

  const handleInstructionsUpload = useCallback(() => {
    selectInstructionsFile(
      { accept: "json/*", multiple: false },
      (instructionsFile: { source: RequestInfo; name: string }) => {
        fetch(instructionsFile.source)
          .then((res) => res.json())
          .then((data) => {
            if (data?.canvas?.photo?.id !== file.name) {
              alert("You are trying to load instructions for the wrong image");
            } else {
              setInstructions(data);
              setNewKey(new Date());
            }
          })
          .catch(console.error);
      }
    );
  }, [file?.name]);

  const handleFileSubmit = useCallback(async () => {
    downloadJsonFile(file.name, JSON.stringify(instructions));
  }, [file, instructions]);

  return (
    <>
      <PageHeader
        ghost={true}
        title="Albelli Photo Editor"
        extra={[
          <Button
            key="1"
            size="large"
            shape="round"
            onClick={handleImageUpload}
            data-testid="upload-image-btn"
          >
            Upload Image
          </Button>,
          <Button
            key="2"
            size="large"
            shape="round"
            type="dashed"
            disabled={!file}
            onClick={handleInstructionsUpload}
            data-testid="import-instructions-btn"
          >
            Import Instructions
          </Button>,
          <Button
            key="3"
            size="large"
            shape="round"
            type="primary"
            disabled={!file}
            onClick={handleFileSubmit}
            data-testid="submit-btn"
          >
            Submit
          </Button>,
          <Button
            key="4"
            danger={true}
            size="large"
            shape="round"
            disabled={!file}
            onClick={() => {
              setNewKey(new Date());
              setInstructions(undefined);
            }}
            data-testid="reset-btn"
          >
            Reset Image
          </Button>,
        ]}
      />
      <section className="photo-editor-section">
        {file ? (
          <PhotoEditor
            key={String(newKey)}
            fileName={file.name}
            source={file.source}
            onChange={setInstructions}
            onLoadFailure={console.error}
            initialScale={getScaleFromInstructions(instructions)}
            initialPosition={getPositionFromImageInstructions(instructions)}
            initialImageDimensions={getDimensionsFromImageInstructions(
              instructions
            )}
          />
        ) : null}
      </section>
    </>
  );
};

export default App;
