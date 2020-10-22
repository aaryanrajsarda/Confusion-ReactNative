import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Favorites from "../components/FavoritesComponent";
import { Icon } from "react-native-elements";

const Stack = createStackNavigator();

const FavoritesNavigator = () => {
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
      <Stack.Screen name="Favorites" component={Favorites} options={{ title: "Favorites" }} />
    </Stack.Navigator>
  );
};

export default FavoritesNavigator;
