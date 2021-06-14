import { useEffect, useState } from 'react';
import { fabric } from 'fabric';
import { scaleAndPositionImage } from './utils/updateCanvas';

const initCanvas = (state) => {
  let canvas = new fabric.Canvas('canvas', {
    width: state.width,
    height: state.height,
    backgroundColor: state.backgroundColor,
  });
  if (state.backgroundImage) {
    fabric.Image.fromURL(state.backgroundImage, function (img) {
      scaleAndPositionImage(img, state, canvas);
    });
  }
  return canvas;
};

const useInitCanvas = (state, setCanvas, setIsCanvasSet) => {
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    if (isFirstLoad) {
      setIsFirstLoad(false);
      setCanvas(initCanvas(state.canvasState));
      setIsCanvasSet(true);
    }
  }, [setCanvas, setIsCanvasSet, state.canvasState, isFirstLoad]);
};

export default useInitCanvas;
