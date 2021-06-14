import React from 'react';
import styles from './TextAlignDropdown.module.css';
import textLeft from '../../../../assets/textLeft.svg';
import textRight from '../../../../assets/textRight.svg';
import textCenter from '../../../../assets/textCenter.svg';
import textJustify from '../../../../assets/textJustify.svg';

const TextAlignDropdown = ({ setIsDropDown, dispatch, current }) => {
  const optionsClickHandler = (e) => {
    let data = null;
    if (e.target.tagName === 'LI') data = e.target.childNodes[0].alt;
    else if (e.target.tagName === 'P') data = e.target.textContent;
    else if (e.target.tagName === 'IMG') data = e.target.alt;
    if (data) {
      dispatch({ type: 'setTextAlign', data: data.toLowerCase() });
      setIsDropDown(false);
    }
  };

  return (
    <ul className={styles.TextAlignDropdown} onClick={optionsClickHandler}>
      <li
        className={[
          styles.TextAlignOption,
          current === 'left' ? styles.Current : null,
        ].join(' ')}
      >
        <img className={styles.TextAlignImage} src={textLeft} alt='left' />
        <p className={styles.TextAlignText}>Left</p>
      </li>
      <li
        className={[
          styles.TextAlignOption,
          current === 'center' ? styles.Current : null,
        ].join(' ')}
      >
        <img className={styles.TextAlignImage} src={textCenter} alt='center' />
        <p className={styles.TextAlignText}>Center</p>
      </li>
      <li
        className={[
          styles.TextAlignOption,
          current === 'right' ? styles.Current : null,
        ].join(' ')}
      >
        <img className={styles.TextAlignImage} src={textRight} alt='right' />
        <p className={styles.TextAlignText}>Right</p>
      </li>
      <li
        className={[
          styles.TextAlignOption,
          current === 'justify' ? styles.Current : null,
        ].join(' ')}
      >
        <img
          className={styles.TextAlignImage}
          src={textJustify}
          alt='justify'
        />
        <p className={styles.TextAlignText}>Justify</p>
      </li>
    </ul>
  );
};

export default TextAlignDropdown;
