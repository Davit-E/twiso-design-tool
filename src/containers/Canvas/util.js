import { fabric } from 'fabric';
import WebFont from 'webfontloader';

const ShowControls = {
  tl: true,
  tr: true,
  bl: true,
  br: true,
  ml: true,
  mt: false,
  mr: true,
  mb: false,
  mtr: true,
};

export const handleImage = (item, canvas, dispatch) => {
  fabric.Image.fromURL(item.src, (img) => {
    dispatch({ type: 'setImageToAdd', data: null });
    img.scaleToWidth(256);
    img.left = 100;
    img.top = 100;
    img.setControlsVisibility(ShowControls);
    canvas.add(img).setActiveObject(img);
    canvas.requestRenderAll();
  });
};

export const handleSvg = (item, canvas, dispatch) => {
  fabric.loadSVGFromURL(item.src, (objects, options) => {
    dispatch({ type: 'setShapeToAdd', data: null });
    var obj = fabric.util.groupSVGElements(objects, options);
    obj.scaleToWidth(item.width * 4);
    obj.top = 100;
    obj.left = 200;
    obj.setControlsVisibility(ShowControls);
    canvas.add(obj).setActiveObject(obj);
    canvas.requestRenderAll();
  });
};

export const addNewText = (canvas, state, dispatch) => {
  dispatch({ type: 'setShouldAddText', data: false });
  const text = new fabric.Textbox('Add text', {
    left: 100,
    top: 100,
    width: 130,
    height: 100,
    padding: 10,
    ...state.textState,
  });
  text.setControlsVisibility(ShowControls);
  canvas.add(text).setActiveObject(text);
  canvas.requestRenderAll();
};

export const loadAndUse = (canvas, text, font) => {
  WebFont.load({
    google: {
      families: [font],
    },
    timeout: 5000,
    fontactive: (familyName, fvd) => {
      text.set({ fontFamily: familyName });
      canvas.requestRenderAll();
    },
  });
};

export const updateTextStyle = (state, canvas, dispatch) => {
  if (state.currentObject.type === 'text' && state.textState) {
    state.currentObject.object._clearCache();
    for (const [key, value] of Object.entries(state.textState)) {
      if (key !== 'fontFamily') {
        state.currentObject.object.set(key, value);
      }
    }
    loadAndUse(canvas, state.currentObject.object, state.textState.fontFamily);
  }
  dispatch({ type: 'setShouldUpdateText', data: false });
};

export const handleSelected = (options, dispatch) => {
  let currentObj = { type: '', object: null };
  dispatch({ type: 'setIsSelection', data: true });
  if (options.target.type === 'activeSelection') {
    dispatch({ type: 'setCurrentObject', data: currentObj });
    return;
  }

  if (options.target.type === 'textbox') {
    const propertyArr = [
      'fontFamily',
      'fontStyle',
      'fontWeight',
      'opacity',
      'fontSize',
      'lineHeight',
      'charSpacing',
      'fill',
      'textAlign',
    ];
    let newTextState = {};
    propertyArr.forEach((property) => {
      newTextState[property] = options.target[property];
    });
    dispatch({ type: 'setTextState', data: newTextState });
    currentObj.type = 'text';
  } else if (options.target.type === 'image') {
    currentObj.type = 'image';
  } else {
    currentObj.type = 'shape';
  }
  currentObj.object = options.target;
  dispatch({ type: 'setCurrentObject', data: currentObj });
};
