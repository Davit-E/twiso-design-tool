import React from 'react';
import styles from './DesignTool.module.css';
import Navigation from '../Navigation/Navigation';
import Canvas from '../Canvas/Canvas';

const DesignTool = () => {
  return (
    <div className={styles.DesignTool}>
      <Navigation />
      <Canvas />
    </div>
  );
};

export default DesignTool;
