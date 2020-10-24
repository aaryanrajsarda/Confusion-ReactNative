import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../components/LoginComponent";
import { Icon } from "react-native-elements";

const Stack = createStackNavigator();

const LoginNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerTintColor: "#fff",
        headerTitleStyle: { color: "#fff" },
        headerStyle: { backgroundColor: "#512DA8" },
        headerLeft: () => (
          <Icon
            name="menu"
            size={24}
            color="white"
            onPress={() => navigation.toggleDrawer()}
          />
        ),
      })}
    >
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ title: "Login" }}
      />
    </Stack.Navigator>
  );
};

export default LoginNavigator;
