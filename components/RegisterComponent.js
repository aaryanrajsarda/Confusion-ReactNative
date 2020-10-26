import React, { Component } from "react";
import { View, StyleSheet, Text, ScrollView, Image } from "react-native";
import { Icon, Input, CheckBox, Button } from "react-native-elements";
import { baseUrl } from "../shared/baseUrl";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import * as SecureStore from "expo-secure-store";
import * as ImageManipulator from "expo-image-manipulator";
import { Asset } from "expo-asset";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      remember: false,
      firstname: "",
      lastname: "",
      email: "",
      imageUrl: baseUrl + "images/logo.png",
    };
  }

  getImageFromGallery = async () => {
    const galleryPermission = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );
    if (galleryPermission.status === "granted") {
      let chosenImage = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        allowsMultipleSelection: false,
        aspect: [4, 3],
      });
      if (!chosenImage.cancelled) {
        this.processImage(chosenImage.uri);
      }
    }
  };

  getImageFromCamera = async () => {
    const cameraPermission = await Permissions.askAsync(Permissions.CAMERA);
    const cameraRollPermission = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );
    if (
      cameraPermission.status === "granted" &&
      cameraRollPermission.status === "granted"
    ) {
      let capturedImage = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });
      if (!capturedImage.cancelled) {
        this.processImage(capturedImage.uri);
      }
    }
  };

  processImage = async (imageUri) => {
    let processedImage = await ImageManipulator.manipulateAsync(
      imageUri,
      [
        {
          resize: { width: 400, height: 300 },
        },
      ],
      { format: "png" }
    );
    this.setState({ imageUrl: processedImage.uri });
  };

  handleRegister() {
    console.log(JSON.stringify(this.state));
    if (this.state.remember) {
      SecureStore.setItemAsync(
        "userinfo",
        JSON.stringify({
          username: this.state.username,
          password: this.state.password,
        })
      ).catch((error) => console.log("Could not save user info", error));
    }
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: this.state.imageUrl }}
              loadingIndicatorSource={require("./images/logo.png")}
              style={styles.image}
            />
            <Button title="Camera" onPress={this.getImageFromCamera} />
            <Button title="Gallery" onPress={this.getImageFromGallery} />
          </View>
          <Input
            placeholder="Username"
            leftIcon={{ type: "font-awesome", name: "user-o" }}
            onChangeText={(username) => this.setState({ username: username })}
            value={this.state.username}
            containerStyle={styles.formInput}
          />
          <Input
            placeholder="Password"
            leftIcon={{ type: "font-awesome", name: "key" }}
            onChangeText={(password) => this.setState({ password: password })}
            value={this.state.password}
          />
          <Input
            placeholder="First Name"
            leftIcon={{ type: "font-awesome", name: "user-o" }}
            onChangeText={(firstname) =>
              this.setState({ firstname: firstname })
            }
            value={this.state.firstname}
            containerStyle={styles.formInput}
          />
          <Input
            placeholder="Last Name"
            leftIcon={{ type: "font-awesome", name: "user-o" }}
            onChangeText={(lastname) => this.setState({ lastname: lastname })}
            value={this.state.lastname}
            containerStyle={styles.formInput}
          />
          <Input
            placeholder="Email"
            leftIcon={{ type: "font-awesome", name: "envelope-o" }}
            onChangeText={(email) => this.setState({ email: email })}
            value={this.state.email}
            containerStyle={styles.formInput}
          />
          <CheckBox
            title="Remember Me"
            checked={this.state.remember}
            center
            onPress={() => this.setState({ remember: !this.state.remember })}
            containerStyle={styles.formCheckbox}
          />
          <View>
            <Button
              onPress={() => this.handleRegister()}
              title="Register"
              icon={
                <Icon
                  size={24}
                  name="user-plus"
                  type="font-awesome"
                  color="white"
                />
              }
              buttonStyle={{ backgroundColor: "#512DA8" }}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    margin: 20,
  },
  imageContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  image: {
    width: 80,
    height: 60,
    margin: 10,
  },
  formInput: {
    marginTop: 40,
  },
  formCheckbox: {
    margin: 20,
    backgroundColor: null,
  },
});

export default Register;
