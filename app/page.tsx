"use client";

import TooltipFeature from "./Category 1 - Component Co-location and Encapsulation/1. The Single Feature Unit/ToggleAndDisplayUnit";
import RegistrationFormFeature from "./Category 1 - Component Co-location and Encapsulation/2. The Form-and-Submit Unit (Action Encapsulation)/TheFormAndSubmitUnit";

import SelfContainedLoader from "./Category 1 - Component Co-location and Encapsulation/3. The Self-Contained Loader/SelfContainedLoader";
import CancellableDataFetcher from "./Category 1 - Component Co-location and Encapsulation/advanced/4. The Click-to-Fetch Controlled Loader/ClickToFetchControllerLoader";

import AutoResetButton from "./Category 1 - Component Co-location and Encapsulation/4. The Self-Owned Auto-Reset Button/SelfOwnedAutoResetButton";

import StrictDataValidator from "./Category 1 - Component Co-location and Encapsulation/5. Strict Data Validator/StrictDataValidator";

import ControlledStateToggle from "./Category 1 - Component Co-location and Encapsulation/ControlledStateToggle";
import AsyncTimeout from "./Category - Inside component basics/AyncTimeout";

import Todolist from "./Mini-projects/Todolist";

import ComponentVsElement from "./Component vs Element/ComponentVsElement";
import ValueVsCall from "./Component vs Element/1-value-vs-call";
import ForbiddenFunctionCall from "./Component vs Element/2-forbidden-function-call";
import RefusalToRender from "./Component vs Element/3-refusal-to-render";
import HocInputCheck from "./Component vs Element/4-hoc-input-check";
import RenderPropTest from "./Component vs Element/5-render-prop-test";

export default function Home() {
  return (
    <div>
      {/* <TooltipFeature /> */}
      {/* <RegistrationFormFeature /> */}
      {/* <SelfContainedLoader /> */}
      {/* <CancellableDataFetcher /> */}
      {/* <AutoResetButton /> */}
      {/* <StrictDataValidator /> */}
      {/* <ControlledStateToggle /> */}
      {/* <AsyncTimeout initialDelay={3000} /> */}
      {/* <Todolist /> */}
      {/* <ComponentVsElement /> */}
      {/* <ValueVsCall /> */}
      <ForbiddenFunctionCall />
      {/* <RefusalToRender /> */}
      {/* <HocInputCheck /> */}
      {/* <RenderPropTest /> */}
    </div>
  );
}
