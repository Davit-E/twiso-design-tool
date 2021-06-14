import React, { useState } from 'react';
import styles from './FontsDropdown.module.css';
import search from '../../../../assets/search.svg';
import fonts from './fontsData';

const FontsDropdown = ({ setIsDropDown, dispatch }) => {
  const [input, setInput] = useState('');
  const optionsClickHandler = (e) => {
    if (e.target.tagName === 'LI') {
      dispatch({ type: 'setFontFamily', data: e.target.textContent });
      dispatch({ type: 'setShowToolbar', data: false });
      setIsDropDown(false);
    }
  };

  const options = fonts
    .filter((font) => {
      return font.toLowerCase().includes(input.toLowerCase());
    })
    .map((font) => {
      return (
        <li className={styles.FontOption} key={font}>
          {font}
        </li>
      );
    });

  return (
    <div className={styles.FontsDropdown}>
      <div className={styles.SearchContainer}>
        <img className={styles.SearchSvg} src={search} alt='search' />
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className={styles.SearchInput}
          placeholder='Search'
          type='text'
        />
      </div>
      <ul className={styles.FontOptionsContainer} onClick={optionsClickHandler}>
        {options}
      </ul>
      <div className={styles.UploadFontContainer}>
        <button className={styles.UploadFontButton}>Upload font</button>
      </div>
    </div>
  );
};

export default FontsDropdown;
