import { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import Input from "./Input";
import Button from "../Button";
import colors from "../../constants/colors";
import IconButton from "../IconButton";
import ImageButton from "../ImageButton";
import { getAuth, sendPasswordResetEmail } from "@firebase/auth";
import Toast from "react-native-toast-message";
import { initializeApp } from "@firebase/app";
import { firebaseConfig } from "../../util/auth";

function AuthForm({
  isLogin,
  onSubmit,
  credentialsInvalid,
  switchAuthModeHandler,
}) {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredConfirmEmail, setEnteredConfirmEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState("");
  const [resetEmail, setResetEmail] = useState("shresthaj1986@gmail.com");

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const {
    email: emailIsInvalid,
    confirmEmail: emailsDontMatch,
    password: passwordIsInvalid,
    confirmPassword: passwordsDontMatch,
  } = credentialsInvalid;

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case "email":
        setEnteredEmail(enteredValue);
        break;
      case "confirmEmail":
        setEnteredConfirmEmail(enteredValue);
        break;
      case "password":
        setEnteredPassword(enteredValue);
        break;
      case "confirmPassword":
        setEnteredConfirmPassword(enteredValue);
        break;
    }
  }

  function submitHandler() {
    onSubmit({
      email: enteredEmail,
      confirmEmail: enteredConfirmEmail,
      password: enteredPassword,
      confirmPassword: enteredConfirmPassword,
    });
  }
  async function resetPasswordHandler() {
    await sendPasswordResetEmail(auth, resetEmail)
      .then(() => {
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Password reset email sent!",
        });
      })
      .catch((error) => {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: error.message,
        });
      });
  }

  return (
    <View style={styles.form}>
      <View style={{ flex: 1, justifyContent: "space-between" }}>
        <View style={styles.inputsContainer}>
          <Input
            label="Email Address"
            onUpdateValue={updateInputValueHandler.bind(this, "email")}
            value={enteredEmail}
            keyboardType="email-address"
            isInvalid={emailIsInvalid}
            placeholder={"Enter your email address"}
          />
          {!isLogin && (
            <Input
              label="Confirm Email Address"
              onUpdateValue={updateInputValueHandler.bind(this, "confirmEmail")}
              value={enteredConfirmEmail}
              keyboardType="email-address"
              isInvalid={emailsDontMatch}
              placeholder={"Enter your email address"}
            />
          )}
          <Input
            label="Password"
            onUpdateValue={updateInputValueHandler.bind(this, "password")}
            secure
            value={enteredPassword}
            isInvalid={passwordIsInvalid}
            placeholder={"Enter your password"}
          />
          {!isLogin && (
            <Input
              label="Confirm Password"
              onUpdateValue={updateInputValueHandler.bind(
                this,
                "confirmPassword"
              )}
              secure
              value={enteredConfirmPassword}
              isInvalid={passwordsDontMatch}
              placeholder={"Enter your password"}
            />
          )}
          <View>
            <Pressable
              style={styles.forgetPassword}
              onPress={resetPasswordHandler}
            >
              <Text style={styles.link}>Forgot Password?</Text>
            </Pressable>
          </View>
          <View style={styles.buttons}>
            <Button
              text={isLogin ? "Log In" : "Sign Up"}
              onPress={submitHandler}
              style={styles.button}
              textStyle={{
                color: colors.white,
                fontSize: 14,
                fontWeight: "bold",
              }}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              gap: 16,
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <Text style={styles.left}></Text>
            <Text style={styles.text}>Or Login with</Text>
            <Text style={styles.right}></Text>
          </View>
          <View style={[styles.buttons, styles.imageBtn]}>
            <ImageButton
              url={require("../../assets/images/login/fb.png")}
              height={28}
              width={28}
            />
            <ImageButton
              url={require("../../assets/images/login/google.png")}
              height={28}
              width={28}
            />
            <ImageButton
              url={require("../../assets/images/login/apple.png")}
              height={28}
              width={28}
            />
          </View>
        </View>
        <View style={styles.footer}>
          <Text style={styles.text}>Don't have an account?</Text>
          <Pressable onPress={switchAuthModeHandler}>
            <Text style={[styles.link, { color: colors.primary }]}>
              Register Now
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

export default AuthForm;

const styles = StyleSheet.create({
  form: {
    flex: 1,
  },
  inputsContainer: {
    flexGrow: 1,
    position: "relative",
  },
  buttons: {
    marginTop: 18,
  },
  forgetPassword: {
    alignSelf: "flex-end",
    marginVertical: 4,
  },
  link: {
    color: colors.medium,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: colors.primary,
    borderWidth: 0,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
  },
  text: {
    color: colors.medium,
    fontWeight: "bold",
  },
  left: {
    flex: 1,
    height: 1,
    backgroundColor: colors.grey,
  },
  right: {
    flex: 1,
    height: 1,
    backgroundColor: colors.grey,
  },
  imageBtn: {
    gap: 10,
    flexDirection: "row",
  },
  footer: {
    marginBottom: 20,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    gap: 4,
  },
});
