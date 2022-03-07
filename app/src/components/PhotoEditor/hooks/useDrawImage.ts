import { useEffect } from "react";
import type { Dimensions, Position, ImageRef, CanvasRef } from "../types";

interface UseDrawImageArguments {
  imageRef: ImageRef;
  position: Position;
  dimensions: Dimensions;
  canvasRef: CanvasRef | null;
  canvasDimensions: Dimensions;
}

type UseDrawImage = (args: UseDrawImageArguments) => void;

export const useDrawImage: UseDrawImage = ({
  position,
  imageRef,
  canvasRef,
  dimensions,
  canvasDimensions,
}) => {
  useEffect(() => {
    if (imageRef && canvasRef) {
      const context = canvasRef.getContext("2d");

      context?.clearRect(0, 0, canvasDimensions.width, canvasDimensions.height);

      context?.drawImage(
        imageRef,
        position.x,
        position.y,
        dimensions.width,
        dimensions.height
      );
    }
  }, [
    imageRef,
    canvasRef,
    dimensions.width,
    dimensions.height,
    canvasDimensions.width,
    canvasDimensions.height,
    position.x,
    position.y,
  ]);
};
