import { useEffect } from 'react';
import { loadAndUse } from './utils/updateText';
import { fabric } from 'fabric';
const useLoadStorage = (isCanvasSet, canvas) => {
  useEffect(() => {
    // let storageCanvas = sessionStorage.getItem('designCanvas');
    let storageCanvas = null;
    if (isCanvasSet && storageCanvas) {
      canvas.loadFromJSON(storageCanvas);
      let objects = canvas.getObjects();
      let textObjects = objects.filter((obj) => {
        return obj.type === 'textbox';
      });
      for (let i = 0; i < textObjects.length; i++) {
        let text = textObjects[i];
        loadAndUse(canvas, text, text.fontFamily);
      }
      var group = new fabric.ActiveSelection(objects, { canvas: canvas });
      canvas.setActiveObject(group);
      canvas.discardActiveObject();
    }
  }, [isCanvasSet, canvas]);
};

export default useLoadStorage;
