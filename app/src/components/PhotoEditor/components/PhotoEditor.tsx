import React, {
  useRef,
  useMemo,
  useState,
  useCallback,
  useEffect,
} from "react";

import { ControlPanel } from "./ControlPanel";

import { Space } from "../../ui";
import { convertUnits } from "../utils";
import { useDrawImage, useLoadImage, useScaleImage } from "../hooks";
import type {
  Position,
  UnitType,
  CanvasRef,
  Dimensions,
  DirectionType,
} from "../types";
import {
  UNIT,
  STEP_SIZE,
  MAX_WIDTH,
  MAX_HEIGHT,
  DEFAULT_SCALE,
} from "../constants";

interface PhotoEditorProps {
  /** Image url */
  source: URL;
  /** Canvas width */
  width?: number;
  /** Canvas height */
  height?: number;
  /** Height width unit: px | in */
  unit?: UnitType;
  /** Image file name */
  fileName: String;
  /** Initial value of image scale */
  initialScale?: number;
  /** Step size for position */
  positionStepSize?: number;
  /** Inline style */
  style?: React.CSSProperties;
  /** Initial Position the image inside canvas */
  initialPosition?: Position;
  /** Initial width / height of the image */
  initialImageDimensions?: Dimensions;
  /** Custom component to replace the control panel */
  ControlPanelComponent?: React.FC<any>;
  /** Set the handler to handle change event */
  onChange: (data: any) => void;
  /** Set the handler to handle load image failure */
  onLoadFailure: OnErrorEventHandler;
  /** Set the handler to handle load image success */
  onLoadSuccess?: () => void;
  /** Set the handler to handle load image ready */
  onImageReady?: () => void;
  /** Set the handler to handle load image change */
  onImageChange?: () => void;
  /** Set the handler to handle scale change */
  onScaleChange?: (value: number) => void;
  /** Set the handler to handle position change */
  onPositionChange?: (position: Position) => void;
  /** Set the handler to handle dimensions change */
  onDimensionsChange?: (dimensions: Dimensions) => void;
}

const PhotoEditor: React.FC<PhotoEditorProps> = (props) => {
  const {
    source,
    unit = UNIT,
    width = MAX_WIDTH,
    height = MAX_HEIGHT,
    fileName,

    style = {},
    initialScale = 100,
    positionStepSize = STEP_SIZE,
    initialPosition = { x: 0, y: 0 },
    initialImageDimensions = {
      width: 0,
      height: 0,
    },

    onChange,
    onLoadFailure,
    onScaleChange,
    onPositionChange,
    onDimensionsChange,

    ControlPanelComponent = ControlPanel,
  } = props;
  const canvasRef = useRef<CanvasRef>(null);
  const [scale, setScale] = useState(initialScale);
  const [position, setPosition] = useState(initialPosition);
  const [dimensions, setDimensions] = useState<Dimensions>(
    initialImageDimensions
  );

  const { canvasWidthPx, canvasHeightPx } = useMemo(() => {
    const canvasWidthPx = convertUnits(width, unit, "px");
    const canvasHeightPx = convertUnits(height, unit, "px");
    return { canvasWidthPx, canvasHeightPx };
  }, [width, height]);

  const canvasDimensionsPx = { width: canvasWidthPx, height: canvasHeightPx };

  const currentImageRef = useLoadImage({
    source,
    onLoadFailure,
    setDimensions,
    onDimensionsChange,
    canvasDimensions: canvasDimensionsPx,
  });

  const scaledImageDimensions = useScaleImage({
    scale,
    dimensions,
    defaultScale: DEFAULT_SCALE,
  });

  useDrawImage({
    position,
    imageRef: currentImageRef,
    canvasRef: canvasRef.current,
    dimensions: scaledImageDimensions,
    canvasDimensions: canvasDimensionsPx,
  });

  useEffect(() => {
    onChange({
      canvas: {
        width: width,
        height: height,
        photo: {
          id: fileName,
          scale: scale,
          source: source,
          width: convertUnits(scaledImageDimensions.width, "px", unit),
          height: convertUnits(scaledImageDimensions.height, "px", unit),
          x: position.x,
          y: position.y,
        },
      },
    });
  }, [
    scale,
    width,
    height,
    source,
    fileName,
    position.x,
    position.y,
    scaledImageDimensions.width,
    scaledImageDimensions.height,
  ]);

  const handleScaleChange = useCallback(
    (value: number) => {
      setScale(value);
      onScaleChange?.(value);
    },
    [setScale, onScaleChange]
  );

  const handlePositionChange = useCallback(
    (type: DirectionType) => {
      let updatedPosition = { ...position };

      switch (type) {
        case "up":
          updatedPosition.y -= positionStepSize;
          break;
        case "down":
          updatedPosition.y += positionStepSize;
          break;
        case "right":
          updatedPosition.x += positionStepSize;
          break;
        case "left":
          updatedPosition.x -= positionStepSize;
          break;
        default:
          break;
      }
      setPosition(updatedPosition);
      onPositionChange?.(updatedPosition);
    },
    [position, setPosition, onPositionChange]
  );

  return (
    <Space direction="vertical" size={"large"}>
      <canvas
        ref={canvasRef}
        width={canvasWidthPx}
        height={canvasHeightPx}
        data-testid="canvas-area"
        style={{ border: "2px solid #40a9ff", ...style }}
      />

      <ControlPanelComponent
        initialScale={initialScale}
        defaultScale={DEFAULT_SCALE}
        onScaleChange={handleScaleChange}
        positionStepSize={positionStepSize}
        onPositionChange={handlePositionChange}
      />
    </Space>
  );
};

export default PhotoEditor;
