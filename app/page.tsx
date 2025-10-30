"use client";

import TooltipFeature from "./Category 1 - Component Co-location and Encapsulation/1. The Single Feature Unit/ToggleAndDisplayUnit";
import RegistrationFormFeature from "./Category 1 - Component Co-location and Encapsulation/2. The Form-and-Submit Unit (Action Encapsulation)/TheFormAndSubmitUnit";

import SelfContainedLoader from "./Category 1 - Component Co-location and Encapsulation/3. The Self-Contained Loader/SelfContainedLoader";
import CancellableDataFetcher from "./Category 1 - Component Co-location and Encapsulation/advanced/4. The Click-to-Fetch Controlled Loader/ClickToFetchControllerLoader";

import AutoResetButton from "./Category 1 - Component Co-location and Encapsulation/4. The Self-Owned Auto-Reset Button/SelfOwnedAutoResetButton";

export default function Home() {
  return (
    <div>
      {/* <TooltipFeature /> */}
      {/* <RegistrationFormFeature /> */}
      {/* <SelfContainedLoader /> */}
      {/* <CancellableDataFetcher /> */}
      <AutoResetButton />
    </div>
  );
}
