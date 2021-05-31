const textPropertyArr = [
  'fontFamily',
  'fontStyle',
  'fontWeight',
  'fontSize',
  'fill',
  'textAlign',
];

const handleText = (options, dispatch, object) => {
  let newTextState = {};
  textPropertyArr.forEach((property) => {
    newTextState[property] = options.target[property];
  });
  dispatch({ type: 'setTextState', data: newTextState });
  object.type = 'text';
};

export const handleSelected = (options, dispatch) => {
  let currentObject = { type: '', object: null };
  dispatch({ type: 'setIsSelection', data: true });
  if (options.target.type === 'activeSelection') {
    dispatch({ type: 'setCurrentObject', data: currentObject });
    return;
  }
  if (options.target.type === 'textbox') {
    handleText(options, dispatch, currentObject);
  } else if (options.target.type === 'image') {
    currentObject.type = 'image';
  } else {
    currentObject.type = 'shape';
  }
  currentObject.object = options.target;
  dispatch({ type: 'setCurrentObject', data: currentObject });
};
