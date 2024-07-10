import React from "react";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { store } from "./store.ts";
import { RepriseBulletin } from "./components/RepriseBulletin.tsx";
import { Reprise } from "./components/Reprise.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/reprise",
    element: <Reprise />,
  },
  {
    path: "/reprise/bulletins/:idBulletin",
    element: <RepriseBulletin />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
