/*
 * The Form-and-Submit Unit
 *
 * Goal: Co-locate the form's data source, display logic, and submission handler into one component.
 *
 * Requirements:
 * - Create a single component called RegistrationFormFeature
 * - Contains two useState variables: [email, setEmail] and [isSubmitting, setIsSubmitting]
 * - Renders a full Form with inputs bound to the state
 * - handleSubmit function is defined inside this component
 *   - Sets isSubmitting to true
 *   - Awaits a simulated 2-second Promise
 *   - Resets the state
 * - Primitive Focus: The component is entirely self-contained, handling the display, the data capture, and the asynchronous side-effect for submission without relying on a parent for any of it
 */

import { useState } from "react";

const SomeServerRequest = new Promise((resolve, _) => {
  setTimeout(function () {
    resolve({
      request: "GET",
      body: "The DATA",
    });
  }, 2000);
});

const RegistrationFormFeature = function () {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = function (e) {
    e.preventDefault();
    setIsSubmitting(true);
  };

  return (
    <div className="w-full h-screen grid place-content-center">
      <form onSubmit={(e) => handleSubmit(e)} className="w-full p-12 border-black border-2 rounded-lg">
        <input className="border-gray-600 border-2 p-3 rounded-lg m-3" placeholder="email..." value={email} onChange={(e) => setEmail(e.target.value)} />
        {isSubmitting ? (
          <div className="w-full grid place-content-center">
            <div className="">Submitting...</div>
          </div>
        ) : (
          <button type="submit" className="p-4 cursor-pointer bg-blue-600 rounded-lg text-white font-black">
            Submit
          </button>
        )}
      </form>
    </div>
  );
};

export default RegistrationFormFeature;
