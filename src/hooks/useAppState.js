import { useReducer } from 'react';

const initialState = {
  canvasState: {
    initialWidth: 526,
    initialHeight: 741,
    width: 526,
    height: 741,
    zoom: 1,
    backgroundColor: 'rgba(255,255,255,1)',
    backgroundImage: { type: '', src: null },
  },
  shouldAddCanvas: true,
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
    isSvg: false,
  },
  isCropMode: false,
  shouldCropImage: false,
  isImageDropdown: false,
  isShapeDropdown: false,
  isResizeDropdown: false,
  isZoomDropdown: false,
  isDownloadDropdown: false,
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
    case 'setCanvasState':
      return { ...state, canvasState: action.data };
    case 'setIsDownloadDropdown':
      return { ...state, isDownloadDropdown: action.data };
    case 'setIsCropMode':
      return { ...state, isCropMode: action.data };
    case 'setShouldCropImage':
      return { ...state, shouldCropImage: action.data };
    case 'setIsImageDropdown':
      return { ...state, isImageDropdown: action.data };
    case 'setIsShapeDropdown':
      return { ...state, isShapeDropdown: action.data };
    case 'setIsResizeDropdown':
      return { ...state, isResizeDropdown: action.data };
    case 'setIsZoomDropdown':
      return { ...state, isZoomDropdown: action.data };
    case 'setCurrentCoords':
      return { ...state, currentCoords: action.data };
    case 'setShowToolbar':
      return { ...state, showToolbar: action.data };
    case 'setShowCanvasToolbar':
      return { ...state, showCanvasToolbar: action.data };
    case 'setShouldAddText':
      return { ...state, shouldAddText: action.data };
    case 'setShouldUpdateText':
      return { ...state, shouldUpdateText: action.data };
    case 'setShouldUpdateShape':
      return { ...state, shouldUpdateShape: action.data };
    case 'setShouldUpdateImage':
      return { ...state, shouldUpdateImage: action.data };
    case 'setShouldUpdateCanvas':
      return { ...state, shouldUpdateCanvas: action.data };
    case 'setShouldAddCanvas':
      return { ...state, shouldAddCanvas: action.data };
    case 'setShouldUpdateCanvasSize':
      return { ...state, shouldUpdateCanvasSize: action.data };
    case 'setShouldAddCanvasBgImage':
      return { ...state, shouldAddCanvasBgImage: action.data };
    case 'setCurrentObject':
      return { ...state, currentObject: action.data };
    case 'setShapeToAdd':
      return { ...state, shapeToAdd: action.data, isShapeDropdown: false };
    case 'setImageToAdd':
      return { ...state, imageToAdd: action.data, isImageDropdown: false };
    case 'setShapeState':
      return { ...state, shapeState: { ...action.data } };
    case 'setImageState':
      return { ...state, imageState: { ...action.data } };
    case 'setTextState':
      return { ...state, textState: { ...action.data } };
    case 'setShouldReplaceImage':
      return { ...state, shouldReplaceImage: action.data };
    case 'setCanvasBackgroundColor':
      return {
        ...state,
        shouldUpdateCanvas: true,
        canvasState: {
          ...state.canvasState,
          backgroundImage: { type: '', src: null },
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
          zoom: action.data.zoom,
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
