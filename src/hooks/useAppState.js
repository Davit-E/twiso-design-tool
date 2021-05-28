import { useReducer } from 'react';

const initialState = {
  canvasWidth: 526,
  canvasHeight: 741,
  isSelection: false,
  shapeToAdd: null,
  imageToAdd: null,
  shapeState: {
    fill: 0,
    stroke: 0,
    opacity: 100,
  },
  imageState: {
    cornerRadius: 0,
    opacity: 100,
  },
  shouldAddText: false,
  shouldUpdateText: false,
  currentObject: {
    type: '',
    object: null,
  },
  textState: {
    fontFamily: 'Inter',
    fontStyle: 'Normal',
    fontWeight: 'Normal',
    fontSize: 32,
    fill: '#000000',
    textAlign: 'left',
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'setCanvasSize':
      return { ...state, canvasWidth: action.value };
    case 'setCanvasHeight':
      return { ...state, canvasHeight: action.value };
    case 'setIsSelection':
      return { ...state, isSelection: action.data };
    case 'setShouldAddText':
      return { ...state, shouldAddText: action.data };
    case 'setShouldUpdateText':
      return { ...state, shouldUpdateText: action.data };
    case 'setShapeState':
      return { ...state, shapeState: { ...action.data } };
    case 'setImageState':
      return { ...state, imageState: { ...action.data } };
    case 'setCurrentObject':
      return { ...state, currentObject: action.data };
    case 'setShapeToAdd':
      return { ...state, shapeToAdd: action.data };
    case 'setImageToAdd':
      return { ...state, imageToAdd: action.data };
    case 'setTextState':
      return { ...state, textState: { ...action.data } };
    case 'setFontFamily':
      return {
        ...state,
        shouldUpdateText: true,
        textState: {
          ...state.textState,
          fontFamily: action.data,
        },
      };
    case 'setFontStyleAndWeight':
      return {
        ...state,
        shouldUpdateText: true,
        textState: {
          ...state.textState,
          fontStyle: action.data.style,
          fontWeight: action.data.weight,
        },
      };
    case 'setFontSize':
      return {
        ...state,
        shouldUpdateText: true,
        textState: {
          ...state.textState,
          fontSize: action.data,
        },
      };
    case 'setFill':
      return {
        ...state,
        shouldUpdateText: true,
        textState: {
          ...state.textState,
          fill: action.data,
        },
      };
    case 'setTextAlign':
      return {
        ...state,
        shouldUpdateText: true,
        textState: {
          ...state.textState,
          textAlign: action.data,
        },
      };

    default:
      return state;
  }
};

const useAppState = () => {
  const [appState, appDispatch] = useReducer(reducer, initialState);
  return [appState, appDispatch];
};

export default useAppState;
