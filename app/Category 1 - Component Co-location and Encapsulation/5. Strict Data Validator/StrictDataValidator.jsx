/**
 * CHALLENGE: Defensive Asynchronicity - Strict Data Validator
 *
 * Now that you've mastered the cleanup side of useEffect, we pivot back to the
 * core flow control issue you struggled with previously: Defensive Coding
 * (try...catch) for all failure modes.
 *
 * This challenge strictly isolates the try...catch primitive and the Type/Value
 * Fidelity primitive. Cleanup is not required here, so you can ignore the
 * useEffect cleanup function.
 */

/**
 * Challenge 2: The Strict Data Validator
 *
 * Create a single component named StrictValidator. This component must perform
 * a mock fetch on mount and demonstrate robust error handling for two distinct
 * failure types:
 *
 * 1. Network Failure (Promise Rejection): A 30% chance the mock API fails
 *    entirely (sends the flow to the catch block).
 *
 * 2. Data Failure (Resolved Bad Status): A 70% chance the mock API succeeds
 *    network-wise (resolves), but the returned data contains a statusCode
 *    that is not 200 (e.g., 500).
 *
 * TASK REQUIREMENTS:
 * - Use three status states: loading, success, and error
 * - Define a mockFetchData function (outside the component) that returns a Promise
 * - 70% of the time, it resolves with a statusCode: 500 or statusCode: 200 object
 * - 30% of the time, it calls reject
 * - Inside your useEffect, use a try...catch block
 * - If the promise resolves, you MUST check response.statusCode
 * - If it's not 200, you MUST manually throw new Error(...), forcing the flow
 *   into the catch block
 * - Ensure the catch block handles both the promise rejection (type 1) and your
 *   custom thrown error (type 2) by setting the error state
 */

import { useState, useEffect } from "react";

const StrictDataValidator = function () {
  const [status, setStatus] = useState("loading");
  const [data, setData] = useState(null);

  const mockFetch = async function () {
    return new Promise((res, rej) => {
      const timer = setTimeout(() => {
        const chance = Math.random();
        if (chance >= 0.7) {
          const chance2 = Math.random();
          chance2 >= 0.5
            ? res({ statusCode: 500 })
            : res({
                statusCode: 200,
                data: [
                  { items: 5, brand: "ok brand" },
                  { items: 3, brand: "also ok brand" },
                  { items: 7, brand: "also another ok brand" },
                ],
              });
        } else {
          rej("Network error!!!");
        }
      }, 1500);
      // clearTimeout(timer);
    });
  };

  useEffect(() => {
    mockFetch()
      .then((res) => {
        console.log(res);
        if (res.statusCode === 200) {
          setStatus("success");
          // would also unpack response object, res.json() /w another then() and promise consume if it was fetch api
          setData(res.data);
        } else {
          setStatus("Error. Server responded with 500.");
        }
      })
      .catch((err) => {
        setStatus(`error`);
        setData(err);
      });
  }, []);

  return (
    <div className="h-screen w-screen grid place-content-center">
      {status === "loading" && <p>Loading...</p>}
      {status === "error" && <p>{data}</p>}
      {status === "success" && (
        <div>
          <p>Success</p>
          <div>{}</div>
        </div>
      )}
    </div>
  );
};

export default StrictDataValidator;
