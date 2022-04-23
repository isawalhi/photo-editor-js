import React, { useCallback, useState } from "react";

import PhotoEditor from "../components/PhotoEditor";
import {
  getScaleFromInstructions,
  getPositionFromImageInstructions,
  getDimensionsFromImageInstructions,
} from "../components/PhotoEditor/utils";
import type { ImageInstructions } from "../components/PhotoEditor/types";

import { Button, Space, Row, Col } from "../components/ui";
import { downloadJsonFile } from "../components/FileSaver/utils";
import { FileUpload, useFileUpload } from "../components/FileUploader";

type useFileUploadResult = [FileUpload, any];

const Editor = () => {
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

  const handleFileSubmit = useCallback(() => {
    downloadJsonFile(file.name, JSON.stringify(instructions));
  }, [file, instructions]);

  return (
    <>
      <Row justify="center" align="middle" gutter={12}>
        <Col>
          <PhotoEditor
            key={String(newKey)} // TODO: hack to force reset image
            fileName={file?.name}
            source={file?.source}
            onChange={setInstructions}
            onLoadFailure={console.error}
            initialScale={getScaleFromInstructions(instructions)}
            initialPosition={getPositionFromImageInstructions(instructions)}
            initialImageDimensions={getDimensionsFromImageInstructions(
              instructions
            )}
          />
        </Col>
        <Col>
          <Space direction="vertical">
            <Button
              block
              onClick={handleImageUpload}
              data-testid="upload-image-btn"
            >
              Upload
            </Button>
            <Button
              block
              type="dashed"
              disabled={!file}
              onClick={handleInstructionsUpload}
              data-testid="import-instructions-btn"
            >
              Import
            </Button>
            <Button
              block
              type="primary"
              disabled={!file}
              onClick={handleFileSubmit}
              data-testid="submit-btn"
            >
              Submit
            </Button>
            <Button
              block
              danger={true}
              disabled={!file}
              onClick={() => {
                setNewKey(new Date());
                setInstructions(undefined);
              }}
              data-testid="reset-btn"
            >
              Reset
            </Button>
          </Space>
        </Col>
      </Row>
    </>
  );
};

export default Editor;
