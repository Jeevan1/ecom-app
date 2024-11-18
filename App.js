import { StatusBar } from "expo-status-bar";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { store } from "./store/store";
import HomeScreen from "./screens/HomeScreen";
import { Provider } from "react-redux";
import Routes from "./routes/Routes";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import AuthContextProvider from "./store/auth-context";
const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: colors.primary }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: "400",
      }}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 17,
      }}
      text2Style={{
        fontSize: 15,
      }}
    />
  ),
  alert: ({ text1, props }) => (
    <Pressable style={{ height: 60, width: "100%", backgroundColor: "tomato" }}>
      <Text>{text1}</Text>
      <Text>{props.uuid}</Text>
    </Pressable>
  ),
};
export default function App() {
  return (
    <Provider store={store}>
      <AuthContextProvider>
        <Routes />
        <Toast config={toastConfig} />
      </AuthContextProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
