import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import About from "../components/AboutComponent";
import { Icon } from "react-native-elements";

const Stack = createStackNavigator();

const AboutNavigator = () => {
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
        name="About"
        component={About}
        options={{ title: "About Us" }}
      />
    </Stack.Navigator>
  );
};

export default AboutNavigator;
