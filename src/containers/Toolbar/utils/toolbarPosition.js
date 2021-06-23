export const calcPosition = (
  currentCoords,
  canvasWidth,
  canvasHeight,
  toolbar,
  toolbarOffset,
  toolbarPadding,
) => {
  let toolbarWidth = toolbar.offsetWidth;
  let toolbarHeight = toolbar.offsetHeight;

  let isBottomCloser = currentCoords.tl.y > currentCoords.bl.y;
  let offset = isBottomCloser ? toolbarOffset + toolbarHeight : toolbarOffset;

  // Coord Y
  let coordY =
    Math.min(
      currentCoords.tl.y,
      currentCoords.tr.y,
      currentCoords.br.y,
      currentCoords.bl.y
    ) -
    toolbarHeight -
    offset;
  if (coordY - toolbarPadding < 0) {
    let tempCoordY =
      Math.max(
        currentCoords.tl.y,
        currentCoords.tr.y,
        currentCoords.br.y,
        currentCoords.bl.y
      ) +
      toolbarOffset +
      (!isBottomCloser ? toolbarHeight : 0);
    if (tempCoordY + toolbarPadding + toolbarHeight < canvasHeight)
      coordY = tempCoordY;
    else coordY = canvasHeight - toolbarHeight - toolbarOffset;
  }

  // Coord X
  let coordX = Math.min(
    currentCoords.tl.x,
    currentCoords.tr.x,
    currentCoords.br.x,
    currentCoords.bl.x
  );
  if (coordX + toolbarWidth > canvasWidth) coordX = canvasWidth - toolbarWidth;
  else if (coordX < 0) coordX = 0;
  return { coordX, coordY };
};
