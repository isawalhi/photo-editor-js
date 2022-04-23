import React from "react";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import Editor from "../Editor";
import * as FileUploader from "../../components/FileUploader";
import type { FileUpload } from "../../components/FileUploader";
import * as FileSaverUtils from "../../components/FileSaver/utils";

describe("<Editor />", () => {
  it.each([
    ["reset-btn"],
    ["submit-btn"],
    ["upload-image-btn"],
    ["import-instructions-btn"],
  ])("should render %s", (btnTestId) => {
    render(<Editor />);

    const btn = screen.getByTestId(btnTestId);

    expect(btn).toBeInTheDocument();
  });

  it("should call file upload when upload button is clicked", () => {
    const mockSelectFile = jest.fn();
    jest
      .spyOn(FileUploader, "useFileUpload")
      .mockReturnValue([{} as FileUpload, mockSelectFile]);
    render(<Editor />);

    const btn = screen.getByTestId("upload-image-btn");

    expect(btn).toBeInTheDocument();

    fireEvent.click(btn);

    expect(mockSelectFile).toBeCalledTimes(1);
  });

  it("should call file upload when import instructions button is clicked", () => {
    const mockSelectInstructionsFile = jest.fn();

    jest
      .spyOn(FileUploader, "useFileUpload")
      .mockReturnValue([{} as FileUpload, mockSelectInstructionsFile]);

    render(<Editor />);

    const btn = screen.getByTestId("import-instructions-btn");

    expect(btn).toBeInTheDocument();

    fireEvent.click(btn);

    expect(mockSelectInstructionsFile).toBeCalledTimes(1);
  });

  it("should call submit handler when submit button is clicked", () => {
    jest
      .spyOn(FileUploader, "useFileUpload")
      .mockReturnValue([{ name: "test-file.json" } as FileUpload, jest.fn()]);
      const downLoadFileSpy = jest.spyOn(FileSaverUtils, "downloadJsonFile").mockImplementation(jest.fn());

    render(<Editor />);

    const btn = screen.getByTestId("submit-btn");

    expect(btn).toBeInTheDocument();

    fireEvent.click(btn);

    expect(downLoadFileSpy).toBeCalledTimes(1);
  });

  it("should call reset handler when reset button is clicked", () => {
    render(<Editor />);

    const btn = screen.getByTestId("reset-btn");

    expect(btn).toBeInTheDocument();

    fireEvent.click(btn);
  });
});
