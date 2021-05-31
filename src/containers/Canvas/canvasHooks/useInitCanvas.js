import { useEffect } from 'react';
import { fabric } from 'fabric';

const initCanvas = (width, height) => {
  let fabricCanvas = new fabric.Canvas('canvas', {
    width: width,
    height: height,
    backgroundColor: '#FFFFFF',
  });
  return fabricCanvas;
};
const useInitCanvas = (state, setCanvas, setIsCanvasSet) => {
  useEffect(() => {
    setCanvas(initCanvas(state.canvasWidth, state.canvasHeight));
    setIsCanvasSet(true);
  }, [setCanvas, setIsCanvasSet, state.canvasWidth, state.canvasHeight]);
};

export default useInitCanvas;
