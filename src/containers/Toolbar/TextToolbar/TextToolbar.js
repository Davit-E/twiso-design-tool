import React, { useState, useContext, useEffect, useRef } from 'react';
import styles from './TextToolbar.module.css';
import downArrow from '../../../assets/downArrow.svg';
import bold from '../../../assets/bold.svg';
import italic from '../../../assets/italic.svg';
import textLeft from '../../../assets/textLeft.svg';
import textRight from '../../../assets/textRight.svg';
import textCenter from '../../../assets/textCenter.svg';
import textJustify from '../../../assets/textJustify.svg';
import TextDropdowns from '../TextDropdowns/TextDropdowns';
import AppContext from '../../../contexts/AppContext';
import {
  handleClick,
  fontSizeChangeHandler,
  colorChangeCompleteHandler,
} from './utils/handlers';

const TextToolbar = ({ coords }) => {
  const { appState, appDispatch } = useContext(AppContext);
  const [fontSizeInput, setFontSizeInput] = useState(
    appState.textState.fontSize
  );
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isFontFamilyDropdown, setIsFontFamilyDropdown] = useState(false);
  const [isFontSizeDropdown, setIsFontSizeDropdown] = useState(false);
  const [isColorDropdown, setIsColorDropdown] = useState(false);
  const [isTextAlignDropDown, setIsTextAlignDropDown] = useState(false);
  const [color, setColor] = useState({
    r: 0,
    g: 0,
    b: 0,
    a: 1,
  });
  const colorPickerRef = useRef(null);

  // Active styles
  const boldStlyes = [styles.FontWeightBoldContainer];
  const italicStyles = [styles.FontStyleItalicContainer];
  const isBold = appState.textState.fontWeight === 'Bold';
  const isItalic = appState.textState.fontStyle === 'Italic';
  if (isBold) boldStlyes.push(styles.Active);
  if (isItalic) italicStyles.push(styles.Active);

  // Text Align SVG
  let textAlignSrc = textLeft;
  if (appState.textState.textAlign === 'center') {
    textAlignSrc = textCenter;
  } else if (appState.textState.textAlign === 'right') {
    textAlignSrc = textRight;
  } else if (appState.textState.textAlign === 'justify') {
    textAlignSrc = textJustify;
  }

  const boldHandler = () => {
    let weight = 'Bold';
    if (isBold) weight = 'Normal';
    appDispatch({ type: 'setFontWeight', data: weight });
  };

  const italicHandler = () => {
    let style = 'Italic';
    if (isItalic) style = 'Normal';
    appDispatch({ type: 'setFontStyle', data: style });
  };

  const dropdownHandlers = {
    fontFamily: setIsFontFamilyDropdown,
    fontSizeArrow: setIsFontSizeDropdown,
    colorPicker: setIsColorDropdown,
    textAlign: setIsTextAlignDropDown,
  };

  const styleHandlers = {
    bold: boldHandler,
    italic: italicHandler,
  };

  const clickHandler = (e) => handleClick(e, dropdownHandlers, styleHandlers);

  useEffect(() => {
    if (isFirstLoad) {
      setIsFirstLoad(false);
      const [r, g, b, a] = appState.textState.fill
        .split('(')[1]
        .split(')')[0]
        .split(',');
      setColor({ r, g, b, a });
      colorPickerRef.current.style.background = appState.textState.fill;
    }
  }, [appState.textState.fill, isFirstLoad]);

  return (
    <div className={styles.TextToolbar}>
      <div
        className={styles.FontsContainer}
        id='fontFamily'
        onClick={clickHandler}
      >
        <p>{appState.textState.fontFamily}</p>
        <img className={styles.DownArrow} src={downArrow} alt='arrow' />
      </div>
      <div className={styles.BorderDiv}></div>
      <div className={styles.FontSizeContainer}>
        <div className={styles.FontSizeInputContainer}>
          <input
            className={styles.FontSizeInput}
            type='number'
            value={fontSizeInput}
            onChange={(e) =>
              fontSizeChangeHandler(e, setFontSizeInput, appDispatch)
            }
          />
        </div>
        <div
          className={styles.FontSizeArrowContainer}
          id='fontSizeArrow'
          onClick={clickHandler}
        >
          <img className={styles.DownArrow} src={downArrow} alt='arrow' />
        </div>
      </div>
      <div className={styles.BorderDiv}></div>

      <div
        className={styles.ColorPickerContainer}
        id='colorPicker'
        onClick={clickHandler}
      >
        <div className={styles.ColorPickerBorder}>
          <div ref={colorPickerRef} className={styles.ColorPicker}></div>
        </div>
      </div>
      <div className={styles.BorderDiv}></div>

      <div className={boldStlyes.join(' ')} id='bold' onClick={clickHandler}>
        <img className={styles.Bold} src={bold} alt='bold' />
      </div>
      <div className={styles.BorderDiv}></div>

      <div
        className={italicStyles.join(' ')}
        id='italic'
        onClick={clickHandler}
      >
        <img className={styles.Italic} src={italic} alt='italic' />
      </div>
      <div className={styles.BorderDiv}></div>

      <div
        className={styles.TextAlignContainer}
        id='textAlign'
        onClick={clickHandler}
      >
        <img className={styles.TextAlign} src={textAlignSrc} alt='textAlign' />
      </div>
      <TextDropdowns
        state={appState}
        dispatch={appDispatch}
        coords={coords}
        isFontFamilyDropdown={isFontFamilyDropdown}
        isFontSizeDropdown={isFontSizeDropdown}
        isColorDropdown={isColorDropdown}
        isTextAlignDropDown={isTextAlignDropDown}
        setIsFontFamilyDropdown={setIsFontFamilyDropdown}
        setIsFontSizeDropdown={setIsFontSizeDropdown}
        colorChangeCompleteHandler={colorChangeCompleteHandler}
        setIsTextAlignDropDown={setIsTextAlignDropDown}
        setColor={setColor}
        color={color}
        colorPickerRef={colorPickerRef}
      />
    </div>
  );
};

export default TextToolbar;
