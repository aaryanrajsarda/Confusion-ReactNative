import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeNavigator from "./HomeNavigator";
import MenuNavigator from "./MenuNavigator";

const Drawer = createDrawerNavigator();

const MainNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerStyle={{ backgroundColor: "#D1C4E9" }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeNavigator}
        options={{ title: "Home", drawerLabel: "Home" }}
      />
      <Drawer.Screen
        name="Menu"
        component={MenuNavigator}
        options={{ title: "Menu", drawerLabel: "Menu" }}
      />
    </Drawer.Navigator>
  );
};

export default MainNavigator;
