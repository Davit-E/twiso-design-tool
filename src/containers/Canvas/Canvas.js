import React, {
  useState,
  useRef,
  useContext,
} from 'react';
import styles from './Canvas.module.css';
import AppContext from '../../contexts/AppContext';
import fabricConfig from './fabricConfig';
import useDeleteSelected from './canvasHooks/useDeleteSelected';
import useInitCanvas from './canvasHooks/useInitCanvas';
import useAddObject from './canvasHooks/useAddObject';
import useSelectionObserver from './canvasHooks/useSelectionObserver';
import useGuidelines from './canvasHooks/useGuideLines';
fabricConfig();

const Canvas = () => {
  const { appState, appDispatch } = useContext(AppContext);
  const [canvas, setCanvas] = useState(null);
  const [isCanvasSet, setIsCanvasSet] = useState(false);
  const canvasContainer = useRef(null);
  useInitCanvas(appState, setCanvas, setIsCanvasSet)
  useGuidelines(isCanvasSet, canvas)
  useDeleteSelected(canvas);
  useAddObject(appState, appDispatch, canvas);
  useSelectionObserver(isCanvasSet, canvas, appDispatch);

  return (
    <>
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
