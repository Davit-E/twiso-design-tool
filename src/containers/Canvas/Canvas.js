import React, {
  useState,
  useRef,
  useContext,
  useEffect,
  useCallback,
} from 'react';
import styles from './Canvas.module.css';
import AppContext from '../../contexts/AppContext';
import fabricConfig from './fabricConfig';
import useKeyDownEvents from './canvasHooks/useKeyDownEvents';
import useAddObject from './canvasHooks/useAddObject';
import useSelectionObserver from './canvasHooks/useSelectionObserver';
import useGuidelines from './canvasHooks/useGuideLines';
import useUpdateObject from './canvasHooks/useUpdateObject';
import Toolbar from '../Toolbar/Toolbar';
import useCropImage from './canvasHooks/useCropImage';
import CanvasToolbar from '../CanvasToolbar/CanvasToolbar';
import useAddCanvas from './canvasHooks/useAddCanvas';

fabricConfig();

const Canvas = ({
  canvas,
  setCanvas,
  setFabricCanvasArr,
  сurrentCanvasId,
  setCurrentCanvasId,
}) => {
  const { appState, appDispatch } = useContext(AppContext);
  const [canvasArr, setCanvasArr] = useState([]);
  const [currentCanvas, setCurrentCanvas] = useState(null);
  const [shouldChangeCanvas, setShouldChangecanvas] = useState(false);
  const [idCount, setIdCount] = useState(1);
  const [objectIdCount, setObjectIdCount] = useState(1);
  const [isCanvasSet, setIsCanvasSet] = useState(false);
  const borderRef = useRef(null);
  const updatetObjectId = useCallback(() => setObjectIdCount((i) => i + 1), []);

  useGuidelines(appState, isCanvasSet, canvas);
  useKeyDownEvents(canvas);
  useAddObject(appState, appDispatch, canvas, objectIdCount, updatetObjectId);
  useSelectionObserver(isCanvasSet, canvas, appState, appDispatch);
  useUpdateObject(appState, appDispatch, canvas);
  useCropImage(appState, appDispatch, canvas, objectIdCount, updatetObjectId);

  const updateId = useCallback(
    (canvasId) => {
      setCurrentCanvasId(canvasId);
      setIdCount((i) => i + 1);
    },
    [setCurrentCanvasId]
  );

  const canvasToolbarClickHandler = (e) => {
    if (e.target.id === 'borderContainer' || e.target.id === 'border') {
      if (appState.isCropMode){
        appDispatch({ type: 'setIsCropMode', data: false });
      }
      let data = false;
      if (!appState.showCanvasToolbar) {
        data = true;
        canvas.discardActiveObject().requestRenderAll();
      }
      appDispatch({ type: 'setShowCanvasToolbar', data });
    }
  };
  const canvasClickHadnler = (e) => {
    if (appState.showCanvasToolbar) {
      appDispatch({ type: 'setShowCanvasToolbar', data: false });
    }
  };

  let borderStyles = [styles.CanvasBorder];
  if (appState.showCanvasToolbar) borderStyles.push(styles.Opacity1);

  let borderCanvasContainerSize = {
    width: appState.canvasState.width * appState.canvasState.zoom + 14 + 'px',
    height: appState.canvasState.height * appState.canvasState.zoom + 14 + 'px',
  };
  let borderSize = {
    width: appState.canvasState.width * appState.canvasState.zoom + 4 + 'px',
    height: appState.canvasState.height * appState.canvasState.zoom + 4 + 'px',
  };
  let canvasSize = {
    width: appState.canvasState.width * appState.canvasState.zoom + 'px',
    height: appState.canvasState.height * appState.canvasState.zoom + 'px',
  };

  useAddCanvas(
    appState,
    appDispatch,
    setCanvas,
    setIsCanvasSet,
    setCanvasArr,
    currentCanvas,
    setFabricCanvasArr,
    сurrentCanvasId,
    shouldChangeCanvas,
    setShouldChangecanvas
  );

  useEffect(() => {
    if (appState.shouldAddCanvas) {
      setIsCanvasSet(false);
      let canvasId = 'canvas' + idCount;
      let newCanvas = <canvas id={'canvas' + idCount} />;
      setCanvasArr((prevState) => [...prevState, newCanvas]);
      setCurrentCanvas(newCanvas);
      updateId(canvasId);
      if (canvas) {
        canvas.discardActiveObject().requestRenderAll();
        appDispatch({ type: 'setCurrentCoords', data: null });
        appDispatch({
          type: 'setCurrentObject',
          data: { type: '', object: null },
        });
        appDispatch({ type: 'setShowCanvasToolbar', data: false });
      }
      appDispatch({ type: 'setShouldAddCanvas', data: false });
      setShouldChangecanvas(true);
    }
  }, [appDispatch, idCount, appState.shouldAddCanvas, updateId, canvas]);

  return (
    <div className={styles.CanvasComponent}>
      <div
        style={borderCanvasContainerSize}
        className={styles.BorderCanvasContainer}
      >
        <div
          className={styles.BorderContainer}
          id='borderContainer'
          onClick={canvasToolbarClickHandler}
        >
          <div
            id='border'
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
          {canvasArr.map((el) => (
            <div
              key={el.props.id}
              style={{
                ...canvasSize,
                display: el.props.id === сurrentCanvasId ? 'flex' : 'none',
              }}
              className={styles.Canvas}
              id='canvasContainer'
            >
              {el}
            </div>
          ))}
          {appState.showToolbar ? <Toolbar canvas={canvas} /> : null}
        </div>
        {appState.showCanvasToolbar ? <CanvasToolbar /> : null}
      </div>
    </div>
  );
};

export default Canvas;
