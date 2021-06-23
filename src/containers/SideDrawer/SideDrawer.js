import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useContext,
} from 'react';
import styles from './SideDrawer.module.css';
import close from '../../assets/close.svg';
import AppContext from '../../contexts/AppContext';
import { fabric } from 'fabric';
const SideDrawer = ({
  isSideDrawer,
  setIsSideDrawer,
  fabricCanvasArr,
  сurrentCanvasId,
  setCurrentCanvasId,
  setCanvas,
  currentCanvas,
}) => {
  const { appState, appDispatch } = useContext(AppContext);
  const [miniCanvasArr, setMiniCanvasArr] = useState([]);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const sideDrawerRef = useRef(null);
  const backdropRef = useRef(null);

  const createCanvas = useCallback((id, canvas) => {
    let newCanvas = new fabric.Canvas(id);
    let jsonCanvas = JSON.stringify(canvas);
    newCanvas.loadFromJSON(
      jsonCanvas,
      newCanvas.requestRenderAll.bind(newCanvas),
      (o, object) => {
        object.set('selectable', false);
      }
    );
    let scaleRatio = Math.min(
      160 / canvas.getWidth(),
      120 / canvas.getHeight()
    );
    newCanvas.setDimensions({
      width: canvas.getWidth() * scaleRatio,
      height: canvas.getHeight() * scaleRatio,
    });
    newCanvas.setZoom(scaleRatio * canvas.getZoom());
  }, []);

  useEffect(() => {
    if (isSideDrawer && fabricCanvasArr) {
      let miniArr = fabricCanvasArr.map((el) => <canvas id={'mini' + el.id} />);
      setMiniCanvasArr(miniArr);
    }
  }, [isSideDrawer, fabricCanvasArr, сurrentCanvasId]);

  const closeHandler = () => {
    setIsSideDrawer(false);
  };

  useEffect(() => {
    if (isFirstLoad) {
      setIsFirstLoad(false);
    }
  }, [isFirstLoad]);

  useEffect(() => {
    if (isSideDrawer) {
      sideDrawerRef.current.classList.add(styles.Open);
      backdropRef.current.style.display = 'block';
    } else {
      sideDrawerRef.current.classList.remove(styles.Open);
      backdropRef.current.style.display = 'none';
    }
  }, [isSideDrawer]);

  useEffect(() => {
    if (miniCanvasArr) {
      fabricCanvasArr.forEach((el) => {
        createCanvas('mini' + el.id, el);
      });
    }
  }, [miniCanvasArr, createCanvas, fabricCanvasArr]);

  const clickHandler = (miniId) => {
    currentCanvas.discardActiveObject().requestRenderAll();
    let id = miniId.split('mini')[1];
    let current = null;
    for (let i = 0; i < fabricCanvasArr.length; i++) {
      let el = fabricCanvasArr[i];
      if (el.id === id) current = el;
    }
    if (current) {
      setCurrentCanvasId(id);
      setCanvas(current);
      appDispatch({ type: 'setCurrentCoords', data: null });
      appDispatch({
        type: 'setCurrentObject',
        data: {
          type: '',
          object: null,
        },
      });
      appDispatch({
        type: 'setCanvasState',
        data: {
          ...appState.canvasState,
          width: current.getWidth() / current.zoom,
          height: current.getHeight() / current.zoom,
          zoom: current.zoom,
          backgroundColor: current.backgroundColor,
          backgroundImage: { type: 'image', src: current.bgImage },
        },
      });
      appDispatch({ type: 'setShowCanvasToolbar', data: false });
    }
    setIsSideDrawer(false);
  };

  return (
    <div className={styles.SideDrawer} ref={sideDrawerRef}>
      <div className={styles.SideDrawerContent}>
        <div className={styles.Header}>
          <p className={styles.HeaderText}>Pages</p>
          <div className={styles.CloseContainer} onClick={closeHandler}>
            <img className={styles.Close} src={close} alt='close' />
          </div>
        </div>
        <div className={styles.PagesContainer}>
          {isSideDrawer
            ? miniCanvasArr.map((el) => {
                return (
                  <div
                    className={[
                      styles.PageContainer,
                      el.props.id.split('mini')[1] === сurrentCanvasId
                        ? styles.Current
                        : null,
                    ].join(' ')}
                    key={el.props.id}
                    onClick={() => clickHandler(el.props.id)}
                  >
                    <div className={styles.Overlay}> </div>
                    <div className={styles.DesignPageContainer}>
                      <div className={styles.DesignPage}>{el}</div>
                    </div>
                    <div className={styles.IndexContainer}>
                      <p className={styles.PageIndex}>
                        {el.props.id.split('minicanvas')[1]}
                      </p>
                    </div>
                  </div>
                );
              })
            : null}
        </div>
      </div>
      <div
        ref={backdropRef}
        className={styles.Backdrop}
        onClick={closeHandler}
      ></div>
    </div>
  );
};

export default SideDrawer;
