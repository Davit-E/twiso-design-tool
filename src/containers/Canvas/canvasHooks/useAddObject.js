import { useEffect } from 'react';
import { addNewImage, addNewShape, addNewText } from './utils/addObject';

const useAddObject = (state, dispatch, canvas, id, updateId) => {
  useEffect(() => {
    if (state.shapeToAdd) {
      addNewShape(state, canvas, dispatch, id, updateId);
    } else if (state.imageToAdd) {
      addNewImage(state, canvas, dispatch, id, updateId);
    } else if (state.shouldAddText) {
      addNewText(canvas, state, dispatch, id, updateId);
    }
  }, [canvas, dispatch, state, id, updateId]);
};

export default useAddObject;
