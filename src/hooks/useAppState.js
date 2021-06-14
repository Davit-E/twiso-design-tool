import { useReducer } from 'react';

const initialState = {
  canvasState: {
    width: 526,
    height: 741,
    backgroundColor: 'rgba(255,255,255,1)',
    backgroundImage: 0,
  },
  shouldUpdateCanvas: false,
  shouldUpdateCanvasSize: false,
  shouldAddCanvasBgImage: false,
  shapeToAdd: null,
  imageToAdd: null,
  currentCoords: null,
  showCanvasToolbar: false,
  showToolbar: false,
  shapeState: {
    fill: 'rgba(196,196,196,1)',
    stroke: 'rgba(255,255,255,1)',
    strokeWidth: 0,
  },
  imageState: {
    cornerRadius: 0,
  },
  isCroppingImage: false,
  isImageDropdown: false,
  isShapeDropdown: false,
  shouldAddText: false,
  shouldUpdateText: false,
  shouldUpdateShape: false,
  shouldUpdateImage: false,
  shouldReplaceImage: false,
  currentObject: {
    type: '',
    object: null,
  },
  textState: {
    fontFamily: 'Inter',
    fontStyle: 'Normal',
    fontWeight: 'Normal',
    fontSize: 30,
    fill: 'rgba(0,0,0,1)',
    textAlign: 'left',
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'setIsCroppingImage':
      console.log('%c Setting Is Cropping Image', 'color: #ee4242');
      return { ...state, isCroppingImage: action.data };
    case 'setIsImageDropdown':
      console.log('%c Setting Is Image Dropdown', 'color: #ee4242');
      return { ...state, isImageDropdown: action.data };
    case 'setIsShapeDropdown':
      console.log('%c Setting Is Shape Dropdown', 'color: #ee4242');
      return { ...state, isShapeDropdown: action.data };
    case 'setCurrentCoords':
      console.log('%c Setting Coordinates', 'color: #ee4242');
      return { ...state, currentCoords: action.data };
    case 'setShowToolbar':
      console.log('%c Setting Toolbar Show', 'color: #ee4242');
      return { ...state, showToolbar: action.data };
    case 'setShowCanvasToolbar':
      console.log('%c Setting Canvas Toolbar Show', 'color: #ee4242');
      return { ...state, showCanvasToolbar: action.data };
    case 'setShouldAddText':
      console.log('%c Setting Should Add Text', 'color: #ee4242');
      return { ...state, shouldAddText: action.data };
    case 'setShouldUpdateText':
      console.log('%c Setting Should Update Text', 'color: #ee4242');
      return { ...state, shouldUpdateText: action.data };
    case 'setShouldUpdateShape':
      console.log('%c Setting Should Update Shape', 'color: #ee4242');
      return { ...state, shouldUpdateShape: action.data };
    case 'setShouldUpdateImage':
      console.log('%c Setting Should Update Image', 'color: #ee4242');
      return { ...state, shouldUpdateImage: action.data };
    case 'setShouldUpdateCanvas':
      console.log('%c Setting Should Update Canvas', 'color: #ee4242');
      return { ...state, shouldUpdateCanvas: action.data };
    case 'setShouldUpdateCanvasSize':
      console.log('%c Setting Should Update Canvas Size', 'color: #ee4242');
      return { ...state, shouldUpdateCanvasSize: action.data };
    case 'setShouldAddCanvasBgImage':
      console.log('%c Setting Should Set Canvas Background Image', 'color: #ee4242');
      return { ...state, shouldAddCanvasBgImage: action.data };
    case 'setCurrentObject':
      console.log('%c Setting Current Object', 'color: #ee4242');
      return { ...state, currentObject: action.data };
    case 'setShapeToAdd':
      console.log('%c Setting Shape To Add', 'color: #ee4242');
      return { ...state, shapeToAdd: action.data, isShapeDropdown: false };
    case 'setImageToAdd':
      console.log('%c Setting Image To Add', 'color: #ee4242');
      return { ...state, imageToAdd: action.data, isImageDropdown: false };
    case 'setShapeState':
      console.log('%c Setting Shape State', 'color: #ee4242');
      return { ...state, shapeState: { ...action.data } };
    case 'setImageState':
      console.log('%c Setting Image State', 'color: #ee4242');
      return { ...state, imageState: { ...action.data } };
    case 'setTextState':
      console.log('%c Setting Text State', 'color: #ee4242');
      return { ...state, textState: { ...action.data } };
    case 'setShouldReplaceImage':
      console.log('%c Setting Should Replace Image', 'color: #ee4242');
      return { ...state, shouldReplaceImage: action.data };
    case 'setCanvasBackgroundColor':
      return {
        ...state,
        shouldUpdateCanvas: true,
        canvasState: {
          ...state.canvasState,
          backgroundImage: 0,
          backgroundColor: action.data,
        },
      };
    case 'setCanvasBackgroundImage':
      return {
        ...state,
        shouldUpdateCanvas: true,
        canvasState: {
          ...state.canvasState,
          backgroundColor: 'rgba(255,255,255,1)',
          backgroundImage: action.data,
        },
      };
    case 'setCanvasSize':
      return {
        ...state,
        shouldUpdateCanvasSize: true,
        canvasState: {
          ...state.canvasState,
          width: action.data.width,
          height: action.data.height,
        },
      };
    case 'setImageCornerRadius':
      return {
        ...state,
        shouldUpdateImage: true,
        imageState: {
          ...state.imageState,
          cornerRadius: action.data,
        },
      };
    case 'setShapeFill':
      return {
        ...state,
        shouldUpdateShape: true,
        shapeState: {
          ...state.shapeState,
          fill: action.data,
        },
      };
    case 'setShapeStroke':
      return {
        ...state,
        shouldUpdateShape: true,
        shapeState: {
          ...state.shapeState,
          stroke: action.data,
        },
      };
    case 'setShapeStrokeWidth':
      return {
        ...state,
        shouldUpdateShape: true,
        shapeState: {
          ...state.shapeState,
          strokeWidth: action.data,
        },
      };
    case 'setFontFamily':
      return {
        ...state,
        shouldUpdateText: true,
        textState: {
          ...state.textState,
          fontFamily: action.data,
        },
      };
    case 'setFontStyle':
      return {
        ...state,
        shouldUpdateText: true,
        textState: {
          ...state.textState,
          fontStyle: action.data,
        },
      };
    case 'setFontWeight':
      return {
        ...state,
        shouldUpdateText: true,
        textState: {
          ...state.textState,
          fontWeight: action.data,
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
    case 'setTextFill':
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
