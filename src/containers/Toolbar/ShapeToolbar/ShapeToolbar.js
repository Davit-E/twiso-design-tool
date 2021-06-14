import React, { useState, useContext, useEffect, useRef } from 'react';
import styles from './ShapeToolbar.module.css';
import downArrow from '../../../assets/downArrow.svg';
import AppContext from '../../../contexts/AppContext';
import ShapeDropdowns from '../ShapeDropdowns/ShapeDropdowns';
import {
  initialLoadHandler,
  handleClick,
  fillChangeCompleteHandler,
  strokeChangeCompleteHandler,
  strokeWidthChangeHandler,
} from './utils/handlers';

const ShapeToolbar = ({ coords }) => {
  const { appState, appDispatch } = useContext(AppContext);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [fill, setFill] = useState('rgba(196,196,196,1)');
  const [stroke, setStroke] = useState('rgba(255,255,255,1)');
  const [isFillDropdown, setIsFillDropdown] = useState(false);
  const [isStrokeDropdown, setIsStrokeDropdown] = useState(false);
  const [isStrokeWidthDropdown, setIsStrokeWidthDropdown] = useState(false);
  const [strokeWidthInput, setStrokeWidthInput] = useState(
    appState.shapeState.strokeWidth
  );
  const shapeToolbarRef = useRef(null);
  const fillRef = useRef(null);
  const strokeRef = useRef(null);
  const strokeContainerRef = useRef(null);
  const isLine = appState.currentObject.type === 'line';

  const clickHandler = (e) =>
    handleClick(
      e,
      setIsFillDropdown,
      setIsStrokeDropdown,
      setIsStrokeWidthDropdown
    );

  useEffect(() => {
    if (isFirstLoad) {
      initialLoadHandler(
        isLine,
        appState.shapeState,
        setIsFirstLoad,
        setFill,
        fillRef,
        strokeContainerRef,
        setStroke,
        strokeRef
      );
    }
  }, [isLine, appState.shapeState, isFirstLoad]);

  return (
    <div ref={shapeToolbarRef} className={styles.ShapeToolbar}>
      {!isLine ? (
        <>
          <div
            className={styles.FillContainer}
            id='fill'
            onClick={clickHandler}
          >
            <div className={styles.ColorPickerBorder}>
              <div ref={fillRef} className={styles.ColorPicker}></div>
            </div>
            <p>Fill</p>
          </div>
          <div className={styles.BorderDiv}></div>
        </>
      ) : null}

      <div
        ref={strokeContainerRef}
        className={styles.StrokeContainer}
        id='stroke'
        onClick={clickHandler}
      >
        <div className={styles.ColorPickerBorder}>
          <div ref={strokeRef} className={styles.ColorPicker}></div>
        </div>
        <p>Stroke</p>
      </div>
      <div className={styles.BorderDiv}></div>
      <div className={styles.StrokeWidthContainer}>
        <div className={styles.StrokeWidthInputContainer}>
          <input
            className={styles.StrokeWidthInput}
            type='number'
            value={strokeWidthInput}
            onChange={(e) =>
              strokeWidthChangeHandler(
                e,
                appDispatch,
                setStrokeWidthInput,
                isLine
              )
            }
          />
        </div>
        <div
          className={styles.StrokeWidthArrowContainer}
          id='strokeWidth'
          onClick={clickHandler}
        >
          <img className={styles.DownArrow} src={downArrow} alt='arrow' />
        </div>
      </div>

      <ShapeDropdowns
        state={appState}
        dispatch={appDispatch}
        coords={coords}
        shapeToolbar={shapeToolbarRef.current}
        isStrokeWidthDropdown={isStrokeWidthDropdown}
        setIsStrokeWidthDropdown={setIsStrokeWidthDropdown}
        isStrokeDropdown={isStrokeDropdown}
        isFillDropdown={isFillDropdown}
        fill={fill}
        setFill={setFill}
        fillChangeCompleteHandler={fillChangeCompleteHandler}
        fillRef={fillRef}
        stroke={stroke}
        setStroke={setStroke}
        strokeChangeCompleteHandler={strokeChangeCompleteHandler}
        strokeRef={strokeRef}
        isLine={isLine}
      />
    </div>
  );
};

export default ShapeToolbar;
