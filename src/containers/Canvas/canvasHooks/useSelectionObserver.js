import { useEffect } from 'react';
import { handleSelected } from './utils/handleSelected';

const useSelectionObserver = (isCanvasSet, canvas, dispatch) => {
  useEffect(() => {
    if (isCanvasSet) {
      canvas.on('selection:created', (options) => {
        handleSelected(options, dispatch);
        let canvasJSON = JSON.stringify(canvas);
        sessionStorage.setItem('designCanvas', canvasJSON);
      });
      canvas.on('selection:updated', (options) => {
        handleSelected(options, dispatch);
      });
      canvas.on('selection:cleared', () => {
        dispatch({
          type: 'setCurrentObject',
          data: { type: '', object: null },
        });
        dispatch({ type: 'setIsSelection', data: false });
        let canvasJSON = JSON.stringify(canvas);
        sessionStorage.setItem('designCanvas', canvasJSON);
      });
      canvas.on('object:modified', () => {
        let canvasJSON = JSON.stringify(canvas);
        sessionStorage.setItem('designCanvas', canvasJSON);
      });
    }
  }, [dispatch, isCanvasSet, canvas]);
};

export default useSelectionObserver;
