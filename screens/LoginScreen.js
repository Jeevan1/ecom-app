import { useContext, useState } from "react";
import { Alert } from "react-native";

import AuthContent from "../components/Auth/AuthContent";
// import LoadingOverlay from "../components/ui/LoadingOverlay";
import { AuthContext } from "../store/auth-context";
import { login } from "../util/auth";
import Toast from "react-native-toast-message";

function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authCtx = useContext(AuthContext);

  async function loginHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      const token = await login(email, password);
      authCtx.authenticate(token);
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "User logged in successfully",
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Authentication failed!",
        text2:
          "Could not log you in. Please check your credentials or try again later!",
      });

      setIsAuthenticating(false);
    }
  }

  // if (isAuthenticating) {
  //   return < message="Logging you in..." />;
  // }

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
