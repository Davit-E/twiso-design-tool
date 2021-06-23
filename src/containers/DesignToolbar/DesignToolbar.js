import React, { useContext, useState, useEffect } from 'react';
import styles from './DesignToolbar.module.css';
import downArrow from '../../assets/downArrow.svg';
import currentPage from '../../assets/currentPage.svg';
import addPage from '../../assets/addPage.svg';
import ResizeDropdown from './ResizeDropdown/ResizeDropdown';
import ZoomDropdown from './ZoomDropdown/ZoomDropdown';
import AppContext from '../../contexts/AppContext';
import Backdrop from '../../components/Backdrop/Backdrop';

const DesignToolbar = ({ isSideDrawer, setIsSideDrawer, сurrentCanvasId }) => {
  const { appState, appDispatch } = useContext(AppContext);
  const [zoomInput, setZoomInput] = useState(100);
  const clickHandler = (e) => {
    if (!appState.shouldCropImage) {
      if (appState.isCropMode) {
        appDispatch({ type: 'setIsCropMode', data: false });
      }
      let id = e.currentTarget.id;
      if (id === 'resize') {
        if (isSideDrawer) setIsSideDrawer(false);
        appDispatch({ type: 'setIsResizeDropdown', data: true });
      } else if (id === 'currentPage') {
        setIsSideDrawer((prevState) => !prevState);
      } else if (id === 'addPage') {
        if (isSideDrawer) setIsSideDrawer(false);
        appDispatch({ type: 'setShouldAddCanvas', data: true });
      } else if (id === 'zoom') {
        if (isSideDrawer) setIsSideDrawer(false);
        appDispatch({ type: 'setIsZoomDropdown', data: true });
      }
    }
  };

  const inputChangeHandler = (e) => {
    if (!appState.shouldCropImage) {
      if (appState.isCropMode) {
        appDispatch({ type: 'setIsCropMode', data: false });
      }
      if (isSideDrawer) setIsSideDrawer(false);
      if (e.target.value !== '') {
        let value = +e.target.value;
        if (value < 10) value = 10;
        else if (value > 300) value = 300;
        value = value / 100;
        let data = {
          width: appState.canvasState.width,
          height: appState.canvasState.height,
          zoom: value,
        };
        appDispatch({ type: 'setCanvasSize', data });
      }
    }
  };

  useEffect(() => {
    setZoomInput(appState.canvasState.zoom * 100);
  }, [appState.canvasState.zoom]);

  return (
    <div className={styles.DesignToolbar}>
      <div className={styles.ZoomContainer}>
        <div className={styles.ZoomInputContainer}>
          <input
            className={styles.ZoomInput}
            type='number'
            value={zoomInput}
            onChange={(e) => setZoomInput(e.target.value)}
            onBlur={inputChangeHandler}
          />
          <p className={styles.ZoomInputPercent}>%</p>
        </div>

        <div
          className={styles.ZoomInputArrowContainer}
          id='zoom'
          onClick={clickHandler}
        >
          <img className={styles.DownArrow} src={downArrow} alt='arrow' />
        </div>
      </div>
      <div className={styles.BorderDiv}></div>
      <div
        className={styles.ResizeContainer}
        id='resize'
        onClick={clickHandler}
      >
        <p className={styles.Resize}>Resize</p>
      </div>
      <div className={styles.BorderDiv}></div>
      <div
        className={styles.CurrentPageContainer}
        id='currentPage'
        onClick={clickHandler}
      >
        <img
          className={styles.CurrentPageImage}
          src={currentPage}
          alt='current page'
        />
        <p className={styles.CurrentPage}>
          {сurrentCanvasId.split('canvas')[1]}
        </p>
      </div>
      <div className={styles.BorderDiv}></div>
      <div
        className={styles.AddPageContainer}
        id='addPage'
        onClick={clickHandler}
      >
        <img className={styles.AddPage} src={addPage} alt='add page' />
      </div>
      {appState.isResizeDropdown ? (
        <Backdrop>
          <ResizeDropdown state={appState.canvasState} dispatch={appDispatch} />
        </Backdrop>
      ) : null}
      {appState.isZoomDropdown ? (
        <Backdrop>
          <ZoomDropdown state={appState.canvasState} dispatch={appDispatch} />
        </Backdrop>
      ) : null}
    </div>
  );
};

export default DesignToolbar;
