import React from "react";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import App from "../App";
import * as FileUploader from "../FileUploader";
import type { FileUpload } from "../FileUploader";
import * as FileSaverUtils from "../FileSaver/utils";

describe("<App />", () => {
  it.each([
    ["reset-btn"],
    ["submit-btn"],
    ["upload-image-btn"],
    ["import-instructions-btn"],
  ])("should render %s", (btnTestId) => {
    render(<App />);

    const btn = screen.getByTestId(btnTestId);

    expect(btn).toBeInTheDocument();
  });

  it("should call file upload when upload button is clicked", () => {
    const mockSelectFile = jest.fn();
    jest
      .spyOn(FileUploader, "useFileUpload")
      .mockReturnValue([{} as FileUpload, mockSelectFile]);
    render(<App />);

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

    render(<App />);

    const btn = screen.getByTestId("import-instructions-btn");

    expect(btn).toBeInTheDocument();

    fireEvent.click(btn);

    expect(mockSelectInstructionsFile).toBeCalledTimes(1);
  });

  it("should call submit handler when submit button is clicked", () => {
    jest
      .spyOn(FileUploader, "useFileUpload")
      .mockReturnValue([{ name: "test-file.json" } as FileUpload, jest.fn()]);
    const downLoadFileSpy = jest.spyOn(FileSaverUtils, "downloadJsonFile");

    render(<App />);

    const btn = screen.getByTestId("submit-btn");

    expect(btn).toBeInTheDocument();

    fireEvent.click(btn);

    expect(downLoadFileSpy).toBeCalledTimes(1);
  });

  it("should call reset handler when reset button is clicked", () => {
    render(<App />);

    const btn = screen.getByTestId("reset-btn");

    expect(btn).toBeInTheDocument();

    fireEvent.click(btn);
  });
});
