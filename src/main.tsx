import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import InputScreen from "./routes/InputScreen";
import HistoryScreen from "./routes/HistoryScreen";
import DataScreen from "./routes/DataScreen";
import SettingsScreen from "./routes/SettingsScreen";
import "./style.css";

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <InputScreen />,
      },
      {
        path: 'history',
        element: <HistoryScreen />,
      },
      {
        path: 'data',
        element: <DataScreen />,
      },
      {
        path: 'settings',
        element: <SettingsScreen />,
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
