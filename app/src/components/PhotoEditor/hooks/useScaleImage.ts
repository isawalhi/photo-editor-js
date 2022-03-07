import { useEffect, useState } from "react";
import { DEFAULT_SCALE } from "../constants";
import type { Dimensions } from "../types";

interface UseScaleImageArguments {
  scale: number;
  defaultScale: number;
  dimensions: Dimensions;
}

type UseScaleImageResults = Dimensions;

type UseScaleImage = (args: UseScaleImageArguments) => UseScaleImageResults;

export const useScaleImage: UseScaleImage = ({
  scale,
  dimensions,
  defaultScale,
}) => {
  const [scaledDimensions, setScaledDimensions] =
    useState<UseScaleImageResults>(dimensions);

  useEffect(() => {
    const { width, height } = dimensions;
    const scaledWidth = (width * scale) / defaultScale;
    const scaledHeight = (height * scale) / defaultScale;

    setScaledDimensions({ width: scaledWidth, height: scaledHeight });
  }, [scale, dimensions.width, dimensions.height, defaultScale]);

  return scaledDimensions;
};
