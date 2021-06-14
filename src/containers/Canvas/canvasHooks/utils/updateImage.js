import { fabric } from 'fabric';

const roundedCorners = (img, radius) => {
  let currentRadiusX = (img.width * img.scaleX * radius) / 200;
  let currentRadiusY = (img.height * img.scaleY * radius) / 200;
  let rect = new fabric.Rect({
    width: img.width,
    height: img.height,
    rx: currentRadiusX / img.scaleX,
    ry: currentRadiusY / img.scaleY,
    left: -img.width / 2,
    top: -img.height / 2,
    noScaleCache: false,
  });
  return rect;
};

export const updateImageStyle = (state, canvas, dispatch) => {
  let image = canvas.getActiveObject();
  if (image && image.type === 'image') {
    let radius = state.imageState.cornerRadius;
    image.set('clipPath', roundedCorners(image, radius));
    image.cornerRadius = radius;
    canvas.requestRenderAll();
  }
  dispatch({ type: 'setShouldUpdateImage', data: false });
};
