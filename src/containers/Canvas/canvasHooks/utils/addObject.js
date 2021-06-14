import { fabric } from 'fabric';

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

export const addNewImage = (state, canvas, dispatch, id, updateId) => {
  let image = state.imageToAdd;
  if (state.shouldReplaceImage) {
    let active = canvas.getActiveObject();
    fabric.Image.fromURL(image, (img) => {
      img.top = active.top;
      img.left = active.left;
      img.scaleToWidth(active.width * active.scaleX);
      img.angle = active.angle;
      img.setControlsVisibility(ShowControls);
      img.id = active.id;
      img.cornerRadius = active.cornerRadius;
      canvas.remove(active);
      canvas.add(img).setActiveObject(img);
      canvas.requestRenderAll();
      dispatch({ type: 'setShouldUpdateImage', data: true });
      dispatch({ type: 'setShouldReplaceImage', data: false });
    });
  } else {
    fabric.Image.fromURL(image, (img) => {
      img.scaleToWidth(256);
      img.left = 100;
      img.top = 100;
      img.setControlsVisibility(ShowControls);
      img.id = id;
      img.cornerRadius = 0;
      canvas.add(img).setActiveObject(img);
      canvas.requestRenderAll();
      updateId();
    });
  }
  dispatch({ type: 'setImageToAdd', data: null });
};

export const addNewText = (canvas, state, dispatch, id, updateId) => {
  dispatch({ type: 'setShouldAddText', data: false });
  let text = new fabric.Textbox('Add text‎', {
    left: 100,
    top: 100,
    height: 100,
    padding: 10,
    width: 130,
    splitByGrapheme: true,
    ...state.textState,
  });
  text.id = id;
  canvas.add(text).setActiveObject(text);
  canvas.requestRenderAll();
  updateId();
};

const addNewRect = () => {
  let rect = new fabric.Rect({
    left: 100,
    top: 200,
    width: 152,
    height: 152,
    noScaleCache: false,
    strokeUniform: true,
    fill: 'rgba(196,196,196,1)',
    stroke: 'rgba(255,255,255,1)',
    strokeWidth: 0,
  });
  rect.setControlsVisibility(ShowControls);
  return rect;
};

const addNewRoundedRect = () => {
  let rect = addNewRect();
  rect.rx = 30;
  rect.ry = 30;
  return rect;
};

const addNewCircle = () => {
  let circle = new fabric.Circle({
    left: 100,
    top: 200,
    radius: 76,
    noScaleCache: false,
    strokeUniform: true,
    fill: 'rgba(196,196,196,1)',
    stroke: 'rgba(255,255,255,1)',
    strokeWidth: 0,
  });
  circle.setControlsVisibility(ShowControls);
  return circle;
};

const addNewTriangle = () => {
  let triangle = new fabric.Triangle({
    left: 100,
    top: 200,
    width: 152,
    height: 150,
    noScaleCache: false,
    strokeUniform: true,
    fill: 'rgba(196,196,196,1)',
    stroke: 'rgba(255,255,255,1)',
    strokeWidth: 0,
  });
  triangle.setControlsVisibility(ShowControls);
  return triangle;
};

const addNewLine = () => {
  let line = new fabric.Line([0, 0, 300, 0], {
    left: 100,
    top: 200,
    stroke: 'rgba(196,196,196,1)',
    strokeWidth: 2,
    padding: 10,
    borderColor: 'transparent',
    noScaleCache: false,
  });
  return line;
};

export const addNewShape = (state, canvas, dispatch, id, updateId) => {
  dispatch({ type: 'setShapeToAdd', data: null });
  let obj = null;
  if (state.shapeToAdd === 'square') obj = addNewRect();
  else if (state.shapeToAdd === 'roundedSquare') obj = addNewRoundedRect();
  else if (state.shapeToAdd === 'circle') obj = addNewCircle();
  else if (state.shapeToAdd === 'triangle') obj = addNewTriangle();
  else if (state.shapeToAdd === 'line') obj = addNewLine();
  if (obj) {
    obj.id = id;
    canvas.add(obj).setActiveObject(obj);
    canvas.requestRenderAll();
    updateId();
  }
};
