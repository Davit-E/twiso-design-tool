import React, { useState, useEffect, useCallback } from 'react';
import { SketchPicker } from 'react-color';
import styles from './ShapeDropdowns.module.css';
import StrokeWidthDropdown from './StrokeWidthDropdown/StrokeWidthDropdown';

const ShapeDropdowns = ({
  state,
  dispatch,
  coords,
  shapeToolbar,
  isStrokeWidthDropdown,
  isFillDropdown,
  isStrokeDropdown,
  fill,
  setFill,
  fillChangeCompleteHandler,
  fillRef,
  stroke,
  setStroke,
  strokeChangeCompleteHandler,
  strokeRef,
  setIsStrokeWidthDropdown,
  isLine,
}) => {
  const [dropDownStyle, setDropdownStyle] = useState({ top: 41 });
  const [strokeWidthDropDownStyle, setStrokeWidthDropDownStyle] = useState({
    top: 41,
  });
  const maxDropdownHeight = 301;
  const maxDropdownWidth = 220;
  const DropdownOffset = 41;
  const DropdownPadding = 20;

  const handleDropdownPosition = useCallback(
    (coords, shapeToolbar, canvasHeight) => {
      let toolbarWidth = shapeToolbar.offsetWidth;
      let style = {};
      if (
        coords.coordY + maxDropdownHeight + DropdownOffset + DropdownPadding >
        canvasHeight
      ) {
        style.bottom = 41;
        setStrokeWidthDropDownStyle({ bottom: 41 });
      }

      if (coords.coordX + toolbarWidth - maxDropdownWidth < 0) {
        style.left = 0;
        if (!style.bottom) style.top = 41;
      }
      if (Object.keys(style).length !== 0) setDropdownStyle(style);
    },
    []
  );

  useEffect(() => {
    if (coords && shapeToolbar) {
      handleDropdownPosition(
        coords,
        shapeToolbar,
        state.canvasState.height * state.canvasState.zoom
      );
    }
  }, [handleDropdownPosition, shapeToolbar, state.canvasState, coords]);

  return (
    <>
      {isFillDropdown ? (
        <div className={styles.FillDropdownContainer} style={dropDownStyle}>
          <SketchPicker
            color={fill}
            onChange={(c) => setFill(c.rgb)}
            onChangeComplete={(c) =>
              fillChangeCompleteHandler(c, dispatch, fillRef)
            }
          />
        </div>
      ) : null}

      {isStrokeDropdown ? (
        <div className={styles.StrokeDropdownContainer} style={dropDownStyle}>
          <SketchPicker
            color={stroke}
            onChange={(c) => setStroke(c.rgb)}
            onChangeComplete={(c) =>
              strokeChangeCompleteHandler(c, dispatch, strokeRef)
            }
          />
        </div>
      ) : null}

      {isStrokeWidthDropdown ? (
        <div
          className={styles.StrokeWidthDropdownContainer}
          style={strokeWidthDropDownStyle}
        >
          <StrokeWidthDropdown
            setIsDropDown={setIsStrokeWidthDropdown}
            isLine={isLine}
            dispatch={dispatch}
          />
        </div>
      ) : null}
    </>
  );
};

export default ShapeDropdowns;
