/**
 * This function behaves exactly like fetch(...), except that in case of failed requests, it automatically retries the request a given number of times.
 */
function fetchAndRetry(url, tries) {
  return new Promise(async (resolve, reject) => {
    // It has to try at least once to succeed
    if (tries <= 0) {
      reject("tries must be greater than 0");
      return;
    }

    let triesDone = 0;
    let done = false;

    while (!done) {
      // Without 'await', the while loop will continue before the fetch call completes.
      await fetch(url)
        .then((arg) => {
          done = true;
          // Once done, let the caller handle the response
          resolve(arg);
        })
        .catch((arg) => {
          triesDone++;

          if (triesDone >= tries) {
            // Once the maximum number of tries is reached, let the caller handle the error
            reject(arg);
            done = true;
          }
        });
    }
  });
}

