/*
 * The Toggle-and-Display Unit
 *
 * Goal: Force a component to own and encapsulate its own display state and complex content.
 *
 * Requirements:
 * - Create a single component called TooltipFeature
 * - Contains one useState variable: [isTooltipVisible, setIsTooltipVisible]
 * - Renders a main Trigger Button
 * - Conditionally renders TooltipContent (with distinct style and close button) based on isTooltipVisible
 * - Ensure the entire Tooltip logic (trigger, state, content) is defined, managed, and exported from this single file
 */

import { useState } from "react";

const TooltipFeature = function () {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  return (
    <>
      <div className="w-full grid place-content-center">
        {isTooltipVisible && (
          <div className=" border-black border-4 rounded-3xl text-black p-4">
            <h1>Tooltip title</h1>
            <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore saepe cum cupiditate harum, in non sed, nostrum dicta fuga deserunt ullam, nesciunt quia incidunt. Odio magni necessitatibus molestiae dicta facilis! </p>
            <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore saepe cum cupiditate harum, in non sed, nostrum dicta fuga deserunt ullam, nesciunt quia incidunt. Odio magni necessitatibus molestiae dicta facilis! </p>
            <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore saepe cum cupiditate harum, in non sed, nostrum dicta fuga deserunt ullam, nesciunt quia incidunt. Odio magni necessitatibus molestiae dicta facilis! </p>
          </div>
        )}
      </div>

      <button onClick={() => setIsTooltipVisible((is) => (is ? false : true))} className="w-full grid place-content-center button-primary bg-blue-600 rounded-lg p-4 text-white font-black cursor-pointer">
        {isTooltipVisible ? "SHOW" : "HIDE"}
      </button>
    </>
  );
};
export default TooltipFeature;
