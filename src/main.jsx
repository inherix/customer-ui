import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Amplify } from "aws-amplify";
import { AuthProvider } from "./auth/AuthContext";
import { BrowserRouter } from "react-router-dom";

Amplify.configure({
  Auth: {
    Cognito: {
      region: "us-east-1",
      userPoolId: import.meta.env.VITE_USER_POOL_ID,
      userPoolClientId: import.meta.env.VITE_USER_CLIENT_ID,
      mandatorySignIn: false,
      loginWith: {
        email: true,
      },
    },
  },
});
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
