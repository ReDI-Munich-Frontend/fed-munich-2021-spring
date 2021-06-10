function fetchAndRetry(url, retryTimes) {
  return new Promise(async (resolve, reject) => {
    if (retryTimes <= 0) {
      reject("retryTimes must be greater than 0");
      return;
    }

    let tries = 0;
    let done = false;

    while (!done) {
      await fetch(url)
        .then((...args) => {
          done = true;
          resolve(...args);
        })
        .catch((...args) => {
          tries++;

          if (tries >= retryTimes) {
            reject(...args);
            done = true;
          }
        });
    }
  });
}

