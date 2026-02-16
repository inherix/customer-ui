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
      userPoolId: "us-east-1_Vv4Sn5geB",
      userPoolClientId: "rtja83rhr30eo3d5omg6jqqlc",
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
