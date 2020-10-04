import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Contact from "../components/ContactComponent";
import { Icon } from "react-native-elements";

const Stack = createStackNavigator();

const ContactNavigator = () => {
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
        name="Contact"
        component={Contact}
        options={{ title: "Contact" }}
      />
    </Stack.Navigator>
  );
};

export default ContactNavigator;
