import WebFont from 'webfontloader';

export const loadAndUse = (canvas, text, font) => {
  WebFont.load({
    google: {
      families: [font],
    },
    timeout: 5000,
    fontactive: (familyName, fvd) => {
      text.set({ fontFamily: familyName });
      canvas.requestRenderAll();
    },
  });
};

export const updateTextStyle = (state, canvas, dispatch) => {
  if (state.currentObject.type === 'text' && state.textState) {
    state.currentObject.object._clearCache();
    for (const [key, value] of Object.entries(state.textState)) {
      if (key !== 'fontFamily') {
        state.currentObject.object.set(key, value);
      }
    }
    loadAndUse(canvas, state.currentObject.object, state.textState.fontFamily);
  }
  dispatch({ type: 'setShouldUpdateText', data: false });
};
