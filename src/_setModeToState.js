export default (currentMode, stateMode, currentVisibilitySettings, modeSettings) => {
  if (currentMode !== stateMode ) {
    Object.keys(currentVisibilitySettings).forEach((key) => {
      currentVisibilitySettings[key] = "hidden";
    });
    modeSettings[currentMode].forEach((item) => {
      currentVisibilitySettings[item] = "visible";
    });
    return {
      mode: currentMode,
      visibility: currentVisibilitySettings
    };
  }
};
