/*
 * Primitive Drill: The Cancellable Data Fetcher
 *
 * Goal:
 *   Create a single, self-contained component (CancellableFetcher) that demonstrates mastery over controlled data fetching,
 *   try...catch error handling, and component cleanup. The feature must allow the user to interrupt the operation mid-flight
 *   without causing an error or setting stale state.
 *
 * Constraints & Requirements:
 *   I. Core Functionality
 *      - The component must visually handle four distinct states: idle, loading, success, and error.
 *   II. Asynchronous Primitive
 *      - The fetch operation must be implemented within a useEffect hook, listening to a trigger state (e.g., a number or ID) to initiate the fetch.
 *   III. Defensive Coding
 *      - The async/await logic inside the useEffect must be wrapped in a try...catch block to handle the 30% chance of a mock network rejection.
 *   IV. Cleanup Primitive (CRITICAL)
 *      - Use a closure flag (e.g., isStale or isMounted) within the useEffect cleanup function to prevent any subsequent state updates (setData, setStatus)
 *        if the component's dependencies change or the component unmounts before the 3-second mock fetch completes.
 *   V. UI Interaction
 *      - Implement two buttons:
 *          1) A 'Start Fetch' button that increments the trigger state
 *          2) A 'Cancel' button (visible only during loading) that resets the UI to the idle status
 */
// const halfChance = () => Math.floor(Math.random() * 2);
//         const chance = halfChance();

import { useState, useEffect } from "react";

const CancellableDataFetcher = function () {
  const [isFetching, setIsFetching] = useState(false);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("No fetch attempts, yet.");
  // fetching
  // cancellable

  const fetchData = async function () {
    try {
      const fetchingCargo = {
        status: 200,
        data: {
          items: 5,
          brand: "Some brand",
        },
      };

      const fetchPromise = new Promise((resolve, reject) => {
        const intervalId = setInterval(() => {
          if (!isFetching) reject("Fetch cancelled");
        }, 100);

        setTimeout(() => {
          clearInterval(intervalId);
          resolve(fetchingCargo);
        }, 3000);
      });

      const data = await fetchPromise;
      setIsFetching(false);
      setData(data?.data);
      setMessage("Success");
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setMessage(err);
    }
  };

  const cancelFetch = function () {
    setIsFetching(() => false);
    setIsLoading(() => false);
    setData(null);
  };

  useEffect(() => {
    if (!isFetching) return;
    fetchData();
  }, [isFetching]);

  const triggerFetch = function () {
    setIsLoading(() => true);
    setIsFetching(() => true);
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      {<h1>{message}</h1>}
      {data && (
        <>
          <h1>Data: </h1>
          <div>
            <label>Items: </label>
            <span>{data.items}</span>
            <label>Brand: </label>
            <span>{data.brand} </span>
          </div>
        </>
      )}
      {isLoading && <p>Loading...</p>}

      <div className="mt-12">
        <button onClick={triggerFetch} className="cursor-pointer p-4 m-4 border-2 border-black rounded-md bg-blue-600 text-white font-black">
          Fetch data
        </button>
        <button onClick={() => cancelFetch()} className="p-4 m-4 border-2 border-black rounded-md bg-red-600 text-white font-black">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CancellableDataFetcher;
