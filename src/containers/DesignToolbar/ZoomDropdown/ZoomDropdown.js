import React from 'react';
import styles from './ZoomDropdown.module.css';

const ZoomDropdown = ({ state, dispatch }) => {
  const zoomSizes = {
    zoom10: 0.1,
    zoom25: 0.25,
    zoom50: 0.5,
    zoom75: 0.75,
    zoom100: 1,
    zoom125: 1.25,
    zoom150: 1.5,
    zoom200: 2,
  };

  const clickHandler = (e) => {
    if (e.target.classList.contains(styles.Option)) {
      dispatch({
        type: 'setCanvasSize',
        data: {
          width: state.width,
          height: state.height,
          zoom: zoomSizes[e.target.id],
        },
      });
      dispatch({ type: 'setIsZoomDropdown', data: false });
    }
  };

  return (
    <div className={styles.Dropdown} onClick={clickHandler}>
      <ul className={styles.Options}>
        <li className={styles.Option} id='zoom10'>
          10%
        </li>
        <li className={styles.Option} id='zoom25'>
          25%
        </li>
        <li className={styles.Option} id='zoom50'>
          50%
        </li>
        <li className={styles.Option} id='zoom75'>
          75%
        </li>
        <li className={styles.Option} id='zoom100'>
          100%
        </li>
        <li className={styles.Option} id='zoom125'>
          125%
        </li>
        <li className={styles.Option} id='zoom150'>
          150%
        </li>
        <li className={styles.Option} id='zoom200'>
          200%
        </li>
      </ul>
    </div>
  );
};

export default ZoomDropdown;
