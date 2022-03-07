import { Directions, Unit } from "./constants";



export type UnitType = typeof Unit[keyof typeof Unit];

export type DirectionType = typeof Directions[keyof typeof Directions];

export type Dimensions = { width: number; height: number };
export type Position = { x: number; y: number };

export type ImageRef = HTMLImageElement | undefined;
export type CanvasRef = HTMLCanvasElement;

type PhotoData = {
  x: number;
  y: number;
  id: string;
  source: URL;
  scale: number;
  width: number;
  height: number;
};

type CanvasData = {
  width: number;
  height: number;
  photo: PhotoData;
};

export type ImageInstructions = { canvas: CanvasData };
