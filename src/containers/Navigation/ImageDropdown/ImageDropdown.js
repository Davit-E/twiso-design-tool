import React, { useContext, useRef } from 'react';
import styles from './ImageDropdown.module.css';
import AppContext from '../../../contexts/AppContext';

const ImageDropdown = ({ close, setUserFiles, userFiles }) => {
  const { appDispatch } = useContext(AppContext);
  const fileInput = useRef(null);
  const clickHandler = (e) => {
    if (e.target.tagName === 'IMG') {
      appDispatch({ type: 'setImageToAdd', data: e.target });
      close();
    } else if (e.target.classList.contains(styles.ImageContainer)) {
      appDispatch({ type: 'setImageToAdd', data: e.target.childNodes[0] });
      close();
    }
  };
  const inputChangeHandler = () => {
    if (fileInput.current.files[0]) {
      let file = fileInput.current.files[0];
      setUserFiles((prevSate) => [URL.createObjectURL(file), ...prevSate]);
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
          accept='image/png, image/gif, image/jpeg'
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
              <div key={'odd' + i} className={styles.ImageContainer}>
                <img className={styles.Image} src={el} alt='' />
              </div>
            );
          })}
        </div>
        <div className={styles.Column}>
          {evenArr.map((el, i) => {
            return (
              <div key={'even' + i} className={styles.ImageContainer}>
                <img className={styles.Image} src={el} alt='' />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ImageDropdown;
