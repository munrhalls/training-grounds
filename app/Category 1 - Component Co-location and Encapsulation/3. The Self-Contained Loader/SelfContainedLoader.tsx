/*
 * The Self-Contained Loader
 *
 * Goal: Encapsulate a complex data fetch and its three display states (Loading, Success, Error) within a single primitive unit.
 *
 * Requirements:
 * - Create a single UserCardFeature component
 * - Contains one useState for data (user) and one for status (status)
 * - useEffect on mount to call an async function that fetches fake user data after a 3-second delay
 * - Updates status sequentially (loading → success)
 * - JSX must use conditional rendering (switch or if/else) to render three distinct UIs:
 *   - Loading spinner
 *   - Full user data
 *   - Error message
 * - Primitive Focus: Prove the component can own all aspects of its data lifecycle—fetching, state, and rendering—without external state management
 */

import { useState, useEffect } from "react";

const SelfContainedLoader = function () {
  const [status, setStatus] = useState("loading");
  const [user, setUser] = useState(null);

  const fetchUserData = async function () {
    const dataPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        const halfChance = () => Math.floor(Math.random() * 2);
        const chance = halfChance();

        if (chance) {
          const userData = {
            status: 200,
            name: "Super User",
            email: "extremelyawesome@email.com",
            brand: "Best",
            coolStatus: "Cool",
          };
          resolve(userData);
        } else {
          reject("Error message: request failed.");
        }
      }, 100);
    });

    try {
      const data = await dataPromise;
      setUser(data);
      console.log(data);
      setStatus("success");
      return data;
    } catch {
      setStatus("error");
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="border-black  border-2 rounded-lg p-8 h-3/4 w-3/4 min-w-4/5 grid place-content-center">
        {status === "loading" && <div className="animate-spin w-8 h-8 border-4 border-t-blue-500 border-gray-200 rounded-full" />}
        {status !== "loading" && (
          <h1>
            Status: <span className={status === "success" ? "text-green-500 font-black uppercase" : "text-red-600 font-black"}>{status}</span>
          </h1>
        )}
        {status === "error" && <div className="p-8 border-4 border-t-red-500 border-red-500 rounded-full text-red-600">Error </div>}

        {status === "success" && user && (
          <div className="border-2 border-black rounded-md p-4 my-12 ">
            {Object.entries(user).map(([key, val]) => {
              return (
                <div key={key}>
                  <label className="font-black">{key}: </label>
                  <span>{val}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
      {status === "error" && <div className=""></div>}
    </div>
  );
};

export default SelfContainedLoader;
