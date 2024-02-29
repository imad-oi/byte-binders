import "@okta/okta-signin-widget/dist/css/okta-sign-in.min.css";
import { useEffect, useRef } from "react";
import {oktaConfig} from "../lib/oktaConfig";
import OktaSignIn from "@okta/okta-signin-widget";

const OktaSignInWidget = ({ onSuccess, onError }) => {
  const widgetRef = useRef();

  useEffect(() => {
    
    if (!widgetRef.current) return false;

    const widget = new OktaSignIn(oktaConfig);

    widget
      .showSignInToGetTokens({
        el: widgetRef.current,
      })
      .then(onSuccess)
      .catch(onError);

    return () => widget.remove();
  }, [onSuccess, onError]);
  return (
    <div className="">
      <div ref={widgetRef} />
    </div>
  );
};

export default OktaSignInWidget;
