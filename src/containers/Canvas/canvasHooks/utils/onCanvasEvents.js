const textPropertyArr = [
  'fontFamily',
  'fontStyle',
  'fontWeight',
  'fontSize',
  'fill',
  'opacity',
  'textAlign',
];

const shapePropertyArr = ['fill', 'stroke', 'strokeWidth'];
const imagePropertyArr = ['cornerRadius'];

const handleText = (e, dispatch) => {
  let newTextState = {};
  textPropertyArr.forEach((property) => {
    newTextState[property] = e.target[property];
  });
  dispatch({ type: 'setTextState', data: newTextState });
  return 'text';
};

const handleShape = (e, dispatch) => {
  let newShapeState = {};
  shapePropertyArr.forEach((property) => {
    newShapeState[property] = e.target[property];
  });
  dispatch({ type: 'setShapeState', data: newShapeState });
  return e.target.type;
};

const handleImage = (e, dispatch) => {
  let newImageState = {};
  imagePropertyArr.forEach((property) => {
    newImageState[property] = e.target[property];
  });
  dispatch({ type: 'setImageState', data: newImageState });
  return 'image';
};

const handleSelected = (e, dispatch) => {
  let obj = { type: '', object: null };
  if (e.target.type === 'activeSelection') {
    dispatch({ type: 'setCurrentObject', data: obj });
    return;
  }

  dispatch({ type: 'setCurrentCoords', data: e.target.lineCoords });
  if (e.target.type === 'textbox') obj.type = handleText(e, dispatch);
  else if (e.target.type === 'image') obj.type = handleImage(e, dispatch);
  else obj.type = handleShape(e, dispatch);
  obj.object = e.target;
  dispatch({ type: 'setCurrentObject', data: obj });
};

export const onCreated = (
  e,
  canvas,
  dispatch,
  setIsMoving,
  showCanvasToolbar
) => {
  console.log('created');
  if (showCanvasToolbar) {
    dispatch({ type: 'setShowCanvasToolbar', data: false });
  }
  if (e.target.type !== 'activeSelection') {
    e.target.on('moving', () => setIsMoving(true));
  }
  handleSelected(e, dispatch);
  let canvasJSON = JSON.stringify(canvas);
  sessionStorage.setItem('designCanvas', canvasJSON);
};

export const onCleared = (e, canvas, dispatch, currentId) => {
  console.log('cleared');
  currentId.current = null;

  if (e.deselected && e.deselected.length === 1) e.deselected[0].off('moving');

  dispatch({
    type: 'setCurrentObject',
    data: { type: '', object: null },
  });
  dispatch({
    type: 'setCurrentCoords',
    data: null,
  });
  let canvasJSON = JSON.stringify(canvas);
  sessionStorage.setItem('designCanvas', canvasJSON);
};

export const onModified = (e, canvas, dispatch) => {
  console.log('modified');
  handleSelected(e, dispatch);
  let canvasJSON = JSON.stringify(canvas);
  sessionStorage.setItem('designCanvas', canvasJSON);
};

export const onUpdated = (e, dispatch, setIsMoving) => {
  console.log('updated');
  dispatch({ type: 'setShowToolbar', data: false });
  if (e.deselected.length === 1) e.deselected[0].off('moving');
  handleSelected(e, dispatch);
  if (e.target.type !== 'activeSelection') {
    e.target.on('moving', () => setIsMoving(true));
  }
};

export const onTextEnter = (e, c, setIsEditingText) => {
  setIsEditingText(true);
  if (e.target.text === 'Add text‎') {
    e.target.text = '';
    e.target.hiddenTextarea.value = '';
    c.requestRenderAll();
  }
};

export const onTextExit = (e, c, setIsEditingText) => {
  setIsEditingText(false);
  if (e.target.text === '') e.target.text = 'Add text‎';
  c.requestRenderAll();
};
