import { useEffect, useState } from 'react';
import { addNewImage, addNewShape, addNewText } from './utils/addObject';

const useAddObject = (state, dispatch, canvas) => {
  const [id, setId] = useState(1);
  const updatetId = () => setId((i) => i + 1);

  useEffect(() => {
    if (state.shapeToAdd) {
      addNewShape(state, canvas, dispatch, id, updatetId);
    } else if (state.imageToAdd) {
      addNewImage(state, canvas, dispatch, id, updatetId);
    } else if (state.shouldAddText) {
      addNewText(canvas, state, dispatch, id, updatetId);
    }
  }, [canvas, dispatch, state, id]);
};

export default useAddObject;
