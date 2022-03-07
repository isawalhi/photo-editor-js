import { useEffect, useRef, useState } from "react";

import { fitImage } from "../utils";
import type { Dimensions, ImageRef } from "../types";

interface UseLoadImageArguments {
  source: URL;
  canvasDimensions: Dimensions;
  onLoadFailure: OnErrorEventHandler;
  setDimensions: (dimensions: Dimensions) => void;
  onDimensionsChange?: (dimensions: Dimensions) => void;
}

type UseLoadImage = (args: UseLoadImageArguments) => ImageRef;

export const useLoadImage: UseLoadImage = ({
  source,
  onLoadFailure,
  setDimensions,
  canvasDimensions,
  onDimensionsChange,
}) => {
  const [imageRef, setImageRef] = useState<ImageRef>();

  useEffect(() => {
    if (source) {
      const image = new Image();
      image.src = String(source);
      image.onload = function () {
        const imageWidth = image.naturalWidth;
        const imageHeight = image.naturalHeight;
        const { height, width } = fitImage(
          imageWidth,
          imageHeight,
          canvasDimensions.width,
          canvasDimensions.height
        );

        setDimensions({ width, height });
        onDimensionsChange?.({ width, height });
      };
      image.onerror = onLoadFailure;
      setImageRef(image);
    }
  }, [
    source,
    setDimensions,
    onDimensionsChange,
    canvasDimensions.width,
    canvasDimensions.height,
  ]);

  return imageRef;
};
