import { ClickToComponent } from "click-to-react-component";
import { StrictMode } from "react";
import * as ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import { router } from "./router";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = ReactDOM.createRoot(document.querySelector("#root")!);

root.render(
  <StrictMode>
    {process.env.NODE_ENV === "development" ? <ClickToComponent /> : null}
    <RouterProvider router={router} />
  </StrictMode>,
);
