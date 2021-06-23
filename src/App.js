import React from 'react';
import styles from './App.module.css';
import DesignTool from './containers/DesignTool/DesignTool';
import AppContext from './contexts/AppContext';
import useAppState from './hooks/useAppState';

const App = () => {
  const [appState, appDispatch] = useAppState();
  // console.log(appState);

  return (
    <div className={styles.App}>
      <AppContext.Provider value={{appState, appDispatch}}>
        <DesignTool />
      </AppContext.Provider>
    </div>
  );
};

export default App;
