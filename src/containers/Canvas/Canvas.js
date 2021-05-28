import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useContext,
} from 'react';
import styles from './Canvas.module.css';
import { fabric } from 'fabric';
import AppContext from '../../contexts/AppContext';
import { aligningGuidelines, centeringGuidelines } from './guidelines';
import {
  handleImage,
  handleSvg,
  addNewText,
  updateTextStyle,
  loadAndUse,
  handleSelected,
} from './util';
import fabricConfig from './fabricConfig';
fabricConfig();

const Canvas = () => {
  const { appState, appDispatch } = useContext(AppContext);
  const [canvas, setCanvas] = useState(null);
  const [isCanvasSet, setIsCanvasSet] = useState(false);
  const canvasContainer = useRef(null);

  const initCanvas = useCallback((width, height) => {
    let fabricCanvas = new fabric.Canvas('canvas', {
      width: width,
      height: height,
      backgroundColor: '#FFFFFF',
    });
    centeringGuidelines(fabricCanvas);
    aligningGuidelines(fabricCanvas);
    return fabricCanvas;
  }, []);

  // Add Object Handling
  useEffect(() => {
    if (appState.shapeToAdd) {
      handleSvg(appState.shapeToAdd, canvas, appDispatch);
    } else if (appState.imageToAdd) {
      handleImage(appState.imageToAdd, canvas, appDispatch);
    } else if (appState.shouldAddText) {
      addNewText(canvas, appState, appDispatch);
    }
  }, [canvas, appDispatch, appState]);

  useEffect(() => {
    if (appState.currentObject.type === 'text' && appState.shouldUpdateText) {
      updateTextStyle(appState, canvas, appDispatch);
    }
  }, [appState, appDispatch, canvas]);

  // If Canvas in Storage render It
  useEffect(() => {
    // let storageCanvas = sessionStorage.getItem('designCanvas');
    let storageCanvas = null;
    if (isCanvasSet && storageCanvas) {
      canvas.loadFromJSON(storageCanvas);
      let objects = canvas.getObjects();
      let textObjects = objects.filter((obj) => {
        return obj.type === 'textbox';
      });
      for (let i = 0; i < textObjects.length; i++) {
        let text = textObjects[i];
        loadAndUse(canvas, text, text.fontFamily);
      }
      var group = new fabric.ActiveSelection(objects, { canvas: canvas });
      canvas.setActiveObject(group);
      canvas.discardActiveObject();
    }
  }, [isCanvasSet, canvas]);

  // Initialize Canvas
  useEffect(() => {
    setCanvas(initCanvas(appState.canvasWidth, appState.canvasHeight));
    setIsCanvasSet(true);
  }, [initCanvas, appState.canvasWidth, appState.canvasHeight]);

  // Selection Handling
  useEffect(() => {
    if (isCanvasSet) {
      canvas.on('selection:created', (options) => {
        handleSelected(options, appDispatch);
        let canvasJSON = JSON.stringify(canvas);
        sessionStorage.setItem('designCanvas', canvasJSON);
      });
      canvas.on('selection:updated', (options) => {
        handleSelected(options, appDispatch);
      });
      canvas.on('selection:cleared', () => {
        appDispatch({
          type: 'setCurrentObject',
          data: { type: '', object: null },
        });
        appDispatch({ type: 'setIsSelection', data: false });

        let canvasJSON = JSON.stringify(canvas);
        sessionStorage.setItem('designCanvas', canvasJSON);
      });
      canvas.on('object:modified', () => {
        let canvasJSON = JSON.stringify(canvas);
        sessionStorage.setItem('designCanvas', canvasJSON);
      });
    }
  }, [appDispatch, isCanvasSet, canvas]);

  // Delete
  const keyDownHandler = useCallback(
    (e) => {
      const keyCode = e.keyCode;
      if (canvas && keyCode === 46) {
        canvas.getActiveObjects().forEach((obj) => {
          canvas.remove(obj);
        });
        canvas.discardActiveObject().requestRenderAll();
      }
    },
    [canvas]
  );

  useEffect(() => {
    document.addEventListener('keydown', keyDownHandler);
    return () => document.removeEventListener('keydown', keyDownHandler);
  }, [keyDownHandler]);

  // // Crop
  // const startCropHandler = () => {
  //   let el = new fabric.Rect({
  //     fill: 'rgba(0,0,0,0)',
  //     originX: 'left',
  //     originY: 'top',
  //     stroke: '#ccc',
  //     strokeDashArray: [2, 2],
  //     strokWidth: 5,
  //     width: 1,
  //     height: 1,
  //     borderColor: '#36fd00',
  //     selectable: true,
  //   });
  //   el.controls.mtr.visible = false;
  //   // el.setControlsVisibility({ mtr: false });

  //   canvas.getObjects().forEach((el) => {
  //     el.selectable = false;
  //   });
  //   let activeEl = canvas.getActiveObject();
  //   el.left = activeEl.left;
  //   el.top = activeEl.top;
  //   el.width = (activeEl.width * activeEl.scaleX) / 2;
  //   el.height = (activeEl.height * activeEl.scaleY) / 2;
  //   el.uniFormScaling = true;
  //   canvas.add(el);
  //   canvas.setActiveObject(el);
  //   el.on('moving', function (e) {
  //     let objectHeight = el.height * el.scaleY;
  //     let objectWidth = el.width * el.scaleX;
  //     let boundHeight = activeEl.height * activeEl.scaleY;
  //     let boundWidth = activeEl.width * activeEl.scaleX;

  //     let top = el.top;
  //     let bottom = el.top + objectHeight;
  //     let left = el.left;
  //     let right = el.left + objectWidth;

  //     let topBound = activeEl.top;
  //     let bottomBound = topBound + boundHeight;
  //     let leftBound = activeEl.left;
  //     let rightBound = leftBound + boundWidth;
  //     //left
  //     if (left < leftBound) el.left = leftBound;
  //     //top
  //     if (top < topBound) el.top = topBound;
  //     //right
  //     if (right > rightBound) el.left = rightBound - objectWidth;
  //     //bottom
  //     if (bottom > bottomBound) el.top = bottomBound - objectHeight;
  //   });

  //   // canvas scaling limit
  //   el.on('scaling', function (e) {
  //     let objectHeight = el.height * el.scaleY;
  //     let objectWidth = el.width * el.scaleX;
  //     let boundHeight = activeEl.height * activeEl.scaleY;
  //     let boundWidth = activeEl.width * activeEl.scaleX;

  //     let top = el.top;
  //     let bottom = el.top + objectHeight;
  //     let left = el.left;
  //     let right = el.left + objectWidth;

  //     let topBound = activeEl.top;
  //     let bottomBound = topBound + boundHeight;
  //     let leftBound = activeEl.left;
  //     let rightBound = leftBound + boundWidth;

  //     //left
  //     if (left < leftBound || right > rightBound) {
  //       el.left = leftBound;
  //       el.scaleX = boundWidth / objectWidth;
  //     }
  //     //top
  //     if (top < topBound || bottom > bottomBound) {
  //       el.top = topBound;
  //       el.scaleY = boundHeight / objectHeight;
  //     }
  //   });
  // };
  // const cropImageHandler = () => {};

  return (
    <>
      {/* {appState.currentObject.type === 'image' ? (
        <>
          <button onClick={startCropHandler}>Start Crop</button>
          <button onClick={cropImageHandler}>Crop</button>
        </>
      ) : null} */}

      <div
        style={{
          width: appState.canvasWidth + 'px',
          height: appState.canvasHeight + 'px',
        }}
        ref={canvasContainer}
        className={styles.Canvas}
      >
        <canvas id='canvas' />
      </div>
    </>
  );
};

export default Canvas;
