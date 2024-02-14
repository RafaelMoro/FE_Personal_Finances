import { useState } from 'react';

/*
* This hook is to have all the logic needed to use AnimateBox component.
* counterView is the counter of the pages or views rendered.
* direction is to have track if you want the previous or the next view.
*   For the next view, it will slide to right.
*   For the previous view, it will slide to left.
* goNextView is the fn to change to the next view.
* goPreviousView is the fn to go to the previous view.
*/

const useAnimateBox = () => {
  const [[counterView, direction], setCounterView] = useState([0, 0]);

  const paginate = (newDirection: number) => {
    setCounterView((prevState) => [prevState[counterView] + newDirection, newDirection]);
  };

  const getFinalResult = () => setCounterView([3, 1]);

  const resetCounterView = () => setCounterView([0, 0]);

  const goPreviousView = () => {
    // Giving -1 to paginate means slide to left and get to the last view.
    paginate(-1);
  };

  const goNextView = () => {
    // Giving 1 to paginate means slide to right and get to the next view.
    paginate(1);
  };

  return {
    counterView, direction, goNextView, goPreviousView, resetCounterView, getFinalResult,
  };
};

export { useAnimateBox };
