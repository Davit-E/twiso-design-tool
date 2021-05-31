import { useEffect } from 'react';
import { addNewImage, addNewSvg, addNewText } from './utils/addObject';

const useAddObject = (state, dispatch, canvas) => {
  useEffect(() => {
    if (state.shapeToAdd) addNewSvg(state.shapeToAdd, canvas, dispatch);
    else if (state.imageToAdd) addNewImage(state.imageToAdd, canvas, dispatch);
    else if (state.shouldAddText) addNewText(canvas, state, dispatch);
  }, [canvas, dispatch, state]);
};

export default useAddObject;
