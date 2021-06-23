import React, { useContext, useRef } from 'react';
import styles from './ImageDropdown.module.css';
import AppContext from '../../../contexts/AppContext';

const ImageDropdown = ({ setUserFiles, userFiles }) => {
  const { appState, appDispatch } = useContext(AppContext);
  const fileInput = useRef(null);
  const clickHandler = (e) => {
    let type = 'setImageToAdd';
    let imageType = 'image';
    if (e.target.classList.contains('isSvg')) imageType = 'svg';
    if (appState.shouldAddCanvasBgImage) {
      type = 'setCanvasBackgroundImage';
    }
    if (e.target.tagName === 'IMG') {
      appDispatch({ type, data: { type: imageType, src: e.target.src } });
    } else if (e.target.classList.contains(styles.ImageContainer)) {
      appDispatch({
        type,
        data: { type: imageType, src: e.target.childNodes[0].src },
      });
    }
  };

  const inputChangeHandler = () => {
    if (fileInput.current.files[0]) {
      let file = fileInput.current.files[0];
      let type = 'image';
      if (file.type === 'image/svg+xml') type = 'svg';
      console.log(file);
      setUserFiles((prevSate) => [
        { src: URL.createObjectURL(file), type },
        ...prevSate,
      ]);
    }
  };

  const uploadClickHandler = () => {
    fileInput.current.click();
  };

  const oddArr = userFiles.filter((_, i) => (i + 1) % 2 !== 0);
  const evenArr = userFiles.filter((_, i) => (i + 1) % 2 === 0);

  return (
    <div className={styles.Dropdown} onClick={clickHandler}>
      <div className={styles.UplaodButtonContainer}>
        <button onClick={uploadClickHandler} className={styles.UploadButton}>
          Upload image
        </button>
        <input
          accept='image/png, image/gif, image/jpeg, image/svg+xml'
          className={styles.FileInput}
          ref={fileInput}
          type='file'
          onChange={inputChangeHandler}
        />
      </div>

      <div className={styles.Images}>
        <div className={styles.Column}>
          {oddArr.map((el, i) => {
            return (
              <div
                key={'odd' + i}
                className={[
                  styles.ImageContainer,
                  el.type === 'svg' ? 'isSvg' : null,
                ].join(' ')}
              >
                <img
                  className={[
                    styles.Image,
                    el.type === 'svg' ? 'isSvg' : null,
                  ].join(' ')}
                  src={el.src}
                  alt='asset'
                />
              </div>
            );
          })}
        </div>
        <div className={styles.Column}>
          {evenArr.map((el, i) => {
            return (
              <div
                key={'even' + i}
                className={[
                  styles.ImageContainer,
                  el.type === 'svg' ? 'isSvg' : null,
                ].join(' ')}
              >
                <img
                  className={[
                    styles.Image,
                    el.type === 'svg' ? 'isSvg' : null,
                  ].join(' ')}
                  src={el.src}
                  alt='asset'
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ImageDropdown;
