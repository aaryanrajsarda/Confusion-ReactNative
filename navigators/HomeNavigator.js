import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../components/HomeComponent";

const Stack = createStackNavigator();

const HomeNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: "#fff",
        headerTitleStyle: { color: "#fff" },
        headerStyle: { backgroundColor: "#512DA8" },
      }}
    >
      <Stack.Screen name="Home" component={Home} options={{ title: "Home" }} />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
