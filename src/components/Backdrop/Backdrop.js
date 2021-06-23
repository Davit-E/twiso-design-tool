import React, { useContext } from 'react';
import styles from './Backdrop.module.css';
import AppContext from '../../contexts/AppContext';

const Backdrop = (props) => {
  const { appState, appDispatch } = useContext(AppContext);

  const clickHandler = (e) => {
    if (e.target.id === 'backdrop') {
      let actionType = '';
      if (appState.isImageDropdown) actionType = 'setIsImageDropdown';
      else if (appState.isShapeDropdown) actionType = 'setIsShapeDropdown';
      else if (appState.shouldReplaceImage)
        actionType = 'setShouldReplaceImage';
      else if (appState.isResizeDropdown) actionType = 'setIsResizeDropdown';
      else if (appState.isZoomDropdown) actionType = 'setIsZoomDropdown';
      else if (appState.shouldAddCanvasBgImage)
        actionType = 'setShouldAddCanvasBgImage';
      else if (appState.isDownloadDropdown)
        actionType = 'setIsDownloadDropdown';
      appDispatch({ type: actionType, data: false });
    }
  };

  return (
    <div className={styles.Backdrop} onClick={clickHandler} id='backdrop'>
      {props.children}
    </div>
  );
};
export default Backdrop;
