import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Menu from "../components/MenuComponent";
import Dishdetail from "../components/DishdetailComponent";
import { Icon } from "react-native-elements";

const Stack = createStackNavigator();

const MenuNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Menu"
      screenOptions={({ navigation }) => ({
        headerTintColor: "#fff",
        headerTitleStyle: { color: "#fff" },
        headerStyle: { backgroundColor: "#512DA8" },
      })}
    >
      <Stack.Screen
        name="Menu"
        component={Menu}
        options={({ navigation }) => ({
          title: "Menu",
          headerLeft: () => (
            <Icon
              name="menu"
              size={24}
              color="white"
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
      />
      <Stack.Screen
        name="Dishdetail"
        component={Dishdetail}
        options={{ title: "Dish Details" }}
      />
    </Stack.Navigator>
  );
};

export default MenuNavigator;
