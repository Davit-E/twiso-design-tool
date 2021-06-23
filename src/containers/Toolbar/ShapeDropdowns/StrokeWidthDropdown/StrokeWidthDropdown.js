import React from 'react';
import styles from './StrokeWidthDropdown.module.css';

const StrokeWidthDropdown = ({ setIsDropDown, dispatch, isLine }) => {
  const optionsClickHandler = (e) => {
    if (e.target.tagName === 'LI') {
      dispatch({ type: 'setShapeStrokeWidth', data: +e.target.textContent });
      dispatch({ type: 'setShowToolbar', data: false });
      setIsDropDown(false);
    }
  };
  let list = null;
  if (isLine) {
    list = (
      <ul className={styles.LineDropdown} onClick={optionsClickHandler}>
        <li className={styles.StrokeOption}>1</li>
        <li className={styles.StrokeOption}>5</li>
        <li className={styles.StrokeOption}>10</li>
        <li className={styles.StrokeOption}>15</li>
        <li className={styles.StrokeOption}>20</li>
        <li className={styles.StrokeOption}>25</li>
        <li className={styles.StrokeOption}>30</li>
        <li className={styles.StrokeOption}>35</li>
        <li className={styles.StrokeOption}>40</li>
        <li className={styles.StrokeOption}>45</li>
        <li className={styles.StrokeOption}>50</li>
      </ul>
    );
  } else {
    list = (
      <ul className={styles.ShapeDropdown} onClick={optionsClickHandler}>
        <li className={styles.StrokeOption}>0</li>
        <li className={styles.StrokeOption}>4</li>
        <li className={styles.StrokeOption}>8</li>
        <li className={styles.StrokeOption}>12</li>
        <li className={styles.StrokeOption}>24</li>
        <li className={styles.StrokeOption}>48</li>
        <li className={styles.StrokeOption}>96</li>
        <li className={styles.StrokeOption}>120</li>
      </ul>
    );
  }

  return list;
};

export default StrokeWidthDropdown;
