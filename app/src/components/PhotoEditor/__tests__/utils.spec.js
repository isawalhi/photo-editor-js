import {
  fitImage,
  convertUnits,
  getConversionRatio,
  getScaleFromInstructions,
  getPositionFromImageInstructions,
  getDimensionsFromImageInstructions,
} from "./../utils";

describe("utils", () => {
  const imageInstructions = {
    canvas: {
      height: 10,
      width: 20,
      photo: {
        width: 20,
        height: 100,
        id: "photo-id",
        source: "url:source",
        scale: 1.5,
        x: 4,
        y: -2.5,
      },
    },
  };
  describe("getConversionRatio", () => {
    it.each([
      ["px", "px", 1],
      ["in", "in", 1],
      ["px", "in", 1 / 96],
      ["in", "px", 96],
    ])(
      "should return the correct ratio (current unit: %s, target unit: %s)",
      (current, target, result) => {
        expect(getConversionRatio(current, target)).toBe(result);
      }
    );

    it.each([
      ["px2", undefined],
      [undefined, "in"],
      ["test", "in"],
      ["1", "2"],
    ])("throws an error if the unit is not supported", (current, target) => {
      expect(() => getConversionRatio(current, target)).toThrowError(
        "Unsupported unit"
      );
    });
  });

  describe("convertUnits", () => {
    it.each([
      [0, "in", "in", 0],
      [0, "px", "in", 0],
      [0, "in", "px", 0],
      [20, "px", "px", 20],
      [500, "in", "px", 48000],
      [1000, "px", "in", 1000 / 96],
    ])(
      "should return the correct value (value: %s, current unit: %s, target unit: %s, expected: %s)",
      (value, current, target, result) => {
        expect(convertUnits(value, current, target)).toBe(result);
      }
    );
  });

  describe("fitImage", () => {
    it.each([
      [10, 20, 10, 20, { width: 10, height: 20 }],
      [10, 20, 100, 200, { width: 100, height: 200 }],
      [50, 20, 100, 200, { width: 500, height: 200 }],
      [10, 20, 100, 20, { width: 100, height: 200 }],
      [10, 2000, 100, 200, { width: 100, height: 20000 }],
    ])(
      "should fit the image to the canvas (w: %s, h: %s, cWidth: %s, cHeight: %s)",
      (width, height, cWidth, cHeight, result) => {
        expect(fitImage(width, height, cWidth, cHeight)).toEqual(result);
      }
    );
  });

  describe("getScaleFromInstructions", () => {
    it("should return the scale factor", () => {
      expect(getScaleFromInstructions(imageInstructions)).toEqual(1.5);
    });

    it("should return undefined if data is undefined", () => {
      expect(getScaleFromInstructions(undefined)).toEqual(undefined);
    });

    it("should return undefined if canvas is undefined", () => {
      expect(getScaleFromInstructions({ canvas: undefined })).toEqual(
        undefined
      );
    });
  });

  describe("getPositionFromImageInstructions", () => {
    it("should return the position", () => {
      expect(getPositionFromImageInstructions(imageInstructions)).toEqual({
        x: 4,
        y: -2.5,
      });
    });

    it("should return central position if data is undefined", () => {
      expect(getPositionFromImageInstructions(undefined)).toEqual({
        x: 0,
        y: 0,
      });
    });

    it("should return undefined if canvas is undefined", () => {
      expect(getPositionFromImageInstructions({ canvas: undefined })).toEqual({
        x: 0,
        y: 0,
      });
    });
  });

  describe("getDimensionsFromImageInstructions", () => {
    it("should return the position", () => {
      expect(getDimensionsFromImageInstructions(imageInstructions)).toEqual({
        width: 20,
        height: 100,
      });
    });

    it("should return central position if data is undefined", () => {
      expect(getDimensionsFromImageInstructions(undefined)).toEqual({
        width: 0,
        height: 0,
      });
    });

    it("should return undefined if canvas is undefined", () => {
      expect(getDimensionsFromImageInstructions({ canvas: undefined })).toEqual(
        {
          width: 0,
          height: 0,
        }
      );
    });
  });
});
