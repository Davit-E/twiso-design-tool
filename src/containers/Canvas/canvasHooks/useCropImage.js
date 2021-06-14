import { useEffect, useCallback } from 'react';
import { fabric } from 'fabric';

const useCropImage = (state, dispatch, canvas) => {
  const cropStartHandler = useCallback(() => {
    canvas.getObjects().forEach((el) => {
      el.selectable = false;
    });

    let activeEl = canvas.getActiveObject();
    let el = new fabric.Rect({
      fill: 'rgba(0,0,0,0)',
      originX: 'left',
      originY: 'top',
      left: activeEl.left,
      top: activeEl.top,
      // borderDashArray: [1, 1],
      borderColor: '#dbff17',
      angle: activeEl.angle,
      width: activeEl.width * activeEl.scaleX,
      height: activeEl.height * activeEl.scaleY,
      selectable: true,
      lockScalingFlip: true,
    });
    el.controls.mtr.visible = false;
    canvas.add(el);
    canvas.setActiveObject(el);
    let angle = ((360 - activeEl.angle) * Math.PI) / 180;
    console.log(angle);
    console.log('bounds', activeEl.lineCoords);
    el.on('moving', (e) => {
      console.log('obj', el.lineCoords);
      let objectHeight = el.height * el.scaleY;
      let objectWidth = el.width * el.scaleX;
      let boundHeight = activeEl.height * activeEl.scaleY;
      let boundWidth = activeEl.width * activeEl.scaleX;
      
      // let top = el.top;
      // let left = el.left;
      // let bottom = el.top + objectHeight;
      // let right = el.left + objectWidth;
      let left = Math.abs(el.left * Math.cos(angle) + el.top * Math.sin(angle));
      let top = Math.abs(el.top * Math.cos(angle) - el.left * Math.sin(angle));
      let right = Math.abs(
        (left + objectWidth) * Math.cos(angle) +
          (top + objectHeight) * Math.sin(angle)
      );
      let bottom = Math.abs(
        (top + objectHeight) * Math.cos(angle) -
          (left + objectWidth) * Math.sin(angle)
      );

      // let rightBound = leftBound + boundWidth;
      // let bottomBound = topBound + boundHeight;
      let topBound = Math.abs(
        activeEl.top * Math.cos(angle) + activeEl.left * Math.sin(angle)
      );
      let leftBound = Math.abs(
        activeEl.left * Math.cos(angle) - activeEl.top * Math.sin(angle)
      );
      let rightBound = Math.abs(
        (leftBound + boundWidth) * Math.cos(angle) +
          (topBound + boundHeight) * Math.sin(angle)
      );
      let bottomBound = Math.abs(
        (topBound + boundHeight) * Math.cos(angle) -
          (leftBound + boundWidth) * Math.sin(angle)
      );
      console.log('top: ', top);
      console.log('left: ', left);
      console.log('right: ', right);
      console.log('bottom: ', bottom);
      console.log('topBound: ', topBound);
      console.log('leftBound: ', leftBound);
      console.log('rightBound: ', rightBound);
      console.log('bottomBound: ', bottomBound);
      //left
      if (left < leftBound) el.left = leftBound;
      //top
      if (top < topBound) el.top = topBound;
      //right
      if (right > rightBound) el.left = rightBound - objectWidth;
      //bottom
      if (bottom > bottomBound) el.top = bottomBound - objectHeight;

      // let elCoords = el.lineCoords;
      // let boundCoords = activeEl.lineCoords;
    });

    el.on('scaling', (e) => {
      // let objectHeight = el.height * el.scaleY;
      // let objectWidth = el.width * el.scaleX;
      // let boundHeight = activeEl.height * activeEl.scaleY;
      // let boundWidth = activeEl.width * activeEl.scaleX;
      // let top = el.top;
      // let bottom = top + objectHeight;
      // let left = el.left;
      // let right = left + objectWidth;
      // let topBound = activeEl.top;
      // let bottomBound = topBound + boundHeight;
      // let leftBound = activeEl.left;
      // let rightBound = leftBound + boundWidth;
      // el.left = Math.min(Math.max(left, leftBound), rightBound - objectWidth);
      // el.top = Math.min(Math.max(top, topBound), bottomBound - objectHeight);
      // if (el.scaleX > 1) {
      //   el.scaleX = 1;
      //   if (left < leftBound || right > rightBound) el.left = leftBound;
      // }
      // if (el.scaleY > 1) {
      //   el.scaleY = 1;
      //   if (top < topBound || bottom > bottomBound) el.top = topBound;
      // }
      //   let angle = (activeEl.getAngle() * Math.PI) / 180;
      //   let aspectRatio = activeEl.width / activeEl.height;
      //   let boundWidth = activeEl.width * activeEl.scaleX;
      //   let boundHeight = activeEl.height * activeEl.scaleY;
      //   if (boundWidth > bounds.width) {
      //     boundWidth = bounds.width;
      //     var targetWidth =
      //       (aspectRatio * boundWidth) /
      //       (aspectRatio * Math.abs(Math.cos(angle)) + Math.abs(Math.sin(angle)));
      //     activeEl.setScaleX(targetWidth / activeEl.width);
      //     activeEl.setScaleY(targetWidth / activeEl.width);
      //     boundHeight = getBoundHeight(activeEl);
      //   }
      //   if (boundHeight > bounds.height) {
      //     boundHeight = bounds.height;
      //     var targetHeight =
      //       boundHeight /
      //       (aspectRatio * Math.abs(Math.sin(angle)) + Math.abs(Math.cos(angle)));
      //     activeEl.setScaleX(targetHeight / activeEl.height);
      //     activeEl.setScaleY(targetHeight / activeEl.height);
      //     boundWidth = getBoundWidth(activeEl);
      //   }
      //   //Check constraints
      //   if (activeEl.getLeft() < bounds.x + boundWidth / 2)
      //     activeEl.setLeft(bounds.x + boundWidth / 2);
      //   if (activeEl.getLeft() > bounds.x + bounds.width - boundWidth / 2)
      //     activeEl.setLeft(bounds.x + bounds.width - boundWidth / 2);
      //   if (activeEl.getTop() < bounds.y + boundHeight / 2)
      //     activeEl.setTop(bounds.y + boundHeight / 2);
      //   if (activeEl.getTop() > bounds.y + bounds.height - boundHeight / 2)
      //     activeEl.setTop(bounds.y + bounds.height - boundHeight / 2);
    });

    // dispatch({type: 'setIsCroppingImage', data: false});
  }, [canvas]);

  useEffect(() => {
    if (state.isCroppingImage) {
      cropStartHandler();
    }
  }, [cropStartHandler, state, dispatch, canvas]);
};

export default useCropImage;
