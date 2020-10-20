import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Reservation from "../components/ReservationComponent";
import { Icon } from "react-native-elements";

const Stack = createStackNavigator();

const ReservationNavigator = () => {
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
        name="Reservation"
        component={Reservation}
        options={{ title: "Reservation" }}
      />
    </Stack.Navigator>
  );
};

export default ReservationNavigator;
