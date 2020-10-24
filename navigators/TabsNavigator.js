import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Login from "../components/LoginComponent";
import Register from "../components/RegisterComponent";
import { Icon } from "react-native-elements";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Login"
      tabBarOptions={{
        activeBackgroundColor: "#9575CD",
        inactiveBackgroundColor: "#D1C4E9",
        activeTintColor: "white",
        inactiveTintColor: "gray",
      }}
    >
      <Tab.Screen
        name="Login"
        component={Login}
        options={{
          title: "Login",
          tabBarIcon: ({ tintColor }) => (
            <Icon
              name="sign-in"
              type="font-awesome"
              size={24}
              iconStyle={{ color: tintColor }}
            />
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Register"
        component={Register}
        options={{
          title: "Register",
          tabBarIcon: ({ tintColor }) => (
            <Icon
              name="user-plus"
              type="font-awesome"
              size={24}
              iconStyle={{ color: tintColor }}
            />
          ),
        }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
};

export default TabNavigator;
