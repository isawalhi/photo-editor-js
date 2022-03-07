import { Dimensions, ImageInstructions, Position, UnitType } from "./types";

export const getConversionRatio = (
  currentUnit: UnitType,
  targetUnit: UnitType
) => {
  const IN_2_PX_RATIO = 96;

  switch (`${currentUnit}2${targetUnit}`) {
    case "px2px":
    case "in2in":
      return 1;
    case "in2px":
      return IN_2_PX_RATIO;
    case "px2in":
      return 1 / IN_2_PX_RATIO;
    default:
      throw new Error("Unsupported unit");
  }
};

export const convertUnits = (
  value: number,
  currentUnit: UnitType,
  targetUnit: UnitType
) => {
  return value * getConversionRatio(currentUnit, targetUnit);
};

export const fitImage = (
  imgWidth: number,
  imgHeight: number,
  canvasWidth: number,
  canvasHeight: number
) => {
  let result;
  const isHorizontal = imgWidth > imgHeight;

  //Fit image to canvas size
  if (isHorizontal) {
    result = fitHorizontal(imgWidth, imgHeight, canvasWidth);
    if (result.height < canvasHeight) {
      result = fitVertical(result.width, result.height, canvasHeight);
    }
  } else {
    result = fitVertical(imgWidth, imgHeight, canvasHeight);
    if (result.width < canvasWidth) {
      result = fitHorizontal(result.width, result.height, canvasWidth);
    }
  }

  return result;
};

export const fitVertical = (
  imgWidth: number,
  imgHeight: number,
  canvasHeight: number
) => {
  let ratio = canvasHeight / imgHeight;
  return { width: Math.floor(imgWidth * ratio), height: canvasHeight };
};

export const fitHorizontal = (
  imgWidth: number,
  imgHeight: number,
  canvasWidth: number
) => {
  let ratio = canvasWidth / imgWidth;
  return { width: canvasWidth, height: Math.floor(imgHeight * ratio) };
};

export const getScaleFromInstructions = (
  instructions: ImageInstructions | undefined
): number | undefined => {
  return instructions?.canvas ? instructions.canvas.photo.scale : undefined;
};

export const getPositionFromImageInstructions = (
  instructions: ImageInstructions | undefined
): Position => {
  return instructions?.canvas
    ? { x: instructions.canvas.photo.x, y: instructions.canvas.photo.y }
    : { x: 0, y: 0 };
};

export const getDimensionsFromImageInstructions = (
  instructions: ImageInstructions | undefined
): Dimensions => {
  return instructions?.canvas
    ? {
        width: instructions.canvas.photo.width,
        height: instructions.canvas.photo.height,
      }
    : { width: 0, height: 0 };
};
