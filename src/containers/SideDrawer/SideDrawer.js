import React, { useState, useEffect, useCallback, useRef } from 'react';
import styles from './SideDrawer.module.css';
import close from '../../assets/close.svg';

const SideDrawer = ({ isSideDrawer, setIsSideDrawer }) => {
  const [canvasArr, setCanvasArr] = useState([]);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [sideDrawerStyles, setSideDrawerStyles] = useState([styles.SideDrawer]);
  const sideDrawerRef = useRef(null);

  const createCanvas = useCallback((arr) => {
    let canvas = (
      <canvas className={styles.DesignPage} id={'canvas' + arr.length} />
    );
    // let ctx = canvas.getContext('2d');
    setCanvasArr((prevState) => [...prevState, canvas]);
    // setCtxArr((prevState) => [...prevState, ctx]);
  }, []);

  const closeHandler = () => {
    setIsSideDrawer(false);
  };
  if (isSideDrawer) sideDrawerStyles.push(styles.Open);
  useEffect(() => {
    if (isFirstLoad) {
      setIsFirstLoad(false);
      createCanvas(canvasArr);
    }
  }, [isFirstLoad, createCanvas, canvasArr]);

  useEffect(() => {
    if (isSideDrawer) {
      sideDrawerRef.current.classList.add(styles.Open);
    } else {
      sideDrawerRef.current.classList.remove(styles.Open);
    }
  }, [isSideDrawer]);

  return (
    <div className={styles.SideDrawer} ref={sideDrawerRef}>
      <div className={styles.Header}>
        <p className={styles.HeaderText}>Pages</p>
        <div className={styles.CloseContainer} onClick={closeHandler}>
          <img className={styles.Close} src={close} alt='close' />
        </div>
      </div>
      <div className={styles.PagesContainer}>
        {canvasArr.map((el) => {
          return (
            <div className={styles.PageContainer} key={el.props.id}>
              <div className={styles.DesignPageContainer}>{el}</div>
              <div className={styles.IndexContainer}>
                <p className={styles.PageIndex}>{canvasArr.length}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SideDrawer;
