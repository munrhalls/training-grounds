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

// ATTEMPT
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
      setIsLoading(false);
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
      {!isLoading && <h1>{message}</h1>}
      {!isLoading && data && (
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
        <button disabled={!isFetching} onClick={() => cancelFetch()} className="cursor-pointer p-4 m-4 border-2 border-black rounded-md bg-red-600 text-white font-black">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CancellableDataFetcher;

// GOOD EXAMPLE
// The Cancellable Data Fetcher (Corrected)
// Demonstrates mastery of controlled fetching, try...catch, and useEffect cleanup.

import React, { useState, useEffect } from "react";
import { Loader2, Zap, Play, X, CheckCircle } from "lucide-react";

// --- Mock Server Function (3-second delay, 30% failure chance via reject) ---
const mockFetchData = (id) => {
  // Primitive III: 30% chance of failure (rejection)
  const isError = Math.random() < 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isError) {
        // Simulating a network failure that forces the try...catch block to hit the 'catch'
        reject(`API Error: Fetch attempt #${id} failed to connect.`);
      } else {
        // Simulating a successful network connection
        resolve({
          id: id,
          title: `Report #${id}`,
          content: `Data fetched successfully after 3 seconds.`,
        });
      }
    }, 3000);
  });
};

const CancellableDataFetcher = function () {
  // I. Core Functionality States (idle, loading, success, error)
  const [status, setStatus] = useState("idle");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  // II. Asynchronous Primitive: The numeric ID trigger (mandatory for controlled, repeatable fetches)
  const [fetchTriggerId, setFetchTriggerId] = useState(0);

  // --- 2. useEffect for controlled fetching and cleanup ---
  useEffect(() => {
    if (fetchTriggerId === 0) {
      return;
    }

    // 💥 Primitive IV (CRITICAL CLEANUP): Closure variable flag 💥
    // Tracks if this specific effect run has been superseded (cancelled or re-triggered).
    let isStale = false;

    const runFetch = async () => {
      // Resetting UI states for the new run
      setStatus("loading");
      setData(null);
      setError(null);

      // 💥 Primitive III (DEFENSIVE CODING): try...catch is mandatory 💥
      try {
        const fetchedData = await mockFetchData(fetchTriggerId);

        // Critical Check: Check the cleanup flag before setting state
        if (!isStale) {
          setData(fetchedData);
          setStatus("success");
        } else {
          // This logs when the user successfully cancelled the fetch mid-flight
          console.log(`Fetch ID ${fetchTriggerId} resolved but was cancelled/stale.`);
        }
      } catch (err) {
        // Ensure the error state is only set if the operation wasn't cancelled
        if (!isStale) {
          setError(err.toString());
          setStatus("error");
        }
      }
    };

    runFetch();

    // The Cleanup Primitive: Returns a function that sets the flag to true.
    // This runs when fetchTriggerId changes (new fetch started) OR the component unmounts.
    return () => {
      isStale = true;
    };
  }, [fetchTriggerId]);

  // --- 3. UI Action Handlers (V. UI Interaction) ---
  const handleStartFetch = () => {
    // Incrementing the ID triggers the useEffect primitive
    setFetchTriggerId((prevId) => prevId + 1);
  };

  const handleCancelFetch = () => {
    // Cancelling simply resets the UI to idle.
    // The previous run's promise *will* still resolve 3 seconds later, but the 'isStale' flag
    // in its closure prevents it from setting the state.
    setStatus("idle");
    setError(null);
    setData(null);
  };

  // --- 4. Conditional Rendering (I. Core Functionality) ---
  const renderContent = () => {
    switch (status) {
      case "idle":
        return (
          <div className="text-gray-500 flex items-center space-x-2">
            <Play className="w-5 h-5 text-indigo-400" />
            <span>Ready to fetch data.</span>
          </div>
        );

      case "loading":
        return (
          <div className="flex flex-col items-center space-y-4 text-gray-600">
            <Loader2 className="w-12 h-12 animate-spin text-indigo-600" />
            <p className="font-semibold">Loading Report ID {fetchTriggerId}...</p>
          </div>
        );

      case "error":
        return (
          <div className="p-6 border-4 border-red-500 bg-red-50 rounded-xl text-red-700 font-bold w-full">
            <h2 className="text-xl mb-2 flex items-center">
              <Zap className="w-6 h-6 mr-2" /> Operation Failed
            </h2>
            <p className="text-sm">{error || "An unknown error occurred."}</p>
          </div>
        );

      case "success":
        return (
          <div className="p-6 bg-green-50 rounded-xl shadow-lg w-full">
            <h2 className="text-2xl font-bold text-green-700 mb-4 flex items-center">
              <CheckCircle className="w-6 h-6 mr-2" /> Data Success!
            </h2>
            {data &&
              Object.entries(data).map(([key, value]) => (
                <div key={key} className="flex justify-between border-b py-2 last:border-b-0">
                  <label className="font-medium text-gray-700 capitalize">{key.replace(/([A-Z])/g, " $1")}:</label>
                  <span className="text-gray-900 font-semibold">{value.toString()}</span>
                </div>
              ))}
          </div>
        );

      default:
        return null;
    }
  };

  // --- 5. Main JSX Structure ---
  const isLoading = status === "loading";

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center p-8 bg-gray-50">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-8">Cancellable Fetcher Primitive</h1>
      <div className="w-full max-w-lg border border-gray-300 bg-white rounded-xl shadow-2xl p-8 min-h-[350px] flex flex-col items-center justify-center space-y-8">
        <div className="w-full min-h-[150px] flex items-center justify-center">{renderContent()}</div>

        <div className="flex space-x-4 w-full justify-center">
          <button onClick={handleStartFetch} disabled={isLoading} className={`px-6 py-3 rounded-lg font-bold transition duration-200 shadow-md ${isLoading ? "bg-gray-400 text-gray-700 cursor-not-allowed" : "bg-indigo-600 text-white hover:bg-indigo-700"}`}>
            {isLoading ? "Fetching..." : "Start Fetch"}
          </button>

          {isLoading && (
            <button onClick={handleCancelFetch} className="px-6 py-3 rounded-lg font-bold text-red-600 border border-red-600 hover:bg-red-50 transition duration-200 flex items-center space-x-2">
              <X className="w-5 h-5" />
              <span>Cancel</span>
            </button>
          )}
        </div>
        <p className="text-xs text-gray-400 mt-4">Active ID: {fetchTriggerId}</p>
      </div>
      <p className="mt-4 text-sm text-gray-500 max-w-lg text-center">**Test Scenario:** Click 'Start Fetch', then immediately click 'Cancel'. Verify that the status returns to 'idle' and the state update from the resolving promise is successfully ignored (check the console for the 'stale' log).</p>
    </div>
  );
};

export default CancellableDataFetcher;
