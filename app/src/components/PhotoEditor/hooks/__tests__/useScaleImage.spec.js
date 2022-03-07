import { renderHook } from "@testing-library/react-hooks";
import { useScaleImage } from "..";

describe("useScaleImage", () => {
  it("should scale the image", () => {
    const initialProps = {
      scale: 1,
      defaultScale: 10,
      dimensions: { width: 10, height: 20 },
    };
    const { result, rerender } = renderHook(
      (props) =>
        useScaleImage({
          ...props,
        }),
      {
        initialProps,
      }
    );

    expect(result.current).toEqual({ height: 2, width: 1 });

    rerender({
      ...initialProps,
      scale: 2,
    });

    expect(result.current).toEqual({ height: 4, width: 2 });

    rerender({
      ...initialProps,
      scale: 2,
      defaultScale: 100,
    });

    expect(result.current).toEqual({ height: 0.4, width: 0.2 });

    rerender({
      ...initialProps,
      scale: 2,
      defaultScale: 100,
      dimensions: { width: 1010, height: 2020 },
    });

    expect(result.current).toEqual({ height: 40.4, width: 20.2 });
  });
});
