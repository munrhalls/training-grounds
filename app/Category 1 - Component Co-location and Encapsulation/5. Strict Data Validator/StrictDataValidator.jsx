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
  const [error, setError] = useState(null);

  const mockFetch = function () {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const chance = Math.random();

        if (chance <= 0.7) {
          const chance2 = Math.random();
          if (chance2 >= 0.5) {
            resolve({ statusCode: 500 });
          } else {
            resolve({
              statusCode: 200,
              data: [
                { items: 5, brand: "cool" },
                { items: 7, brand: "cool also" },
                { items: 8, brand: "cool as well" },
              ],
            });
          }
        } else {
          reject("Network error!!!");
        }
      }, 1500);
    });
  };

  useEffect(() => {
    const runFetch = async function () {
      try {
        const data = await mockFetch();
        if (data.statusCode !== 200) {
          throw Error("Error: Response status code 500");
        }
        setStatus("success");
        setData(data);
      } catch (err) {
        console.log(err);
        setStatus("error");
        setData(null);
        const errorMessage = err instanceof Error ? err.message : String(err);
        setError(errorMessage);
      }
    };
    runFetch();
  }, []);

  return (
    <div className="h-screen w-screen grid place-content-center">
      {status === "loading" && <p>Loading...</p>}
      {status === "success" && (
        <div className="text-blue-500">
          Data loaded successfully!{" "}
          <div className="block">
            {data.data.map((el) => {
              return (
                <div key={el.brand}>
                  <label>{Object.keys(el)[0]}: </label>
                  <span>{Object.values(el)[0]}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {status === "error" && (
        <p className="text-red-500">
          Error loading data.
          <span className="block">{error}</span>
        </p>
      )}
    </div>
  );
};

export default StrictDataValidator;
