import React, { Component } from "react";
import Dishdetail from "./DishdetailComponent";
import Menu from "./MenuComponent";
import { View, Platform } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

const MenuNavigator = createStackNavigator();

class Main extends Component {
  render() {
    return (
      <NavigationContainer>
        <View
          style={{
            flex: 1,
            paddingTop:
              Platform.OS === "ios" ? 0 : Expo.Constants.statusBarHeight,
          }}
        >
          <MenuNavigator.Navigator
            initialRouteName="Menu"
            screenOptions={{
              headerTintColor: "#fff",
              headerTitleStyle: { color: "#fff" },
              headerStyle: { backgroundColor: "#512DA8" },
            }}
          >
            <MenuNavigator.Screen
              name="Menu"
              component={Menu}
              options={{ title: "Menu" }}
            />
            <MenuNavigator.Screen
              name="Dishdetail"
              component={Dishdetail}
              options={{ title: "Dish Details" }}
            />
          </MenuNavigator.Navigator>
        </View>
      </NavigationContainer>
    );
  }
}

export default Main;
