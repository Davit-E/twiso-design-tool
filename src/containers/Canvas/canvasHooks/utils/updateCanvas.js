import { fabric } from 'fabric';

export const scaleAndPositionImage = (state, canvas) => {
  canvas.bgImage = state.backgroundImage.src;
  fabric.Image.fromURL(state.backgroundImage.src, (img) => {
    let canvasAspect = state.width / state.height;
    let imgAspect = img.width / img.height;
    let left, top, scaleFactor;
    if (canvasAspect >= imgAspect) {
      scaleFactor = (state.width * state.zoom) / canvas.getZoom() / img.width;
      left = 0;
      top =
        -(
          img.height * scaleFactor -
          (state.height * state.zoom) / canvas.getZoom()
        ) / 2;
    } else {
      scaleFactor = (state.height * state.zoom) / canvas.getZoom() / img.height;
      top = 0;
      left =
        -(
          img.width * scaleFactor -
          (state.width * state.zoom) / canvas.getZoom()
        ) / 2;
    }
    canvas.hoverCursor = 'default';
    img.top = top;
    img.left = left;
    img.originX = 'left';
    img.originY = 'top';
    img.scaleX = scaleFactor;
    img.scaleY = scaleFactor;
    img.selectable = false;
    canvas.add(img);
    img.id = 'background';
    canvas.getObjects().forEach(() => canvas.sendBackwards(img));
    canvas.requestRenderAll();
  });
};

export const updateCanvasStyle = (state, canvas, dispatch) => {
  canvas.backgroundColor = state.backgroundColor;
  canvas.getObjects().forEach((el) => {
    if (el.id === 'background') canvas.remove(el);
  });
  if (state.backgroundImage.src) {
    scaleAndPositionImage(state, canvas);
    dispatch({ type: 'setShouldAddCanvasBgImage', data: false });
    dispatch({ type: 'setShowCanvasToolbar', data: false });
  } else {
    canvas.requestRenderAll();
  }
  dispatch({ type: 'setShouldUpdateCanvas', data: false });
};

export const updateCanvasSize = (state, canvas, dispatch) => {
  canvas.discardActiveObject();
  let ratio = Math.min(
    state.width / state.initialWidth,
    state.height / state.initialHeight
  );
  canvas.setZoom(ratio * state.zoom);
  canvas.zoom = state.zoom;
  canvas.setDimensions({
    width: state.width * state.zoom,
    height: state.height * state.zoom,
  });

  canvas.getObjects().forEach((el) => {
    if (el.id === 'background') canvas.remove(el);
  });
  if (state.backgroundImage.src) {
    scaleAndPositionImage(state, canvas);
  }
  canvas.requestRenderAll();
  dispatch({ type: 'setShouldUpdateCanvasSize', data: false });
};
