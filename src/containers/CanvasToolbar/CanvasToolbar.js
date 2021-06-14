import React, { useState, useContext, useEffect, useRef } from 'react';
import styles from './CanvasToolbar.module.css';
import AppContext from '../../contexts/AppContext';
import { SketchPicker } from 'react-color';
import backgroundImage from '../../assets/backgroundImage.svg';

const CanvasToolbar = () => {
  const { appState, appDispatch } = useContext(AppContext);
  const [color, setColor] = useState(appState.canvasState.backgroundColor);
  const [isColorDropdown, setIsColorDropdown] = useState(false);
  const canvasToolbarRef = useRef(null);
  const backgroundColorRef = useRef(null);
  const isLine = appState.currentObject.type === 'line';
  const colorChangeCompleteHandler = (c) => {
    let colorString = `rgba(${c.rgb.r}, ${c.rgb.g}, ${c.rgb.b}, ${c.rgb.a})`;
    backgroundColorRef.current.style.background = colorString;
    appDispatch({ type: 'setCanvasBackgroundColor', data: colorString });
  };
  const clickHandler = (e) => {
    if (e.currentTarget.id === 'color') {
      setIsColorDropdown((prevState) => !prevState);
    } else if (e.currentTarget.id === 'image') {
      setIsColorDropdown(false);
      appDispatch({ type: 'setShouldAddCanvasBgImage', data: true });
    }
  };

  useEffect(() => {
    backgroundColorRef.current.style.background = color;
    canvasToolbarRef.current.style.opacity = 1;
  }, [color, isLine, appState.shapeState]);

  return (
    <div ref={canvasToolbarRef} className={styles.CanvasToolbar}>
      <div className={styles.ColorContainer} id='color' onClick={clickHandler}>
        <div className={styles.ColorPickerBorder}>
          <div ref={backgroundColorRef} className={styles.ColorPicker}></div>
        </div>
        <p>Background</p>
      </div>
      <div className={styles.BorderDiv}></div>

      <div className={styles.ImageContainer} id='image' onClick={clickHandler}>
        <img
          className={styles.BackgroundImage}
          src={backgroundImage}
          alt='backgroundImage'
        />
        <p>Background Image</p>
      </div>
      {isColorDropdown ? (
        <div className={styles.ColorDropdownContainer}>
          <SketchPicker
            color={color}
            onChange={(c) => setColor(c.rgb)}
            onChangeComplete={colorChangeCompleteHandler}
          />
        </div>
      ) : null}
    </div>
  );
};

export default CanvasToolbar;
