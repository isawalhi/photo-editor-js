import React from "react";

import type { DirectionType } from "../types";
import { Button, Col, Row, Slider } from "../../ui";
import { DEFAULT_SCALE, Directions } from "../constants";

interface ControlPanelProps {
  sliderProps?: any;
  initialScale: number;
  defaultScale: number;
  positionStepSize: number;
  onScaleChange: (scale: number) => void;
  onPositionChange: (direction: DirectionType) => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  sliderProps = {},
  initialScale,
  onScaleChange,
  onPositionChange,
  positionStepSize,
  defaultScale = DEFAULT_SCALE,
}) => {
  return (
    <Row gutter={24}>
      <Col>
        {Object.values(Directions).map((direction) => (
          <Button
            key={direction}
            data-testid={`button-${direction}`}
            onClick={() => onPositionChange(direction)}
          >
            {`${positionStepSize} to ${direction}`}
          </Button>
        ))}
      </Col>
      <Col span={8}>
        <Slider
          min={1}
          step={0.1}
          max={defaultScale * 2}
          onChange={onScaleChange}
          data-testid="scale-slider"
          defaultValue={initialScale}
          {...sliderProps}
        />
      </Col>
    </Row>
  );
};
