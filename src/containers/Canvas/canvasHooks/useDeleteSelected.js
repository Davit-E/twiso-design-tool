import { useEffect } from 'react';

const keyDownHandler = (e, canvas) => {
  if (canvas) {
    const keyCode = e.keyCode;
    if (canvas && keyCode === 46) {
      canvas.getActiveObjects().forEach((obj) => {
        canvas.remove(obj);
      });
      canvas.discardActiveObject().requestRenderAll();
    }
  }
};

const useDeleteSelected = (canvas) => {
  useEffect(() => {
    document.addEventListener('keydown', (e) => keyDownHandler(e, canvas));
    return () =>
      document.removeEventListener('keydown', (e) => keyDownHandler(e, canvas));
  }, [canvas]);
};

export default useDeleteSelected;
