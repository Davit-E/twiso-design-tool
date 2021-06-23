import { useEffect, useCallback, useState } from 'react';
import { fabric } from 'fabric';

const cropStartHandler = (active, box) => {
  box.on('moving', (e) => {
    let objectHeight = box.height * box.scaleY;
    let objectWidth = box.width * box.scaleX;
    let boundHeight = active.height * active.scaleY;
    let boundWidth = active.width * active.scaleX;
    let top = box.top;
    let left = box.left;
    let bottom = box.top + objectHeight;
    let right = box.left + objectWidth;
    let topBound = active.top;
    let bottomBound = topBound + boundHeight;
    let leftBound = active.left;
    let rightBound = leftBound + boundWidth;
    //left
    if (left < leftBound) box.left = leftBound;
    //top
    if (top < topBound) box.top = topBound;
    //right
    if (right > rightBound) box.left = rightBound - objectWidth;
    //bottom
    if (bottom > bottomBound) box.top = bottomBound - objectHeight;
  });

  box.on('scaling', (e) => {
    let objectHeight = box.height * box.scaleY;
    let objectWidth = box.width * box.scaleX;
    let boundHeight = active.height * active.scaleY;
    let boundWidth = active.width * active.scaleX;
    let top = box.top;
    let bottom = top + objectHeight;
    let left = box.left;
    let right = left + objectWidth;
    let topBound = active.top;
    let bottomBound = topBound + boundHeight;
    let leftBound = active.left;
    let rightBound = leftBound + boundWidth;
    box.left = Math.min(Math.max(left, leftBound), rightBound - objectWidth);
    box.top = Math.min(Math.max(top, topBound), bottomBound - objectHeight);
    if (box.scaleX > active.scaleX) {
      box.scaleX = active.scaleX;
      if (left < leftBound || right > rightBound) box.left = leftBound;
    }
    if (box.scaleY > active.scaleY) {
      box.scaleY = active.scaleY;
      if (top < topBound || bottom > bottomBound) box.top = topBound;
    }
  });
};

const getCropBox = (topBound, leftBound, activeEl) => {
  let box = new fabric.Rect({
    fill: 'rgba(0,0,0,0)',
    originX: 'left',
    originY: 'top',
    left: leftBound,
    top: topBound,
    borderDashArray: [2, 2],
    borderColor: '#dbff17',
    width: activeEl.width,
    height: activeEl.height,
    scaleX: activeEl.scaleX,
    scaleY: activeEl.scaleY,
    selectable: true,
    lockScalingFlip: true,
    type: 'cropbox',
  });
  box.controls.mtr.visible = false;
  return box;
};

const prepareForCrop = (active, dispatch, canvas, setAcitveEl, setCropbox) => {
  canvas.getObjects().forEach((el) => (el.selectable = false));
  let transformMatrix = active.calcTransformMatrix();
  let cx = transformMatrix[4];
  let cy = transformMatrix[5];
  let angle = ((360 - active.angle) * Math.PI) / 180;

  let leftBound =
    cx -
    Math.abs(
      (active.left - cx) * Math.cos(angle) - (active.top - cy) * Math.sin(angle)
    );
  let topBound =
    cy -
    Math.abs(
      (active.left - cx) * Math.sin(angle) + (active.top - cy) * Math.cos(angle)
    );

  active.angle = 0;
  active.top = topBound;
  active.left = leftBound;
  let box = getCropBox(topBound, leftBound, active);
  canvas.add(box);
  canvas.setActiveObject(box);
  dispatch({ type: 'setCurrentCoords', data: box.lineCoords });
  setAcitveEl(active);
  setCropbox(box);
};

const useCropImage = (state, dispatch, canvas) => {
  const [isCropping, setIsCropping] = useState(false);
  const [activeInfo, setActiveInfo] = useState(null);
  const [activeEl, setAcitveEl] = useState(null);
  const [cropbox, setCropbox] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  const cropFinishHandler = useCallback((c, dispatch) => {
    setActiveInfo(null);
    setIsCropping(false);
    setAcitveEl(null);
    setCropbox(null);
    setCroppedImage(null);
    c.off('mouse:down');
    c.requestRenderAll();
    dispatch({ type: 'setShouldCropImage', data: false });
    dispatch({ type: 'setShowToolbar', data: true });
  }, []);

  const cropImage = useCallback(
    (active, box) => {
      let ratioX = box.scaleX / active.scaleX;
      let ratioY = box.scaleY / active.scaleY;
      let newTop = (box.top - active.top) / active.scaleY;
      let newLeft = (box.left - active.left) / active.scaleX;

      let rect = new fabric.Rect({
        fill: 'rgba(0,0,0,0)',
        top: newTop,
        left: newLeft,
        width: box.width,
        height: box.height,
        scaleX: ratioX,
        scaleY: ratioY,
        absolutePositioned: true,
      });

      let newCanvas = new fabric.Canvas();
      newCanvas.setDimensions({
        width: active.width,
        height: active.height,
      });
      fabric.Image.fromURL(active._element.currentSrc, (image) => {
        newCanvas.add(image);
        newCanvas.add(rect);
        newCanvas.requestRenderAll();
        let src = newCanvas.toDataURL({
          left: rect.left,
          top: rect.top,
          width: rect.width * rect.scaleX,
          height: rect.height * rect.scaleY,
        });
        fabric.Image.fromURL(src, (img) => {
          img.scaleToWidth(box.width * box.scaleX);
          img.id = active.id;
          canvas.remove(active);
          setCroppedImage(img);
        });
      });
    },
    [canvas]
  );

  useEffect(() => {
    if (state.shouldCropImage && activeEl && cropbox) {
      cropImage(activeEl, cropbox);
    }
  }, [state.shouldCropImage, cropImage, activeEl, cropbox]);

  // If Cropped Image
  useEffect(() => {
    if (croppedImage && state.shouldCropImage) {
      croppedImage.controls.mtr.visible = true;
      let id = 1;
      canvas.getObjects().forEach((el) => {
        if (el.type === 'cropbox') canvas.remove(el);
        else if (el.id !== 'background') el.selectable = true;
        if (el.id > id) id = el.id;
      });
      croppedImage.id = id + 1;
      for (let [key, value] of Object.entries(activeInfo)) {
        croppedImage[key] = value;
      }
      dispatch({
        type: 'setCurrentObject',
        data: { type: 'image', data: croppedImage },
      });
      dispatch({
        type: 'setImageCornerRadius',
        data: activeInfo.cornerRadius,
      });
      canvas.add(croppedImage).setActiveObject(croppedImage);
      dispatch({
        type: 'setCurrentCoords',
        data: croppedImage.lineCoords,
      });
      dispatch({ type: 'setIsCropMode', data: false });
      cropFinishHandler(canvas, dispatch);
    }
  }, [
    cropbox,
    activeInfo,
    croppedImage,
    state,
    dispatch,
    canvas,
    cropFinishHandler,
  ]);

  /// Preparation For Crop
  useEffect(() => {
    if (state.isCropMode) {
      let active = canvas.getActiveObject();
      setActiveInfo({
        cornerRadius: active.cornerRadius,
        top: active.top,
        left: active.left,
        angle: active.angle,
      });
      prepareForCrop(active, dispatch, canvas, setAcitveEl, setCropbox);
    }
  }, [state.isCropMode, canvas, dispatch]);

  /// If Cropbox and Active El start Crop
  useEffect(() => {
    if (cropbox && activeEl) {
      cropStartHandler(activeEl, cropbox);
      setIsCropping(true);
    }
  }, [cropbox, activeEl]);

  // Listen to Canvas Click
  useEffect(() => {
    if (cropbox && state.isCropMode) {
      canvas.on('mouse:down', (e) => {
        if (e.target && e.target.id === state.currentObject.object.id) {
          canvas.setActiveObject(cropbox);
        } else if (!e.target || e.target.type !== 'cropbox') {
          dispatch({ type: 'setIsCropMode', data: false });
        }
      });
    }
  }, [cropbox, state, dispatch, canvas]);

  // Dispose of Crop
  useEffect(() => {
    if (isCropping && !state.isCropMode && !state.shouldCropImage) {
      canvas.getObjects().forEach((el) => {
        if (el.type === 'cropbox') canvas.remove(el);
        else if (el.id === state.currentObject.object.id) {
          canvas.setActiveObject(el);
          el.left = activeInfo.left;
          el.top = activeInfo.top;
          el.angle = activeInfo.angle;
        }
        el.controls.mtr.visible = true;
        el.selectable = true;
      });
      cropFinishHandler(canvas, dispatch);
    }
  }, [activeInfo, isCropping, state, cropFinishHandler, canvas, dispatch]);
};

export default useCropImage;
