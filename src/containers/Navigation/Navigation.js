/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useContext, useState, useRef, useEffect } from 'react';
import styles from './Navigation.module.css';
import backArrow from '../../assets/backArrow.svg';
import addText from '../../assets/addText.svg';
import addImage from '../../assets/addImage.svg';
import addShape from '../../assets/addShape.svg';
import AppContext from '../../contexts/AppContext';
import ShapeDropdown from './ShapeDropdown/ShapeDropdown';
import ImageDropdown from './ImageDropdown/ImageDropdown';
import photo from '../../assets/photo.jpg';
import photo2 from '../../assets/photo2.jpg';
import Backdrop from '../../components/Backdrop/Backdrop';
import { fabric } from 'fabric';

const Navigation = ({ canvas }) => {
  const { appState, appDispatch } = useContext(AppContext);
  const [canvasToDownload, setCanvasToDownload] = useState(null);
  const [userFiles, setUserFiles] = useState([
    { src: photo, type: 'image' },
    { src: photo2, type: 'image' },
  ]);
  const donwloadRef = useRef(null);

  const addTextHandler = () => {
    appDispatch({ type: 'setShouldAddText', data: true });
  };

  const addShapeClickedHandler = () => {
    appDispatch({ type: 'setIsShapeDropdown', data: true });
  };

  const addImageClickedHandler = () => {
    appDispatch({ type: 'setIsImageDropdown', data: true });
  };

  const downloadClickHandler = () => {
    let newCanvas = new fabric.Canvas();
    let jsonCanvas = JSON.stringify(canvas);
    newCanvas.loadFromJSON(jsonCanvas);
    newCanvas.setDimensions({
      width: canvas.getWidth() * 2,
      height: canvas.getHeight() * 2,
    });
    newCanvas.setZoom(2);
    // let backgroundImg = canvas.backgroundImage;
    // if (backgroundImg) {
    //   let imgSrc = backgroundImg._element.currentSrc;
    //   fabric.Image.fromURL(
    //     imgSrc,
    //     newCanvas.requestRenderAll.bind(newCanvas),
    //     (img) => {
    //       newCanvas.setBackgroundImage(img, {
    //         top: backgroundImg.top,
    //         left: backgroundImg.left,
    //         originX: 'left',
    //         originY: 'top',
    //         scaleX: backgroundImg.scaleX,
    //         scaleY: backgroundImg.scaleY,
    //       });
    //     }
    //   );
    // }
    setCanvasToDownload(newCanvas);
  };

  const donwloadHandler = (c) => {
    c.getElement().toBlob((blob) => {
      donwloadRef.current.href = URL.createObjectURL(blob);
      donwloadRef.current.download = 'design.png';
      donwloadRef.current.click();
    });
    setCanvasToDownload(null);
  };

  useEffect(() => {
    if (canvasToDownload) {
      console.log(canvasToDownload);
      donwloadHandler(canvasToDownload);
    }
  }, [canvasToDownload]);

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

          {appState.isImageDropdown ||
          appState.shouldReplaceImage ||
          appState.shouldAddCanvasBgImage ? (
            <>
              <Backdrop />
              <div className={styles.ImageDropdown}>
                <ImageDropdown
                  userFiles={userFiles}
                  setUserFiles={setUserFiles}
                />
              </div>
            </>
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

          {appState.isShapeDropdown ? (
            <>
              <Backdrop />
              <div className={styles.ShapeDropdown}>
                <ShapeDropdown />
              </div>
            </>
          ) : null}
        </div>
      </div>
      <div className={styles.DownloadUserInfoContainer}>
        <button
          className={styles.DownloadButton}
          onClick={downloadClickHandler}
        >
          Download
        </button>
        <a className={styles.DownloadLink} ref={donwloadRef} href='/'>
          Download
        </a>
        <div className={styles.User}>
          <p className={styles.UserInitials}>DE</p>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
