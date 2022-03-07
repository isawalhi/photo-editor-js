import React from 'react'
import { renderHook } from "@testing-library/react-hooks";
import { useLoadImage } from "..";

describe("useLoadImage", () => {
  const mockClearRect = jest.fn();
  const mockDrawImage = jest.fn();

  const mockGetContext = jest.fn().mockReturnValue({
    clearRect: mockClearRect,
    drawImage: mockDrawImage,
  });

  const initialProps = {
    source: "https://static.xx.fbcdn.net/rsrc.php/y8/r/dF5SId3UHWd.svg",
    onLoadFailure: jest.fn(),
    setDimensions: jest.fn(),
    onDimensionsChange: jest.fn(),
    canvasDimensions: { width: 50, height: 100 },
  };

  beforeEach(() => {
    mockGetContext.mockClear();
  });

  it("should load the image", async () => {
    const { result } = renderHook(() =>
      useLoadImage({
        ...initialProps,
      })
    );

    expect(result.current.href).toEqual(initialProps.src);

    result.current.onload()
    
    expect(initialProps.setDimensions).toHaveBeenCalledTimes(1);
    expect(initialProps.onDimensionsChange).toHaveBeenCalledTimes(1);
  });

  it("should not load the image if the source is undefined", () => {
    const { result } = renderHook(() =>
    useLoadImage({
      ...initialProps,
      source: undefined
    })
  );


  expect(result.current).toEqual(undefined);
  });
});
