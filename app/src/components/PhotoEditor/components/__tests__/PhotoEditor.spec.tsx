import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PhotoEditor from "../PhotoEditor";
import { Button } from "../../../ui";

const CustomControlPanel = ({
  onScaleChange,
}: {
  onScaleChange: (value: number) => void;
}) => (
  <div>
    <Button data-testid="increase-scale" onClick={() => onScaleChange(10.5)}>
      Increase
    </Button>
  </div>
);

describe("<PhotoEditor />", () => {
  const initialProps = {
    onChange: jest.fn(),
    onLoadFailure: jest.fn(),
    onScaleChange: jest.fn(),
    onPositionChange: jest.fn(),
    fileName: "test-file-name",
    source:
      "https://static.xx.fbcdn.net/rsrc.php/y8/r/dF5SId3UHWd.svg" as unknown as URL,
  };

  beforeEach(() => {
    initialProps.onChange.mockClear();
  });
  it("should render with default props", () => {
    render(<PhotoEditor {...initialProps} />);

    const canvasEle = screen.getByTestId("canvas-area");

    expect(canvasEle).toBeInTheDocument();
    expect(canvasEle).toHaveAttribute("width", "1440");
    expect(canvasEle).toHaveAttribute("height", "960");
  });

  it("should render the canvas with width and height passed as props", () => {
    render(<PhotoEditor {...initialProps} width={45} height={12} />);

    const canvasEle = screen.getByTestId("canvas-area");

    expect(canvasEle).toBeInTheDocument();
    expect(canvasEle).toHaveAttribute("width", "4320");
    expect(canvasEle).toHaveAttribute("height", "1152");
  });

  it.each([
    ["left", -20, 0],
    ["right", 20, 0],
    ["up", 0, -20],
    ["down", 0, 20],
  ])(
    "should move the img to the %s if button is clicked",
    (direction, x, y) => {
      render(<PhotoEditor {...initialProps} width={45} height={12} />);

      const btn = screen.getByTestId(`button-${direction}`);

      initialProps.onChange.mockClear();

      expect(btn).toBeInTheDocument();

      fireEvent.click(btn);
      fireEvent.click(btn);

      expect(initialProps.onChange).toHaveBeenCalledTimes(2);
      expect(initialProps.onPositionChange).toHaveBeenCalledTimes(2);
      expect(initialProps.onPositionChange).toHaveBeenCalledWith({ x, y });
      expect(initialProps.onChange).toHaveBeenCalledWith({
        canvas: {
          height: 12,
          photo: {
            height: 0,
            id: "test-file-name",
            scale: 100,
            source: "https://static.xx.fbcdn.net/rsrc.php/y8/r/dF5SId3UHWd.svg",
            width: 0,
            x: x,
            y: y,
          },
          width: 45,
        },
      });
    }
  );

  it("should not call onPositionChange if it is not defined", () => {
    render(<PhotoEditor {...initialProps} onPositionChange={undefined} />);

    const btn = screen.getByTestId(`button-left`);

    initialProps.onChange.mockClear();

    expect(btn).toBeInTheDocument();

    fireEvent.click(btn);

    expect(initialProps.onChange).toHaveBeenCalledTimes(1);
    expect(initialProps.onPositionChange).not.toHaveBeenCalled();
  });

  it("should use the custom control panel is passed", () => {
    render(
      <PhotoEditor
        {...initialProps}
        onPositionChange={undefined}
        ControlPanelComponent={CustomControlPanel}
      />
    );

    const btn = screen.getByTestId(`increase-scale`);

    initialProps.onChange.mockClear();

    expect(btn).toBeInTheDocument();

    fireEvent.click(btn);

    expect(initialProps.onChange).toHaveBeenCalledTimes(1);
    expect(initialProps.onScaleChange).toHaveBeenCalledTimes(1);
    expect(initialProps.onScaleChange).toHaveBeenCalledWith(10.5);
  });

  it.todo("should change the scale as the slider is changing");
});
