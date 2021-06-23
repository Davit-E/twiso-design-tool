import React, { useState } from 'react';
import styles from './DesignTool.module.css';
import Navigation from '../Navigation/Navigation';
import Canvas from '../Canvas/Canvas';
import DesignToolbar from '../DesignToolbar/DesignToolbar';
import SideDrawer from '../SideDrawer/SideDrawer';
import EventContext from '../../contexts/EventContext';
import useEventState from '../../hooks/useEventsState';
const DesignTool = () => {
  const [eventState, eventDispatch] = useEventState();
  const [canvas, setCanvas] = useState(null);
  const [isSideDrawer, setIsSideDrawer] = useState(false);
  const [fabricCanvasArr, setFabricCanvasArr] = useState([]);
  const [сurrentCanvasId, setCurrentCanvasId] = useState('');

  return (
    <div className={styles.DesignTool}>
      <Navigation canvasArr={fabricCanvasArr} />
      <main className={styles.Main}>
        <EventContext.Provider value={{ eventState, eventDispatch }}>
          <Canvas
            canvas={canvas}
            setCanvas={setCanvas}
            setFabricCanvasArr={setFabricCanvasArr}
            сurrentCanvasId={сurrentCanvasId}
            setCurrentCanvasId={setCurrentCanvasId}
          />
        </EventContext.Provider>

        <SideDrawer
          currentCanvas={canvas}
          fabricCanvasArr={fabricCanvasArr}
          isSideDrawer={isSideDrawer}
          setIsSideDrawer={setIsSideDrawer}
          сurrentCanvasId={сurrentCanvasId}
          setCanvas={setCanvas}
          setCurrentCanvasId={setCurrentCanvasId}
        />
        <DesignToolbar
          isSideDrawer={isSideDrawer}
          setIsSideDrawer={setIsSideDrawer}
          сurrentCanvasId={сurrentCanvasId}
        />
      </main>
    </div>
  );
};

export default DesignTool;
