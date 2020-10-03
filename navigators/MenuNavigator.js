import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Menu from "../components/MenuComponent";
import Dishdetail from "../components/DishdetailComponent";

const Stack = createStackNavigator();

const MenuNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Menu"
      screenOptions={{
        headerTintColor: "#fff",
        headerTitleStyle: { color: "#fff" },
        headerStyle: { backgroundColor: "#512DA8" },
      }}
    >
      <Stack.Screen name="Menu" component={Menu} options={{ title: "Menu" }} />
      <Stack.Screen
        name="Dishdetail"
        component={Dishdetail}
        options={{ title: "Dish Details" }}
      />
    </Stack.Navigator>
  );
};

export default MenuNavigator;
