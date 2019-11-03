import { useState } from 'react';

const useModal = () => {
  const [isShowing, setIsShowing] = useState(false);

  function hide() {
    setIsShowing(false);
  }

  function show() {
    setIsShowing(true);
  }

  return {
    isShowing,
    hide,
    show
  }
};

export default useModal;