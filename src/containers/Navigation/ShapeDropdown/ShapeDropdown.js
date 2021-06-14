import React, { useContext } from 'react';
import styles from './ShapeDropdown.module.css';
import square from '../../../assets/square.svg';
import roundedSquare from '../../../assets/roundedSquare.svg';
import circle from '../../../assets/circle.svg';
import triangle from '../../../assets/triangle.svg';
import line from '../../../assets/line.svg';
import AppContext from '../../../contexts/AppContext';

const ShapeDropdown = () => {
  const { appDispatch } = useContext(AppContext);
  const clickHandler = (e) => {
    if (e.target.tagName === 'IMG') {
      appDispatch({ type: 'setShapeToAdd', data: e.target.id });
    } else if (e.target.classList.contains(styles.ShapeContainer)) {
      appDispatch({ type: 'setShapeToAdd', data: e.target.childNodes[0].id });
    }
  };

  return (
    <div className={styles.Dropdown} onClick={clickHandler}>
      <div className={styles.ShapeContainer}>
        <img className={styles.Shape} src={square} alt='square' id='square' />
      </div>
      <div className={styles.ShapeContainer}>
        <img
          className={styles.Shape}
          src={roundedSquare}
          alt='rounded square'
          id='roundedSquare'
        />
      </div>
      <div className={styles.ShapeContainer}>
        <img className={styles.Shape} src={circle} alt='circle' id='circle' />
      </div>
      <div className={styles.ShapeContainer}>
        <img
          className={styles.Shape}
          src={triangle}
          alt='triangle'
          id='triangle'
        />
      </div>
      <div className={styles.ShapeContainer}>
        <img className={styles.Shape} src={line} alt='line' id='line' />
      </div>
    </div>
  );
};

export default ShapeDropdown;
