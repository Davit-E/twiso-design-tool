import React, { useState, useEffect } from 'react';
import FontsDropdown from './FontsDropdown/FontsDropdown';
import FontSizeDropdown from './FontSizeDropdown/FontSizeDropdown';
import TextAlignDropdown from './TextAlignDropdown/TextAlignDropdown';
import { SketchPicker } from 'react-color';
import styles from './TextDropdowns.module.css';

const TextDropdowns = ({
  state,
  dispatch,
  coords,
  isFontFamilyDropdown,
  isFontSizeDropdown,
  isColorDropdown,
  isTextAlignDropDown,
  setIsFontFamilyDropdown,
  setIsFontSizeDropdown,
  colorChangeCompleteHandler,
  setIsTextAlignDropDown,
  setColor,
  color,
  colorPickerRef,
}) => {
  const [dropDownStyle, setDropdownStyle] = useState({ top: 41 });
  const maxDropdownHeight = 301;
  const DropdownOffset = 41;
  const DropdownPadding = 20;

  useEffect(() => {
    if (
      coords &&
      coords.coordY + maxDropdownHeight + DropdownOffset + DropdownPadding >
        state.canvasState.height * state.canvasState.zoom
    ) {
      setDropdownStyle({ bottom: 41 });
    }
  }, [state.canvasState, coords]);

  return (
    <>
      {isFontFamilyDropdown ? (
        <div className={styles.FontsDropdown} style={dropDownStyle}>
          <FontsDropdown
            setIsDropDown={setIsFontFamilyDropdown}
            dispatch={dispatch}
          />
        </div>
      ) : null}
      {isFontSizeDropdown ? (
        <div className={styles.FontSizeDropdown} style={dropDownStyle}>
          <FontSizeDropdown
            setIsDropDown={setIsFontSizeDropdown}
            dispatch={dispatch}
          />
        </div>
      ) : null}
      {isColorDropdown ? (
        <div className={styles.SketchPickerContainer} style={dropDownStyle}>
          <SketchPicker
            color={color}
            onChange={(c) => setColor(c.rgb)}
            onChangeComplete={(c) =>
              colorChangeCompleteHandler(c, colorPickerRef, dispatch)
            }
          />
        </div>
      ) : null}
      {isTextAlignDropDown ? (
        <div className={styles.TextAlignDropdown} style={dropDownStyle}>
          <TextAlignDropdown
            setIsDropDown={setIsTextAlignDropDown}
            dispatch={dispatch}
            current={state.textState.textAlign}
          />
        </div>
      ) : null}
    </>
  );
};

export default TextDropdowns;
