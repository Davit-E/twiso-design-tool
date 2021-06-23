import { useCallback, useEffect, useState, useRef, useContext } from 'react';
import EventContext from '../../../contexts/EventContext';
import {
  onCreated,
  onModified,
  onCleared,
  onUpdated,
  onTextEnter,
  onTextExit,
} from './utils/onCanvasEvents';

const removeListeners = (c) => {
  c.off('selection:created');
  c.off('selection:updated');
  c.off('selection:cleared');
  c.off('object:modified');
  c.off('object:rotating');
  c.off('object:rotated');
  c.off('object:scaling');
  c.off('object:scaled');
  c.off('object:skewing');
  c.off('object:skewed');
  c.off('object:moved');
  c.off('text:editing:entered');
  c.off('text:editing:exited');
};

const useSelectionObserver = (isCanvasSet, canvas, state, dispatch) => {
  const { eventState, eventDispatch } = useContext(EventContext);
  const [isRotating, setIsRotating] = useState(false);
  const [isScaling, setIsScaling] = useState(false);
  const [isSkewing, setIsSkewing] = useState(false);
  const [isEditingText, setIsEditingText] = useState(false);
  const isFirstLoad = useRef(true);
  const currentId = useRef(null);

  const addListeners = useCallback(
    (c, dispatch, showCanvasToolbar) => {
      c.on('text:editing:entered', (e) => onTextEnter(e, c, setIsEditingText));
      c.on('text:editing:exited', (e) => onTextExit(e, c, setIsEditingText));
      c.on('selection:created', (e) =>
        onCreated(e, dispatch, showCanvasToolbar)
      );
      c.on('selection:updated', (e) => onUpdated(e, dispatch));
      c.on('object:modified', (e) => onModified(e, dispatch));
      c.on('selection:cleared', (e) => onCleared(e, dispatch, currentId));
      c.on('object:rotating', () => setIsRotating(true));
      c.on('object:rotated', () => setIsRotating(false));
      c.on('object:scaling', () => setIsScaling(true));
      c.on('object:scaled', () => setIsScaling(false));
      c.on('object:skewing', () => setIsSkewing(true));
      c.on('object:skewed', () => setIsSkewing(false));
      c.on('object:moved', () =>
        eventDispatch({ type: 'setIsMoving', data: false })
      );
    },
    [eventDispatch]
  );

  useEffect(() => {
    if (isCanvasSet) {
      if (!state.isCropMode) {
        addListeners(canvas, dispatch, state.showCanvasToolbar);
      } else removeListeners(canvas);
    }
    return () => {
      if (isCanvasSet) removeListeners(canvas);
    };
  }, [
    dispatch,
    isCanvasSet,
    canvas,
    addListeners,
    state.isCropMode,
    state.showCanvasToolbar,
  ]);

  useEffect(() => {
    if (!isFirstLoad.current) {
      let data = true;
      if (
        isRotating ||
        isScaling ||
        isSkewing ||
        eventState.isMoving ||
        isEditingText ||
        !state.currentCoords
      )
        data = false;
      dispatch({ type: 'setShowToolbar', data });
    }
  }, [
    eventState,
    isRotating,
    isScaling,
    isSkewing,
    isEditingText,
    state.isCropMode,
    state.currentCoords,
    dispatch,
  ]);

  useEffect(() => {
    if (!isFirstLoad.current) {
      if (!state.currentCoords) {
        dispatch({ type: 'setShowToolbar', data: false });
      } else if (
        state.currentObject.object &&
        state.currentObject.object.id !== currentId.current
      ) {
        currentId.current = state.currentObject.object.id;
        dispatch({ type: 'setShowToolbar', data: true });
      }
    } else isFirstLoad.current = false;
  }, [
    state.currentCoords,
    state.currentObject.object,
    dispatch,
    state.isCropMode,
  ]);
};

export default useSelectionObserver;
