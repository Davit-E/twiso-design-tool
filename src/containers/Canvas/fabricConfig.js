import { fabric } from 'fabric';
import ctrlScale from '../../assets/ctrlScale.svg';
import ctrlStretch from '../../assets/ctrlStretch.svg';
import ctrlRotate from '../../assets/ctrlRotate.svg';

const fabricConfig = () => {
  fabric.Object.prototype.transparentCorners = false;
  fabric.Object.prototype.cornerColor = 'white';
  fabric.Object.prototype.borderColor = '#6F7BD0';
  fabric.Object.prototype.cornerStrokeColor = '#6F7BD0';
  fabric.Object.prototype.cornerStyle = 'circle';

  const ctrlStretchImage = new Image();
  ctrlStretchImage.src = ctrlStretch;
  const ctrlScaleImage = new Image();
  ctrlScaleImage.src = ctrlScale;
  const ctrlRotateImage = new Image();
  ctrlRotateImage.src = ctrlRotate;
  const controlsUtils = fabric.controlsUtils,
    scaleSkewStyleHandler = controlsUtils.scaleSkewCursorStyleHandler,
    scaleStyleHandler = controlsUtils.scaleCursorStyleHandler,
    scalingEqually = controlsUtils.scalingEqually,
    scalingYOrSkewingX = controlsUtils.scalingYOrSkewingX,
    scalingXOrSkewingY = controlsUtils.scalingXOrSkewingY,
    scaleOrSkewActionName = controlsUtils.scaleOrSkewActionName,
    objectControls = fabric.Object.prototype.controls;

  const renderIcon = (icon) => {
    return function renderIcon(ctx, left, top, styleOverride, fabricObject) {
      let size = this.cornerSize;
      ctx.save();
      ctx.translate(left, top);
      ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
      ctx.drawImage(icon, -size / 2, -size / 2, size, size);
      ctx.restore();
    };
  };

  const renderStretchIcon = (icon) => {
    return function renderIcon(ctx, left, top, styleOverride, fabricObject) {
      let size = this.cornerSize;
      ctx.save();
      ctx.translate(left, top);
      ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
      ctx.drawImage(icon, -size / 3.2, -size / 2, size / 1.6, size);
      ctx.restore();
    };
  }

  objectControls.ml = new fabric.Control({
    x: -0.5,
    y: 0,
    cursorStyleHandler: scaleSkewStyleHandler,
    actionHandler: scalingXOrSkewingY,
    getActionName: scaleOrSkewActionName,
    cornerSize: 42,
    offsetY: 3,
    render: renderStretchIcon(ctrlStretchImage),
  });

  objectControls.mr = new fabric.Control({
    x: 0.5,
    y: 0,
    cursorStyleHandler: scaleSkewStyleHandler,
    actionHandler: scalingXOrSkewingY,
    getActionName: scaleOrSkewActionName,
    cornerSize: 42,
    offsetY: 3,
    offsetX: 1,
    render: renderStretchIcon(ctrlStretchImage),
  });

  objectControls.mb = new fabric.Control({
    x: 0,
    y: 0.5,
    cursorStyleHandler: scaleSkewStyleHandler,
    actionHandler: scalingYOrSkewingX,
    getActionName: scaleOrSkewActionName,
  });

  objectControls.mt = new fabric.Control({
    x: 0,
    y: -0.5,
    cursorStyleHandler: scaleSkewStyleHandler,
    actionHandler: scalingYOrSkewingX,
    getActionName: scaleOrSkewActionName,
  });

  objectControls.tl = new fabric.Control({
    x: -0.5,
    y: -0.5,
    cursorStyleHandler: scaleStyleHandler,
    actionHandler: scalingEqually,
    cornerSize: 32,
    offsetY: 3,
    offsetX: 1,
    render: renderIcon(ctrlScaleImage),
  });

  objectControls.tr = new fabric.Control({
    x: 0.5,
    y: -0.5,
    cursorStyleHandler: scaleStyleHandler,
    actionHandler: scalingEqually,
    cornerSize: 32,
    offsetY: 3,
    offsetX: 1,
    render: renderIcon(ctrlScaleImage),
  });

  objectControls.bl = new fabric.Control({
    x: -0.5,
    y: 0.5,
    cursorStyleHandler: scaleStyleHandler,
    actionHandler: scalingEqually,
    cornerSize: 32,
    offsetY: 3,
    offsetX: 1,
    render: renderIcon(ctrlScaleImage),
  });

  objectControls.br = new fabric.Control({
    x: 0.5,
    y: 0.5,
    cursorStyleHandler: scaleStyleHandler,
    actionHandler: scalingEqually,
    cornerSize: 32,
    offsetY: 3,
    offsetX: 1,
    render: renderIcon(ctrlScaleImage),
  });

  objectControls.mtr = new fabric.Control({
    x: 0,
    y: 0.5,
    cornerSize: 50,
    offsetY: 30,
    actionHandler: controlsUtils.rotationWithSnapping,
    cursorStyleHandler: controlsUtils.rotationStyleHandler,
    withConnection: false,
    actionName: 'rotate',
    render: renderIcon(ctrlRotateImage),
  });

  if (fabric.Textbox) {
    let textBoxControls = (fabric.Textbox.prototype.controls = {});

    textBoxControls.mtr = objectControls.mtr;
    textBoxControls.tr = objectControls.tr;
    textBoxControls.br = objectControls.br;
    textBoxControls.tl = objectControls.tl;
    textBoxControls.bl = objectControls.bl;
    textBoxControls.mt = objectControls.mt;
    textBoxControls.mb = objectControls.mb;

    textBoxControls.mr = new fabric.Control({
      x: 0.5,
      y: 0,
      actionHandler: controlsUtils.changeWidth,
      cursorStyleHandler: scaleSkewStyleHandler,
      actionName: 'resizing',
      cornerSize: 42,
      offsetY: 3,
      offsetX: 1,
      render: renderStretchIcon(ctrlStretchImage),
    });

    textBoxControls.ml = new fabric.Control({
      x: -0.5,
      y: 0,
      actionHandler: controlsUtils.changeWidth,
      cursorStyleHandler: scaleSkewStyleHandler,
      actionName: 'resizing',
      cornerSize: 42,
      offsetY: 3,
      render: renderStretchIcon(ctrlStretchImage),
    });
  }
};

export default fabricConfig;
