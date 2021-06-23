import React, { useState, useContext } from 'react';
import styles from './ImageToolbar.module.css';
import AppContext from '../../../contexts/AppContext';
import replaceImage from '../../../assets/replaceImage.svg';
import cornerRadius from '../../../assets/cornerRadius.svg';
import cropImage from '../../../assets/cropImage.svg';

const ImageToolbar = () => {
  const { appState, appDispatch } = useContext(AppContext);
  const [radiusInput, setRadiusInput] = useState(
    appState.imageState.cornerRadius
  );

  const clickHandler = (e) => {
    if (e.currentTarget.id === 'replace') {
      appDispatch({ type: 'setShouldReplaceImage', data: true });
    } else if (e.currentTarget.id === 'crop') {
      appDispatch({ type: 'setIsCropMode', data: true });
    }
  };

  const radiusChangeHandler = (e) => {
    setRadiusInput(e.target.value);
    let val = +e.target.value;
    if (val < 0) val = 0;
    if (val > 100) val = 100;
    appDispatch({ type: 'setImageCornerRadius', data: val });
  };

  const cropDoneHandler = () => {
    appDispatch({ type: 'setShouldCropImage', data: true });
    appDispatch({ type: 'setShowToolbar', data: false });
  };

  const content = (
    <>
      <div
        className={[
          styles.ReaplaceContainer,
          appState.imageState.isSvg ? styles.BorderStyle : null,
        ].join(' ')}
        id='replace'
        onClick={clickHandler}
      >
        <img src={replaceImage} alt='replace' />
        <p>Replace</p>
      </div>

      {!appState.imageState.isSvg ? (
        <>
          <div className={styles.BorderDiv}></div>
          <div
            className={styles.RadiusContainer}
            id='radius'
            onClick={clickHandler}
          >
            <img src={cornerRadius} alt='radius' />
            <input
              className={styles.RadiusInput}
              type='number'
              value={radiusInput}
              onChange={radiusChangeHandler}
            />
          </div>
          <div className={styles.BorderDiv}></div>
          <div
            className={styles.CropContainer}
            id='crop'
            onClick={clickHandler}
          >
            <img src={cropImage} alt='replace' />
            <p>Crop</p>
          </div>
        </>
      ) : null}
    </>
  );

  return (
    <div className={styles.ImageToolbar}>
      {!appState.isCropMode ? (
        content
      ) : (
        <div className={styles.DoneContainer} onClick={cropDoneHandler}>
          Done
        </div>
      )}
    </div>
  );
};

export default ImageToolbar;
