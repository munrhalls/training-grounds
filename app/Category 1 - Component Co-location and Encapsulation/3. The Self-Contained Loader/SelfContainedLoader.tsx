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

const SelfContainedLoader = function () {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="border-black  border-2 rounded-lg p-8 h-3/4 w-3/4 min-w-4/5 grid place-content-center">
        <div className="animate-spin w-8 h-8 border-4 border-t-blue-500 border-gray-200 rounded-full" />
      </div>
    </div>
  );
};

export default SelfContainedLoader;
