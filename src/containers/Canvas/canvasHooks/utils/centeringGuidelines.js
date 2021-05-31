import { fabric } from 'fabric';

const showCenterLine = (
  x1,
  y1,
  x2,
  y2,
  ctx,
  centerLineColor,
  centerLineWidth,
  viewportTransform
) => {
  ctx.save();
  ctx.strokeStyle = centerLineColor;
  ctx.lineWidth = centerLineWidth;
  ctx.beginPath();
  ctx.moveTo(x1 * viewportTransform[0], y1 * viewportTransform[3]);
  ctx.lineTo(x2 * viewportTransform[0], y2 * viewportTransform[3]);
  ctx.stroke();
  ctx.restore();
};

export const showVerticalCenterLine = (
  canvasWidthCenter,
  canvasHeight,
  ctx,
  centerLineColor,
  centerLineWidth,
  viewportTransform
) => {
  showCenterLine(
    canvasWidthCenter + 0.5,
    0,
    canvasWidthCenter + 0.5,
    canvasHeight,
    ctx,
    centerLineColor,
    centerLineWidth,
    viewportTransform
  );
};

export const showHorizontalCenterLine = (
  canvasHeightCenter,
  canvasWidth,
  ctx,
  centerLineColor,
  centerLineWidth,
  viewportTransform
) => {
  showCenterLine(
    0,
    canvasHeightCenter + 0.5,
    canvasWidth,
    canvasHeightCenter + 0.5,
    ctx,
    centerLineColor,
    centerLineWidth,
    viewportTransform
  );
};

export const objectMovingCenterObserver = (
  e,
  canvas,
  setIsInVerticalCenter,
  setIsInHorizontalCenter,
  canvasWidthCenterMap,
  canvasHeightCenterMap,
  canvasWidth,
  canvasHeight
) => {
  let object = e.target,
    objectCenter = object.getCenterPoint(),
    transform = canvas._currentTransform;

  if (!transform) return;
  let isInVertical = Math.round(objectCenter.x) in canvasWidthCenterMap;
  let isInHorizontal = Math.round(objectCenter.y) in canvasHeightCenterMap;
  setIsInVerticalCenter(isInVertical);
  setIsInHorizontalCenter(isInHorizontal);

  if (isInVertical || isInHorizontal) {
    object.setPositionByOrigin(
      new fabric.Point(
        isInVertical ? canvasWidth / 2 : objectCenter.x,
        isInHorizontal ? canvasHeight / 2 : objectCenter.y
      ),
      'center',
      'center'
    );
  }
};
