import React, { useContext } from 'react';
import styles from './Backdrop.module.css';
import AppContext from '../../contexts/AppContext';

const Backdrop = (props) => {
  const { appState, appDispatch } = useContext(AppContext);

  const clickHandler = () => {
    let actionType = '';
    if (appState.isImageDropdown) actionType = 'setIsImageDropdown';
    else if (appState.isShapeDropdown) actionType = 'setIsShapeDropdown';
    else if (appState.shouldReplaceImage) actionType = 'setShouldReplaceImage';
    else if (appState.shouldAddCanvasBgImage)
      actionType = 'setShouldAddCanvasBgImage';
    appDispatch({ type: actionType, data: false });
  };

  return (
    <div className={styles.Backdrop} onClick={clickHandler}>
      {props.children}
    </div>
  );
};
export default Backdrop;
