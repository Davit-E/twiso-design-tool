import { fabric } from 'fabric';

export const scaleAndPositionImage = (image, state, canvas) => {
  let canvasAspect = state.width / state.height;
  let imgAspect = image.width / image.height;
  let left, top, scaleFactor;
  if (canvasAspect >= imgAspect) {
    scaleFactor = state.width / image.width;
    left = 0;
    top = -(image.height * scaleFactor - state.height) / 2;
  } else {
    scaleFactor = state.height / image.height;
    top = 0;
    left = -(image.width * scaleFactor - state.width) / 2;
  }
  canvas.setBackgroundImage(image, canvas.requestRenderAll.bind(canvas), {
    top: top,
    left: left,
    originX: 'left',
    originY: 'top',
    scaleX: scaleFactor,
    scaleY: scaleFactor,
  });
};

export const updateCanvasStyle = (state, canvas, dispatch) => {
  canvas.backgroundColor = state.backgroundColor;
  if (state.backgroundImage !== 0) {
    fabric.Image.fromURL(state.backgroundImage, (img) => {
      scaleAndPositionImage(img, state, canvas);
    });
    dispatch({ type: 'setShouldAddCanvasBgImage', data: false });
    dispatch({ type: 'setShowCanvasToolbar', data: false });
  } else {
    canvas.backgroundImage = 0;
    canvas.requestRenderAll();
  }
  dispatch({ type: 'setShouldUpdateCanvas', data: false });
};

export const updateCanvasSize = (state, canvas, dispatch) => {};
