import { createRoot } from "react-dom/client";
import App from "./App";
import { RouterProvider } from "react-router-dom";
import Route from "./routes/Route";
import {Provider} from "react-redux";
import store from "./store/Store"
import "../index.css";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={Route}>
      <App />
    </RouterProvider>
  </Provider>,
);
