import { useContext, useState } from "react";
import { Alert } from "react-native";

import AuthContent from "../components/Auth/AuthContent";
import { AuthContext } from "../store/auth-context";
import { createUser } from "../util/auth";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authCtx = useContext(AuthContext);
  const navigation = useNavigation();

  async function signupHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      const token = await createUser(email, password);
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "User created successfully",
      });
      // authCtx.authenticate(token);
      navigation.navigate("Login");
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2:
          "Could not create user, please check your input and try again later.",
      });
      setIsAuthenticating(false);
    }
  }

  //   if (isAuthenticating) {
  //     return <LoadingOverlay message="Creating user..." />;
  //   }

  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;
