import React, { useState, useRef, useContext } from 'react';
import styles from './Canvas.module.css';
import AppContext from '../../contexts/AppContext';
import fabricConfig from './fabricConfig';
import useDeleteSelected from './canvasHooks/useDeleteSelected';
import useInitCanvas from './canvasHooks/useInitCanvas';
import useAddObject from './canvasHooks/useAddObject';
import useSelectionObserver from './canvasHooks/useSelectionObserver';
import useGuidelines from './canvasHooks/useGuideLines';
import useUpdateObject from './canvasHooks/useUpdateObject';
import Toolbar from '../Toolbar/Toolbar';
import useCropImage from './canvasHooks/useCropImage';
import CanvasToolbar from '../CanvasToolbar/CanvasToolbar';

fabricConfig();

const Canvas = ({canvas, setCanvas}) => {
  const { appState, appDispatch } = useContext(AppContext);
  const [isCanvasSet, setIsCanvasSet] = useState(false);
  const borderRef = useRef(null);
  useInitCanvas(appState, setCanvas, setIsCanvasSet);
  useGuidelines(appState, isCanvasSet, canvas);
  useDeleteSelected(canvas);
  useAddObject(appState, appDispatch, canvas);
  useSelectionObserver(isCanvasSet, canvas, appState, appDispatch);
  useUpdateObject(appState, appDispatch, canvas);
  useCropImage(appState, appDispatch, canvas);

  const canvasToolbarClickHandler = (e) => {
    let data = false;
    if (!appState.showCanvasToolbar) {
      data = true;
      canvas.discardActiveObject().requestRenderAll();
    }
    appDispatch({ type: 'setShowCanvasToolbar', data });
  };

  const canvasClickHadnler = () => {
    if (appState.showCanvasToolbar) {
      appDispatch({ type: 'setShowCanvasToolbar', data: false });
    }
  };

  let borderStyles = [styles.CanvasBorder];
  if (appState.showCanvasToolbar) borderStyles.push(styles.Opacity1);
  let borderContainerSize = {
    width: appState.canvasState.width + 14 + 'px',
    height: appState.canvasState.height + 14 + 'px',
  };
  let borderSize = {
    width: appState.canvasState.width + 4 + 'px',
    height: appState.canvasState.height + 4 + 'px',
  };
  let canvasSize = {
    width: appState.canvasState.width + 'px',
    height: appState.canvasState.height + 'px',
  };

  return (
    <div className={styles.CanvasComponent}>
      <div
        style={borderContainerSize}
        className={styles.BorderContainer}
        onClick={canvasToolbarClickHandler}
      >
        <div
          ref={borderRef}
          className={borderStyles.join(' ')}
          style={borderSize}
        ></div>
      </div>

      <div
        style={canvasSize}
        className={styles.CanvasContainer}
        onClick={canvasClickHadnler}
      >
        <div style={canvasSize} className={styles.Canvas}>
          <canvas id='canvas' />
        </div>
      </div>

      {appState.showCanvasToolbar ? <CanvasToolbar /> : null}
      {appState.showToolbar ? <Toolbar /> : null}
    </div>
  );
};

export default Canvas;
