import { useEffect } from 'react';
import { updateTextStyle } from './utils/updateText';

const useUpdateObject = (state, dispatch, canvas) => {
  useEffect(() => {
    if (state.shouldUpdateText && state.currentObject.type === 'text') {
      updateTextStyle(state, canvas, dispatch);
    }
  }, [state, dispatch, canvas]);
};

export default useUpdateObject;
