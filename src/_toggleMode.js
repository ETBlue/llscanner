export default (current, mode1, mode2) => {

    let mode;

    if (current === mode1) {
      mode = mode2;
    } else {
      mode = mode1;
    };

    return mode;

};
