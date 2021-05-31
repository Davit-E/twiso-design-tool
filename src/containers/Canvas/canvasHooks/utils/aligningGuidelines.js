import { fabric } from 'fabric';

const drawLine = (
  x1,
  y1,
  x2,
  y2,
  ctx,
  aligningLineWidth,
  aligningLineColor,
  viewportTransform,
  zoom
) => {
  ctx.save();
  ctx.lineWidth = aligningLineWidth;
  ctx.strokeStyle = aligningLineColor;
  ctx.beginPath();
  ctx.moveTo(
    (x1 + viewportTransform[4]) * zoom,
    (y1 + viewportTransform[5]) * zoom
  );
  ctx.lineTo(
    (x2 + viewportTransform[4]) * zoom,
    (y2 + viewportTransform[5]) * zoom
  );
  ctx.stroke();
  ctx.restore();
};

const isInRange = (value1, value2, aligningLineMargin) => {
  value1 = Math.round(value1);
  value2 = Math.round(value2);
  for (
    let i = value1 - aligningLineMargin, len = value1 + aligningLineMargin;
    i <= len;
    i++
  ) {
    if (i === value2) {
      return true;
    }
  }
  return false;
};

export const drawVerticalLine = (
  coords,
  ctx,
  aligningLineWidth,
  aligningLineColor,
  viewportTransform,
  zoom
) => {
  drawLine(
    coords.x + 0.5,
    coords.y1 > coords.y2 ? coords.y2 : coords.y1,
    coords.x + 0.5,
    coords.y2 > coords.y1 ? coords.y2 : coords.y1,
    ctx,
    aligningLineWidth,
    aligningLineColor,
    viewportTransform,
    zoom
  );
};

export const drawHorizontalLine = (
  coords,
  ctx,
  aligningLineWidth,
  aligningLineColor,
  viewportTransform,
  zoom
) => {
  drawLine(
    coords.x1 > coords.x2 ? coords.x2 : coords.x1,
    coords.y + 0.5,
    coords.x2 > coords.x1 ? coords.x2 : coords.x1,
    coords.y + 0.5,
    ctx,
    aligningLineWidth,
    aligningLineColor,
    viewportTransform,
    zoom
  );
};

export const objectMovingObserver = (
  e,
  canvas,
  viewportTransform,
  aligningLineOffset,
  setVerticalLines,
  setHorizontalLines,
  aligningLineMargin
) => {
  let activeObject = e.target,
    canvasObjects = canvas.getObjects(),
    activeObjectCenter = activeObject.getCenterPoint(),
    activeObjectLeft = activeObjectCenter.x,
    activeObjectTop = activeObjectCenter.y,
    activeObjectBoundingRect = activeObject.getBoundingRect(),
    activeObjectHeight = activeObjectBoundingRect.height / viewportTransform[3],
    activeObjectWidth = activeObjectBoundingRect.width / viewportTransform[0],
    horizontalInTheRange = false,
    verticalInTheRange = false,
    transform = canvas._currentTransform;

  if (!transform) return;

  for (let i = canvasObjects.length; i--; ) {
    if (canvasObjects[i] === activeObject) continue;

    let objectCenter = canvasObjects[i].getCenterPoint(),
      objectLeft = objectCenter.x,
      objectTop = objectCenter.y,
      objectBoundingRect = canvasObjects[i].getBoundingRect(),
      objectHeight = objectBoundingRect.height / viewportTransform[3],
      objectWidth = objectBoundingRect.width / viewportTransform[0];

    // snap by the horizontal center line
    if (isInRange(objectLeft, activeObjectLeft, aligningLineMargin)) {
      verticalInTheRange = true;
      setVerticalLines((prevState) => [
        ...prevState,
        {
          x: objectLeft,
          y1:
            objectTop < activeObjectTop
              ? objectTop - objectHeight / 2 - aligningLineOffset
              : objectTop + objectHeight / 2 + aligningLineOffset,
          y2:
            activeObjectTop > objectTop
              ? activeObjectTop + activeObjectHeight / 2 + aligningLineOffset
              : activeObjectTop - activeObjectHeight / 2 - aligningLineOffset,
        },
      ]);

      activeObject.setPositionByOrigin(
        new fabric.Point(objectLeft, activeObjectTop),
        'center',
        'center'
      );
    }

    // snap by the left edge
    if (
      isInRange(
        objectLeft - objectWidth / 2,
        activeObjectLeft - activeObjectWidth / 2,
        aligningLineMargin
      )
    ) {
      verticalInTheRange = true;
      setVerticalLines((prevState) => [
        ...prevState,
        {
          x: objectLeft - objectWidth / 2,
          y1:
            objectTop < activeObjectTop
              ? objectTop - objectHeight / 2 - aligningLineOffset
              : objectTop + objectHeight / 2 + aligningLineOffset,
          y2:
            activeObjectTop > objectTop
              ? activeObjectTop + activeObjectHeight / 2 + aligningLineOffset
              : activeObjectTop - activeObjectHeight / 2 - aligningLineOffset,
        },
      ]);

      activeObject.setPositionByOrigin(
        new fabric.Point(
          objectLeft - objectWidth / 2 + activeObjectWidth / 2,
          activeObjectTop
        ),
        'center',
        'center'
      );
    }

    // snap by the right edge
    if (
      isInRange(
        objectLeft + objectWidth / 2,
        activeObjectLeft + activeObjectWidth / 2,
        aligningLineMargin
      )
    ) {
      verticalInTheRange = true;
      setVerticalLines((prevState) => [
        ...prevState,
        {
          x: objectLeft + objectWidth / 2,
          y1:
            objectTop < activeObjectTop
              ? objectTop - objectHeight / 2 - aligningLineOffset
              : objectTop + objectHeight / 2 + aligningLineOffset,
          y2:
            activeObjectTop > objectTop
              ? activeObjectTop + activeObjectHeight / 2 + aligningLineOffset
              : activeObjectTop - activeObjectHeight / 2 - aligningLineOffset,
        },
      ]);

      activeObject.setPositionByOrigin(
        new fabric.Point(
          objectLeft + objectWidth / 2 - activeObjectWidth / 2,
          activeObjectTop
        ),
        'center',
        'center'
      );
    }

    // snap by the vertical center line
    if (isInRange(objectTop, activeObjectTop, aligningLineMargin)) {
      horizontalInTheRange = true;
      setHorizontalLines((prevState) => [
        ...prevState,
        {
          y: objectTop,
          x1:
            objectLeft < activeObjectLeft
              ? objectLeft - objectWidth / 2 - aligningLineOffset
              : objectLeft + objectWidth / 2 + aligningLineOffset,
          x2:
            activeObjectLeft > objectLeft
              ? activeObjectLeft + activeObjectWidth / 2 + aligningLineOffset
              : activeObjectLeft - activeObjectWidth / 2 - aligningLineOffset,
        },
      ]);

      activeObject.setPositionByOrigin(
        new fabric.Point(activeObjectLeft, objectTop),
        'center',
        'center'
      );
    }

    // snap by the top edge
    if (
      isInRange(
        objectTop - objectHeight / 2,
        activeObjectTop - activeObjectHeight / 2,
        aligningLineMargin
      )
    ) {
      horizontalInTheRange = true;
      setHorizontalLines((prevState) => [
        ...prevState,
        {
          y: objectTop - objectHeight / 2,
          x1:
            objectLeft < activeObjectLeft
              ? objectLeft - objectWidth / 2 - aligningLineOffset
              : objectLeft + objectWidth / 2 + aligningLineOffset,
          x2:
            activeObjectLeft > objectLeft
              ? activeObjectLeft + activeObjectWidth / 2 + aligningLineOffset
              : activeObjectLeft - activeObjectWidth / 2 - aligningLineOffset,
        },
      ]);
      activeObject.setPositionByOrigin(
        new fabric.Point(
          activeObjectLeft,
          objectTop - objectHeight / 2 + activeObjectHeight / 2
        ),
        'center',
        'center'
      );
    }

    // snap by the bottom edge
    if (
      isInRange(
        objectTop + objectHeight / 2,
        activeObjectTop + activeObjectHeight / 2,
        aligningLineMargin
      )
    ) {
      horizontalInTheRange = true;
      setHorizontalLines((prevState) => [
        ...prevState,
        {
          y: objectTop + objectHeight / 2,
          x1:
            objectLeft < activeObjectLeft
              ? objectLeft - objectWidth / 2 - aligningLineOffset
              : objectLeft + objectWidth / 2 + aligningLineOffset,
          x2:
            activeObjectLeft > objectLeft
              ? activeObjectLeft + activeObjectWidth / 2 + aligningLineOffset
              : activeObjectLeft - activeObjectWidth / 2 - aligningLineOffset,
        },
      ]);

      activeObject.setPositionByOrigin(
        new fabric.Point(
          activeObjectLeft,
          objectTop + objectHeight / 2 - activeObjectHeight / 2
        ),
        'center',
        'center'
      );
    }
  }

  if (!horizontalInTheRange) setHorizontalLines([]);
  if (!verticalInTheRange) setVerticalLines([]);
};
