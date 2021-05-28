/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useContext, useState } from 'react';
import styles from './Navigation.module.css';
import backArrow from '../../assets/backArrow.svg';
import addText from '../../assets/addText.svg';
import addImage from '../../assets/addImage.svg';
import addShape from '../../assets/addShape.svg';
import AppContext from '../../contexts/AppContext';
import ShapeDropdown from './ShapeDropdown/ShapeDropdown';
import ImageDropdown from './ImageDropdown/ImageDropdown';
import photo from '../../assets/photo.jpg';

const Navigation = () => {
  const { appDispatch } = useContext(AppContext);
  const [isShapeDropdown, setIsShapeDropdown] = useState(false);
  const [isImageDropdown, setisImageDropdown] = useState(false);
  const [userFiles, setUserFiles] = useState([photo]);

  const addTextHandler = () => {
    appDispatch({ type: 'setShouldAddText', data: true });
    setIsShapeDropdown(false);
    setisImageDropdown(false);
  };
  
  const addShapeClickedHandler = () => {
    setIsShapeDropdown((prevState) => !prevState);
    setisImageDropdown(false);
  };

  const addImageClickedHandler = () => {
    setisImageDropdown((prevState) => !prevState);
    setIsShapeDropdown(false);
  };

  return (
    <header className={styles.Navigation}>
      <div className={styles.BackFileInfoContainer}>
        <img className={styles.BackArrow} src={backArrow} alt='back' />
        <div className={styles.FileInfoContainer}>
          <p className={styles.FileName}>File Name</p>
          <p className={styles.Creater}>Creater name</p>
        </div>
      </div>
      <div className={styles.DesignControlsContainer}>
        <div className={styles.AddTextContainer} onClick={addTextHandler}>
          <img src={addText} alt='add text' />
          <div className={styles.HoverContent}>
            <div className={styles.HoverTriangle}></div>
            <p className={styles.HoverText}>Add text</p>
          </div>
        </div>
        <div className={styles.DesignControl}>
          <div
            className={styles.AddImageContainer}
            onClick={addImageClickedHandler}
          >
            <img src={addImage} alt='add image' />
            <div className={styles.HoverContent}>
              <div className={styles.HoverTriangle}></div>
              <p className={styles.HoverText}>Add image</p>
            </div>
          </div>

          {isImageDropdown ? (
            <div className={styles.ImageDropdown}>
              <ImageDropdown
                close={addImageClickedHandler}
                userFiles={userFiles}
                setUserFiles={setUserFiles}
              />
            </div>
          ) : null}
        </div>

        <div className={styles.DesignControl}>
          <div
            className={styles.AddShapeContainer}
            onClick={addShapeClickedHandler}
          >
            <img src={addShape} alt='add shape' />
            <div className={styles.HoverContent}>
              <div className={styles.HoverTriangle}></div>
              <p className={styles.HoverText}>Add shape</p>
            </div>
          </div>

          {isShapeDropdown ? (
            <div className={styles.ShapeDropdown}>
              <ShapeDropdown close={addShapeClickedHandler} />
            </div>
          ) : null}
        </div>
      </div>
      <div className={styles.DownloadUserInfoContainer}>
        <button className={styles.DownloadButton}>Download</button>
        <div className={styles.User}>
          <p className={styles.UserInitials}>DE</p>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
