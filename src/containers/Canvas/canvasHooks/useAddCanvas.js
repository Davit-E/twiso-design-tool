import { useEffect } from 'react';
import { fabric } from 'fabric';

const addCanvas = (state, id, dispatch) => {
  let canvas = new fabric.Canvas(id, {
    width: state.width * state.zoom,
    height: state.height * state.zoom,
    zoom: state.zoom,
    backgroundColor: 'rgba(255,255,255,1)',
    preserveObjectStacking: true,
    bgImage: null,
    id,
  });
  dispatch({
    type: 'setCanvasState',
    data: {
      ...state,
      backgroundColor: 'rgba(255,255,255,1)',
      backgroundImage: { type: '', src: null },
    },
  });
  return canvas;
};

const useAddCanvas = (
  state,
  dispatch,
  setCanvas,
  setIsCanvasSet,
  setCanvasArr,
  currentCanvas,
  setFabricCanvasArr,
  сurrentCanvasId,
  shouldChangeCanvas,
  setShouldChangecanvas
) => {
  useEffect(() => {
    if (currentCanvas && shouldChangeCanvas) {
      setShouldChangecanvas(false);
      let canvas = addCanvas(state.canvasState, сurrentCanvasId, dispatch);
      setCanvas(canvas);
      setFabricCanvasArr((prevState) => [...prevState, canvas]);
      setIsCanvasSet(true);
    }
  }, [
    dispatch,
    shouldChangeCanvas,
    setShouldChangecanvas,
    сurrentCanvasId,
    setCanvas,
    setIsCanvasSet,
    state.canvasState,
    setCanvasArr,
    currentCanvas,
    setFabricCanvasArr,
  ]);
};

export default useAddCanvas;
