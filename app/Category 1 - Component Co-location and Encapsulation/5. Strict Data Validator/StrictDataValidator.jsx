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

const mockData = {
  data: [
    { items: 5, brand: "ok brand" },
    { items: 3, brand: "other ok brand" },
  ],
};

const StrictDataValidator = function () {
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const fetchMockData = async function () {
    let timer;
    console.log("fetch");
    try {
      const chance70 = Math.random() < 0.7;

      const fetchPromise = new Promise((resolve, reject) => {
        timer = setTimeout(() => {
          if (chance70) {
            resolve({ status: 500, data: mockData });
          }
          reject(new Error({ message: "Bad request" }));
        }, 1500);
      });
      clearTimeout(timer);
      return fetchPromise;
    } catch (err) {
      clearTimeout(timer);
      console.log(err);
      return err;
    }
  };

  useEffect(() => {
    const fetch = async function () {
      console.log("wtf fetch");
      const fetchedData = await fetchMockData;
      if (fetchedData && fetchedData.status === 200 && fetchedData.data) {
        setData(fetchedData.data);
        setStatus("success");
      } else {
        console.log("errrrrrr");
        console.log(fetchedData);
        setError(fetchedData.error);
        setStatus("error");
      }
    };
    fetch();
  }, [status]);

  return (
    <div className="flex justify-center items-center h-screen w-screen">
      {status === "loading" && <h1>Loading...</h1>}
      {status === "error" && <h1>{error.message}</h1>}
      {data && <h1>Data is here: TODO fill in data access</h1>}
    </div>
  );
};

export default StrictDataValidator;
