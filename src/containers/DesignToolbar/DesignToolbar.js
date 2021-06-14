import React, { useState } from 'react';
import styles from './DesignToolbar.module.css';
import downArrow from '../../assets/downArrow.svg';
import currentPage from '../../assets/currentPage.svg';
import addPage from '../../assets/addPage.svg';
import ResizeDropdown from './ResizeDropdown/ResizeDropdown';

const DesignToolbar = ({setIsSideDrawer}) => {
  const [isResizeDropdown, setIsResizeRopdown] = useState(false);

  const clickHandler = (e) => {
    let id = e.currentTarget.id;
    if (id === 'resize') {
      setIsResizeRopdown((prevState) => !prevState);
    } else if (id === 'addPage') {
      setIsSideDrawer(prevState => !prevState);
    }
  };

  return (
    <div className={styles.DesignToolbar}>
      <div className={styles.ZoomContainer}>
        <div className={styles.ZoomInputContainer}>
          <input className={styles.ZoomInput} type='number' />
          <p className={styles.ZoomInputPercent}>%</p>
        </div>

        <div className={styles.ZoomInputArrowContainer} id='zoom'>
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
      <div className={styles.CurrentPageContainer} id='currentPage'>
        <img
          className={styles.CurrentPageImage}
          src={currentPage}
          alt='current page'
        />
        <p className={styles.CurrentPage}>1</p>
      </div>
      <div className={styles.BorderDiv}></div>
      <div className={styles.AddPageContainer} id='addPage' onClick={clickHandler}>
        <img className={styles.AddPage} src={addPage} alt='add page' />
      </div>
      {isResizeDropdown ? <ResizeDropdown /> : null}
    </div>
  );
};

export default DesignToolbar;
