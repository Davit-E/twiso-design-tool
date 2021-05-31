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

export const addNewImage = (item, canvas, dispatch) => {
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

export const addNewSvg = (item, canvas, dispatch) => {
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
  let text = new fabric.Textbox('Add text', {
    left: 100,
    top: 100,
    width: 130,
    height: 100,
    padding: 10,
    ...state.textState,
  });
  text.setControlsVisibility({
    ...ShowControls,
    tl: false,
    tr: false,
    bl: false,
    br: false,
  });
  canvas.add(text).setActiveObject(text);
  canvas.requestRenderAll();
};
