import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import { StyleSheet } from "react-native";
import colors from "../constants/colors";
import HeaderRight from "../components/HeaderRight";
import HeaderTitle from "../components/HeaderTitle";
import ProductDetailsScreen from "../screens/ProductDetailsScreen";
import CartScreen from "../screens/CartScreen";
import ProductsScreen from "../screens/ProductsScreen";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import { useContext } from "react";
import { AuthContext } from "../store/auth-context";

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: "white",
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerTitleStyle: styles.headerTitle,
        headerShadowVisible: false,
        headerBackTitleVisible: false,
        headerStyle: styles.headerStyle,
        headerRight: () => <HeaderRight />,
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Details" component={ProductDetailsScreen} />
      <Stack.Screen name="Cart" component={CartScreen} />
      <Stack.Screen name="Products" component={ProductsScreen} />
    </Stack.Navigator>
  );
}
const Routes = () => {
  const isAuthenticated = useContext(AuthContext);
  return (
    <NavigationContainer>
      {/* <AuthenticatedStack /> */}
      {isAuthenticated.isAuthenticated ? <AuthenticatedStack /> : <AuthStack />}
      {/* <Stack.Navigator
        screenOptions={{
          headerShown: true,
          //   headerTitle: (props) => <HeaderTitle {...props} />,
          headerTitleStyle: styles.headerTitle,
          headerShadowVisible: false,
          headerBackTitleVisible: false,
          headerStyle: styles.headerStyle,
          headerRight: () => <HeaderRight />,
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={ProductDetailsScreen} />
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen name="Products" component={ProductsScreen} />
      </Stack.Navigator> */}
    </NavigationContainer>
  );
};

export default Routes;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerStyle: {
    height: 200,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    borderBottomWidth: 0,
    backgroundColor: colors.white,
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0,
  },
  headerTitle: {
    fontWeight: "bold",
    color: colors.secondary,
  },
});
