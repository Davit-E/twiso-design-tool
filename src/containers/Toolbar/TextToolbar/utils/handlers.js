export const colorChangeCompleteHandler = (c, ref, dispatch) => {
  let colorString = `rgba(${c.rgb.r}, ${c.rgb.g}, ${c.rgb.b}, ${c.rgb.a})`;
  dispatch({ type: 'setTextFill', data: colorString });
  ref.current.style.background = colorString;
};

export const handleClick = (e, dropdownHandlers, styleHandlers) => {
  if (e.currentTarget.id === 'bold' || e.currentTarget.id === 'italic') {
    styleHandlers[e.currentTarget.id]();
  }
  for (let [id, handler] of Object.entries(dropdownHandlers)) {
    if (id === e.currentTarget.id) handler((prevState) => !prevState);
    else handler(false);
  }
};

export const fontSizeChangeHandler = (e, setFontSizeInput, dispatch) => {
  setFontSizeInput(e.target.value);
  let data = +e.target.value;
  if (data <= 0) data = 1;
  else if (data > 1080) data = 1080;
  dispatch({ type: 'setFontSize', data });
};
