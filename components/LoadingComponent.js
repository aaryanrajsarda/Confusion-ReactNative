import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  loadingView: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  loadingText: {
    color: "#512DA8",
    fontWeight: "bold",
    fontSize: 14,
  },
});

export const Loading = () => {
  return (
    <View style={styles.loadingView}>
      <ActivityIndicator color="#512DA8" size="large" />
      <Text style={styles.loadingText}>Loading...</Text>
    </View>
  );
};
