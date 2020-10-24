import React, { Component } from "react";
import { View, StyleSheet, Button } from "react-native";
import { Card, Icon, Input, CheckBox } from "react-native-elements";
import * as SecureStore from "expo-secure-store";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      remember: false,
    };
  }

  handleLogin() {
    console.log(JSON.stringify(this.state));
    if (this.state.remember) {
      SecureStore.setItemAsync(
        "userinfo",
        JSON.stringify({
          username: this.state.username,
          password: this.state.password,
        })
      ).catch((error) => console.log("Could not save user info", error));
    } else {
      SecureStore.deleteItemAsync("userinfo").catch((error) =>
        console.log("Could not delete user info", error)
      );
    }
  }

  componentDidMount() {
    SecureStore.getItemAsync("userinfo").then((userdata) => {
      let userinfo = JSON.parse(userdata);
      if (userinfo) {
        this.setState({
          username: userinfo.username,
          password: userinfo.password,
          remember: true,
        });
      } else {
        this.setState({
          username: "",
          password: "",
          remember: false,
        });
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
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
        <CheckBox
          title="Remember Me"
          checked={this.state.remember}
          center
          onPress={() => this.setState({ remember: !this.state.remember })}
          containerStyle={styles.formCheckbox}
        />
        <View>
          <Button
            onPress={() => this.handleLogin()}
            title="Login"
            color="#512DA8"
          ></Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    margin: 20,
  },
  formInput: {
    marginTop: 40,
  },
  formCheckbox: {
    margin: 20,
    backgroundColor: null,
  },
});

export default Login;
