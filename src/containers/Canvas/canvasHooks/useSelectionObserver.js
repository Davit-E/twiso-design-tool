import { useCallback, useEffect, useState, useRef } from 'react';
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
  const [isRotating, setIsRotating] = useState(false);
  const [isScaling, setIsScaling] = useState(false);
  const [isSkewing, setIsSkewing] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [isEditingText, setIsEditingText] = useState(false);
  const isFirstLoad = useRef(true);
  const currentId = useRef(null);

  const addListeners = useCallback((c, dispatch, showCanvasToolbar) => {
    c.on('text:editing:entered', (e) => onTextEnter(e, c, setIsEditingText));
    c.on('text:editing:exited', (e) => onTextExit(e, c, setIsEditingText));
    c.on('selection:created', (e) =>
      onCreated(e, c, dispatch, setIsMoving, showCanvasToolbar)
    );
    c.on('selection:updated', (e) => onUpdated(e, dispatch, setIsMoving));
    c.on('object:modified', (e) => onModified(e, c, dispatch));
    c.on('selection:cleared', (e) => onCleared(e, c, dispatch, currentId));
    c.on('object:rotating', () => setIsRotating(true));
    c.on('object:rotated', () => setIsRotating(false));
    c.on('object:scaling', () => setIsScaling(true));
    c.on('object:scaled', () => setIsScaling(false));
    c.on('object:skewing', () => setIsSkewing(true));
    c.on('object:skewed', () => setIsSkewing(false));
    c.on('object:moved', () => setIsMoving(false));
  }, []);

  useEffect(() => {
    if (isCanvasSet) {
      if (!state.isCroppingImage)
        addListeners(canvas, dispatch, state.showCanvasToolbar);
      else removeListeners(canvas);
    }
    return () => {
      if (isCanvasSet) removeListeners(canvas);
    };
  }, [
    dispatch,
    isCanvasSet,
    canvas,
    addListeners,
    state.isCroppingImage,
    state.showCanvasToolbar,
  ]);

  useEffect(() => {
    if (!isFirstLoad.current) {
      let data = true;
      if (
        isRotating ||
        isScaling ||
        isSkewing ||
        isMoving ||
        isEditingText ||
        state.isCroppingImage
      )
        data = false;
      dispatch({ type: 'setShowToolbar', data });
    }
  }, [
    isRotating,
    isScaling,
    isSkewing,
    isMoving,
    isEditingText,
    state.isCroppingImage,
    dispatch,
  ]);

  useEffect(() => {
    if (!isFirstLoad.current && !state.isCroppingImage) {
      if (!state.currentObject.object) {
        dispatch({ type: 'setShowToolbar', data: false });
      } else if (
        state.currentObject.object &&
        state.currentObject.object.id !== currentId.current
      ) {
        currentId.current = state.currentObject.object.id;
        dispatch({ type: 'setShowToolbar', data: true });
      }
    } else isFirstLoad.current = false;
  }, [state.currentObject.object, dispatch, state.isCroppingImage]);
};

export default useSelectionObserver;
