import { useEffect, useState } from 'react';

const deleteHandler = (canvas) => {
  canvas.getActiveObjects().forEach((obj) => {
    canvas.remove(obj);
  });
  canvas.discardActiveObject().requestRenderAll();
};

const copyHandler = (canvas, setObjects, setIsCopying) => {
  // let _clipboard = null;
  // let active = canvas.getActiveObject();
  // if (active) {
  //   active.clone((cloned) => (_clipboard = cloned));
  //   console.log(_clipboard);
  //   setObjects(_clipboard);
  // }
  setTimeout(() => {
    setIsCopying(false);
  }, 1000);
};

const pasteHandler = (canvas, objects, setObjects, setIsPasting) => {
  setTimeout(() => {
    setIsPasting(false);
  }, 1000);
};

const keyDownHandler = (
  e,
  canvas,
  isPasting,
  setIsPasting,
  isCopying,
  setIsCopying
) => {
  if (canvas) {
    switch (e.keyCode) {
      case 46:
        deleteHandler(canvas);
        break;
      case 67:
        if (e.ctrlKey) {
          e.preventDefault();
          // if (!isCopying) setIsCopying(true);
        }
        break;
      case 86:
        if (e.ctrlKey) {
          e.preventDefault();
          // if (!isPasting) setIsPasting(true);
        }
        break;

      default:
        break;
    }
  }
};

const useKeyDownEvents = (canvas) => {
  const [objects, setObjects] = useState(null);
  const [isPasting, setIsPasting] = useState(false);
  const [isCopying, setIsCopying] = useState(false);
  useEffect(() => {
    document.addEventListener('keydown', (e) =>
      keyDownHandler(
        e,
        canvas,
        isPasting,
        setIsPasting,
        isCopying,
        setIsCopying
      )
    );
    return () => document.removeEventListener('keydown', () => {});
  }, [canvas, objects, isPasting, isCopying]);

  useEffect(() => {
    if (isPasting) {
      pasteHandler(canvas, objects, setObjects, setIsPasting);
    }
  }, [canvas, objects, isPasting]);
  useEffect(() => {
    if (isPasting) {
      pasteHandler(canvas, objects, setObjects, setIsPasting);
    } else if (isCopying) {
      copyHandler(canvas, setObjects, setIsCopying)
    }
  }, [canvas, objects, isPasting, isCopying]);
};

export default useKeyDownEvents;
