export const initialLoadHandler = (
  isLine,
  shapeState,
  setIsFirstLoad,
  setFill,
  fillRef,
  strokeContainerRef,
  setStroke,
  strokeRef
) => {
  setIsFirstLoad(false);
  if (!isLine) {
    let [r, g, b, a] = shapeState.fill.split('(')[1].split(')')[0].split(',');
    setFill({ r, g, b, a });
    fillRef.current.style.background = shapeState.fill;
  } else {
    strokeContainerRef.current.style.borderTopLeftRadius = '15px';
    strokeContainerRef.current.style.borderBottomLeftRadius = '15px';
  }
  let [r, g, b, a] = shapeState.stroke.split('(')[1].split(')')[0].split(',');
  setStroke({ r, g, b, a });
  strokeRef.current.style.background = shapeState.stroke;
};

export const fillChangeCompleteHandler = (c, dispatch, fillRef) => {
  let colorString = `rgba(${c.rgb.r}, ${c.rgb.g}, ${c.rgb.b}, ${c.rgb.a})`;
  dispatch({ type: 'setShapeFill', data: colorString });
  fillRef.current.style.background = colorString;
};

export const strokeChangeCompleteHandler = (c, dispatch, strokeRef) => {
  let colorString = `rgba(${c.rgb.r}, ${c.rgb.g}, ${c.rgb.b}, ${c.rgb.a})`;
  dispatch({ type: 'setShapeStroke', data: colorString });
  strokeRef.current.style.background = colorString;
};

export const strokeWidthChangeHandler = (
  e,
  dispatch,
  setStrokeWidthInput,
  isLine
) => {
  setStrokeWidthInput(e.target.value);
  let data = +e.target.value;
  if (isLine && data <= 0) data = 1;
  else if (isLine && data > 50) data = 50;
  else if (!isLine && data > 120) data = 120;
  else if (!isLine && data < 0) data = 0;
  dispatch({ type: 'setShapeStrokeWidth', data });
};

export const handleClick = (
  e,
  setIsFillDropdown,
  setIsStrokeDropdown,
  setIsStrokeWidthDropdown
) => {
  let clicked = e.currentTarget.id;
  if (clicked === 'fill') {
    setIsFillDropdown((prevState) => !prevState);
    setIsStrokeDropdown(false);
    setIsStrokeWidthDropdown(false);
  } else if (clicked === 'stroke') {
    setIsStrokeDropdown((prevState) => !prevState);
    setIsFillDropdown(false);
    setIsStrokeWidthDropdown(false);
  } else {
    setIsStrokeWidthDropdown((prevState) => !prevState);
    setIsFillDropdown(false);
    setIsStrokeDropdown(false);
  }
};
