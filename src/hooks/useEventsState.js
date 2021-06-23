import { useReducer } from 'react';

const initialState = {
  isMoving: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'setIsMoving':
      console.log('%c Setting Is Moving', 'color: #5705b1');
      return { ...state, isMoving: action.data };

    default:
      return state;
  }
};

const useEventState = () => {
  const [eventState, eventDispatch] = useReducer(reducer, initialState);
  return [eventState, eventDispatch];
};

export default useEventState;
