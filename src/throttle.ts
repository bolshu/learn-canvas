const throttle = <T extends []>(cb: Function, wait: number) => {
  let isCalled = false;

  return (...args: T) => {
    if (!isCalled) {
      cb(...args);

      isCalled = true;

      setTimeout(() => {
        isCalled = false;
      }, wait);
    }
  };
};

export default throttle;
