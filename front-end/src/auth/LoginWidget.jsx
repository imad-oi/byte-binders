import { useOktaAuth } from "@okta/okta-react";
import { useHistory } from "react-router-dom";
import SpinnerLoading from "../layouts/utils/SpinnerLoading";
import OktaSignInWidget from "./OktaSignInWidget.jsx";

const LoginWidget = ({ config }) => {
  const { authState, oktaAuth } = useOktaAuth();

  const navigate = useHistory();

  const onSuccess = (tokens) => oktaAuth.handleLoginRedirect(tokens);

  const onError = (err) => console.log("Sign in error: ", err);

  if (!authState) return <SpinnerLoading />;

  if (authState.isAuthenticated) {
    navigate.push("/");
  } else {
    return (
      <OktaSignInWidget
        config={config}
        onSuccess={onSuccess}
        onError={onError}
      />
    );
  }
};

export default LoginWidget;
