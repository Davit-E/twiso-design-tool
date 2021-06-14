import React, { useState } from 'react';
import styles from './DesignTool.module.css';
import Navigation from '../Navigation/Navigation';
import Canvas from '../Canvas/Canvas';
import DesignToolbar from '../DesignToolbar/DesignToolbar';
import SideDrawer from '../SideDrawer/SideDrawer';

const DesignTool = () => {
  const [canvas, setCanvas] = useState(null);
  const [isSideDrawer, setIsSideDrawer] = useState(false);

  return (
    <div className={styles.DesignTool}>
      <Navigation canvas={canvas} />
      <main className={styles.Main}>
        <Canvas canvas={canvas} setCanvas={setCanvas} />
        <SideDrawer
          isSideDrawer={isSideDrawer}
          setIsSideDrawer={setIsSideDrawer}
        />
        <DesignToolbar setIsSideDrawer={setIsSideDrawer} />
      </main>
    </div>
  );
};

export default DesignTool;
