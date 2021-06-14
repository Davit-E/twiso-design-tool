export const updateShapeStyle = (state, canvas, dispatch) => {
  if (state.shapeState) {
    // state.currentObject.object._clearCache();
    for (const [key, value] of Object.entries(state.shapeState)) {
      state.currentObject.object.set(key, value);
    }
    if (!state.showToolbar) dispatch({ type: 'setShowToolbar', data: true });
    canvas.requestRenderAll();
  }
  dispatch({ type: 'setShouldUpdateShape', data: false });
};
