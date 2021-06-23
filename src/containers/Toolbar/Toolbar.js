import React, {
  useContext,
  useRef,
  useEffect,
  useCallback,
  useState,
} from 'react';
import AppContext from '../../contexts/AppContext';
import styles from './Toolbar.module.css';
import { calcPosition } from './utils/toolbarPosition';
import TextToolbar from './TextToolbar/TextToolbar';
import ShapeToolbar from './ShapeToolbar/ShapeToolbar';
import ImageToolbar from './ImageToolbar/ImageToolbar';

const Toolbar = ({ canvas }) => {
  const [coords, setCoords] = useState(null);
  const { appState } = useContext(AppContext);
  const toolbarRef = useRef(null);
  const toolbarOffset = 28;
  const toolbarPadding = 10;
  const shapeArr = ['rect', 'circle', 'triangle', 'line'];
  const setTransform = useCallback((c) => {
    toolbarRef.current.style.transform = `translate(${c.coordX}px, ${c.coordY}px)`;
    toolbarRef.current.style.opacity = 1;
    setCoords(c);
  }, []);

  useEffect(() => {
    if (appState.currentCoords) {
      setTransform(
        calcPosition(
          appState.currentCoords,
          canvas.getWidth(),
          canvas.getHeight(),
          toolbarRef.current,
          toolbarOffset,
          toolbarPadding
        )
      );
    }
  }, [canvas, setTransform, appState.currentCoords, appState.isCroppingImage]);

  return (
    <div ref={toolbarRef} className={styles.Toolbar}>
      {appState.currentObject.type === 'text' ? (
        <TextToolbar coords={coords} />
      ) : null}
      {shapeArr.includes(appState.currentObject.type) ? (
        <ShapeToolbar coords={coords} />
      ) : null}
      {appState.currentObject.type === 'image' ? <ImageToolbar /> : null}
    </div>
  );
};

export default Toolbar;
