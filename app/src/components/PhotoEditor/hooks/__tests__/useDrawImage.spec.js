import { renderHook } from "@testing-library/react-hooks";
import { useDrawImage } from "..";

describe("useDrawImage", () => {
  const mockClearRect = jest.fn();
  const mockDrawImage = jest.fn();

  const mockGetContext = jest.fn().mockReturnValue({
    clearRect: mockClearRect,
    drawImage: mockDrawImage,
  });

  const initialProps = {
    position: { x: 0, y: 0 },
    imageRef: jest.fn(),
    canvasRef: {
      getContext: mockGetContext,
    },
    dimensions: { width: 100, height: 100 },
    canvasDimensions: { width: 200, height: 200 },
  };

  beforeEach(() => {
    mockGetContext.mockClear();
  });

  it("should load the image", () => {
    renderHook(() =>
      useDrawImage({
        ...initialProps,
      })
    );

    expect(mockGetContext).toHaveBeenCalledTimes(1);
    expect(mockGetContext).toHaveBeenCalledWith("2d");

    expect(mockClearRect).toHaveBeenCalledTimes(1);
    expect(mockClearRect).toHaveBeenCalledWith(0, 0, 200, 200);

    expect(mockDrawImage).toHaveBeenCalledTimes(1);
    expect(mockDrawImage).toHaveBeenCalledWith(
      initialProps.imageRef,
      0,
      0,
      100,
      100
    );
  });

  it("should not draw the image if it is undefined", () => {
    renderHook(() =>
      useDrawImage({
        ...initialProps,
        imageRef: undefined,
      })
    );

    expect(mockGetContext).toHaveBeenCalledTimes(0);
    expect(mockClearRect).toHaveBeenCalledTimes(0);
    expect(mockDrawImage).toHaveBeenCalledTimes(0);
  });

  it("should not draw the image if canvasRef is undefined", () => {
    renderHook(() =>
      useDrawImage({
        ...initialProps,
        canvasRef: undefined,
      })
    );

    expect(mockGetContext).toHaveBeenCalledTimes(0);
    expect(mockClearRect).toHaveBeenCalledTimes(0);
    expect(mockDrawImage).toHaveBeenCalledTimes(0);
  });
});
