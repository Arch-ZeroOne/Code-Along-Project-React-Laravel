import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import router from "./Router.jsx";
import { RouterProvider } from "react-router-dom";
import { ContextProvider } from "./context/ContextProvider.jsx";
createRoot(document.getElementById("root")).render(
    <StrictMode>
        <ContextProvider>
            <RouterProvider router={router} />
            <App />
        </ContextProvider>
    </StrictMode>
);
