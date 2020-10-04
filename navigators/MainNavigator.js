import React from "react";
import {
  createDrawerNavigator,
  DrawerItemList,
} from "@react-navigation/drawer";
import HomeNavigator from "./HomeNavigator";
import MenuNavigator from "./MenuNavigator";
import AboutNavigator from "./AboutNavigator";
import ContactNavigator from "./ContactNavigator";
import { Icon } from "react-native-elements";
import {
  Image,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  View,
  Text,
} from "react-native";

const Drawer = createDrawerNavigator();

const CustomDrawerContentComponent = (props) => (
  <ScrollView>
    <SafeAreaView
      style={styles.container}
      forceInset={{ top: "always", horizontal: "never" }}
    >
      <View style={styles.drawerHeader}>
        <View style={{ flex: 1 }}>
          <Image
            source={require("../components/images/logo.png")}
            style={styles.drawerImage}
          />
        </View>
        <View style={{ flex: 2 }}>
          <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
        </View>
      </View>
      <DrawerItemList {...props} />
    </SafeAreaView>
  </ScrollView>
);

const MainNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerStyle={{ backgroundColor: "#D1C4E9" }}
      drawerContent={CustomDrawerContentComponent}
    >
      <Drawer.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          title: "Home",
          drawerLabel: "Home",
          drawerIcon: ({ tintColor }) => (
            <Icon name="home" type="font-awesome" size={24} color={tintColor} />
          ),
        }}
      />
      <Drawer.Screen
        name="Menu"
        component={MenuNavigator}
        options={{
          title: "Menu",
          drawerLabel: "Menu",
          drawerIcon: ({ tintColor }) => (
            <Icon name="list" type="font-awesome" size={24} color={tintColor} />
          ),
        }}
      />
      <Drawer.Screen
        name="About"
        component={AboutNavigator}
        options={{
          title: "About",
          drawerLabel: "About",
          drawerIcon: ({ tintColor }) => (
            <Icon
              name="info-circle"
              type="font-awesome"
              size={24}
              color={tintColor}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Contact"
        component={ContactNavigator}
        options={{
          title: "Contact",
          drawerLabel: "Contact",
          drawerIcon: ({ tintColor }) => (
            <Icon
              name="address-card"
              type="font-awesome"
              size={22}
              color={tintColor}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerHeader: {
    backgroundColor: "#512DA8",
    height: 140,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
  },
  drawerHeaderText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  drawerImage: {
    margin: 10,
    width: 80,
    height: 60,
  },
});

export default MainNavigator;
