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
  fabric.Object.prototype.objectCaching = false;
  
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

  const renderScaleIcon = (icon) => {
    return function renderIcon(ctx, left, top, styleOverride, fabricObject) {
      let size = this.cornerSize;
      ctx.save();
      ctx.translate(left, top);
      ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
      ctx.drawImage(icon, -size / 2, -size / 2, size, size);
      ctx.restore();
    };
  };

  const renderStretchIconX = (icon) => {
    return function renderIcon(ctx, left, top, styleOverride, fabricObject) {
      let size = this.cornerSize;
      ctx.save();
      ctx.translate(left, top);
      ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
      ctx.drawImage(icon, -size / 3.2, -size / 2, size / 1.6, size);
      ctx.restore();
    };
  };

  const renderStretchIconY = (icon) => {
    return function renderIcon(ctx, left, top, styleOverride, fabricObject) {
      let size = this.cornerSize;
      ctx.save();
      ctx.translate(left, top);
      ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle + 90));
      ctx.drawImage(icon, -size / 3.2, -size / 2, size / 1.6, size);
      ctx.restore();
    };
  };

  objectControls.ml = new fabric.Control({
    x: -0.5,
    y: 0,
    cursorStyleHandler: scaleSkewStyleHandler,
    actionHandler: scalingXOrSkewingY,
    getActionName: scaleOrSkewActionName,
    cornerSize: 42,
    offsetY: 3,
    render: renderStretchIconX(ctrlStretchImage),
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
    render: renderStretchIconX(ctrlStretchImage),
  });

  objectControls.mt = new fabric.Control({
    x: 0,
    y: -0.5,
    cursorStyleHandler: scaleSkewStyleHandler,
    actionHandler: scalingYOrSkewingX,
    getActionName: scaleOrSkewActionName,
    cornerSize: 42,
    offsetX: -3,
    offsetY: -1,
    render: renderStretchIconY(ctrlStretchImage),
  });

  objectControls.mb = new fabric.Control({
    x: 0,
    y: 0.5,
    cursorStyleHandler: scaleSkewStyleHandler,
    actionHandler: scalingYOrSkewingX,
    getActionName: scaleOrSkewActionName,
    cornerSize: 42,
    offsetX: -3,
    offsetY: 1,
    render: renderStretchIconY(ctrlStretchImage),
  });


  objectControls.tl = new fabric.Control({
    x: -0.5,
    y: -0.5,
    cursorStyleHandler: scaleStyleHandler,
    actionHandler: scalingEqually,
    cornerSize: 32,
    offsetY: 3,
    offsetX: 1,
    render: renderScaleIcon(ctrlScaleImage),
  });

  objectControls.tr = new fabric.Control({
    x: 0.5,
    y: -0.5,
    cursorStyleHandler: scaleStyleHandler,
    actionHandler: scalingEqually,
    cornerSize: 32,
    offsetY: 3,
    offsetX: 1,
    render: renderScaleIcon(ctrlScaleImage),
  });

  objectControls.bl = new fabric.Control({
    x: -0.5,
    y: 0.5,
    cursorStyleHandler: scaleStyleHandler,
    actionHandler: scalingEqually,
    cornerSize: 32,
    offsetY: 3,
    offsetX: 1,
    render: renderScaleIcon(ctrlScaleImage),
  });

  objectControls.br = new fabric.Control({
    x: 0.5,
    y: 0.5,
    cursorStyleHandler: scaleStyleHandler,
    actionHandler: scalingEqually,
    cornerSize: 32,
    offsetY: 3,
    offsetX: 1,
    render: renderScaleIcon(ctrlScaleImage),
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
    render: renderScaleIcon(ctrlRotateImage),
  });

  if (fabric.Textbox) {
    let textBoxControls = (fabric.Textbox.prototype.controls = {});
    textBoxControls.mtr = objectControls.mtr;
    textBoxControls.mr = new fabric.Control({
      x: 0.5,
      y: 0,
      actionHandler: controlsUtils.changeWidth,
      cursorStyleHandler: scaleSkewStyleHandler,
      actionName: 'resizing',
      cornerSize: 42,
      offsetY: 3,
      offsetX: 1,
      render: renderStretchIconX(ctrlStretchImage),
    });

    textBoxControls.ml = new fabric.Control({
      x: -0.5,
      y: 0,
      actionHandler: controlsUtils.changeWidth,
      cursorStyleHandler: scaleSkewStyleHandler,
      actionName: 'resizing',
      cornerSize: 42,
      offsetY: 3,
      render: renderStretchIconX(ctrlStretchImage),
    });
  }

  let line = (fabric.Line.prototype.controls = {});
  line.mtr = objectControls.mtr;
  line.ml = new fabric.Control({
    x: -0.5,
    y: 0,
    cursorStyleHandler: scaleSkewStyleHandler,
    actionHandler: scalingXOrSkewingY,
    getActionName: scaleOrSkewActionName,
    cornerSize: 30,
    offsetY: 3,
    offsetX: 11,
    render: renderScaleIcon(ctrlScaleImage),
  });

  line.mr = new fabric.Control({
    x: 0.5,
    y: 0,
    cursorStyleHandler: scaleSkewStyleHandler,
    actionHandler: scalingXOrSkewingY,
    getActionName: scaleOrSkewActionName,
    cornerSize: 30,
    offsetY: 3,
    offsetX: -10,
    render: renderScaleIcon(ctrlScaleImage),
  });

  let image = (fabric.Image.prototype.controls = {});
  image.mtr = objectControls.mtr;
  image.tr = objectControls.tr;
  image.br = objectControls.br;
  image.tl = objectControls.tl;
  image.bl = objectControls.bl;

  let activeSelection = (fabric.ActiveSelection.prototype.controls = {});
  activeSelection.mtr = objectControls.mtr;
  activeSelection.tr = objectControls.tr;
  activeSelection.br = objectControls.br;
  activeSelection.tl = objectControls.tl;
  activeSelection.bl = objectControls.bl;
  let group = (fabric.Group.prototype.controls = {});
  group.mtr = objectControls.mtr;
  group.tr = objectControls.tr;
  group.br = objectControls.br;
  group.tl = objectControls.tl;
  group.bl = objectControls.bl;
};

export default fabricConfig;
