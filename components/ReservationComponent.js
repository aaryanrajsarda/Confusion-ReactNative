import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Switch,
  Button,
  Modal,
  Alert,
} from "react-native";
import { Picker } from "@react-native-community/picker";
import DatePicker from "react-native-datepicker";
import * as Animatable from "react-native-animatable";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import { NOTIFICATIONS } from "expo-permissions";

class Reservation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      guests: 1,
      smoking: false,
      date: "",
      showModal: false,
    };
  }

  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  resetForm() {
    this.setState({
      guests: 1,
      smoking: false,
      date: "",
    });
  }

  async obtainNotificationPermission() {
    let permission = await Permissions.getAsync(
      Permissions.USER_FACING_NOTIFICATIONS
    );
    if (permission.status !== "granted") {
      permission = await Permissions.askAsync(
        Permissions.USER_FACING_NOTIFICATIONS
      );
      if (permission.status !== "granted") {
        Alert.alert("Permission not granted to show notifications");
      }
    }
    return permission;
  }

  async presentLocalNotification(date) {
    await this.obtainNotificationPermission();
    Notifications.presentNotificationAsync({
      title: "Your Reservation",
      body: "Reservation for " + date + " requested",
      sound: true,
    });
  }

  handleReservation() {
    console.log(JSON.stringify(this.state));
    Alert.alert(
      "Your Reservation OK?",
      "Number of Guests: " +
        this.state.guests +
        "\n" +
        "Smoking? " +
        this.state.smoking +
        "\n" +
        "Date and Time: " +
        this.state.date,
      [
        {
          text: "Cancel",
          onPress: this.resetForm(),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            this.presentLocalNotification(this.state.date);
            this.resetForm();
          },
        },
      ],
      { cancelable: false }
    );
  }

  render() {
    return (
      <ScrollView>
        <Animatable.View animation="zoomInUp" duration={2000} delay={1000}>
          <View style={styles.formRow}>
            <Text style={styles.formLabel}>Number of Guests</Text>
            <Picker
              style={styles.formItem}
              selectedValue={this.state.guests}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ guests: itemValue })
              }
            >
              <Picker.Item label="1" value="1" />
              <Picker.Item label="2" value="2" />
              <Picker.Item label="3" value="3" />
              <Picker.Item label="4" value="4" />
              <Picker.Item label="5" value="5" />
              <Picker.Item label="6" value="6" />
            </Picker>
          </View>
          <View style={styles.formRow}>
            <Text style={styles.formLabel}>Smoking/Non-Smoking?</Text>
            <Switch
              style={styles.formItem}
              value={this.state.smoking}
              trackColor="#512DA8"
              onValueChange={(value) => this.setState({ smoking: value })}
            />
          </View>
          <View style={styles.formRow}>
            <Text style={styles.formLabel}>Date and Time</Text>
            <DatePicker
              style={{ flex: 2, marginRight: 20 }}
              date={this.state.date}
              format=""
              mode="datetime"
              placeholder="Select Date and Time"
              minDate="2020-10-05"
              locale="en"
              confirmBtnTestID="Confirm"
              cancelBtnTest="Cancel"
              customStyles={{
                dateIcon: {
                  position: "absolute",
                  top: 4,
                  left: 0,
                  marginLeft: 0,
                },
                dateInput: {
                  marginLeft: 36,
                },
              }}
              onDateChange={(date) => this.setState({ date: date })}
            ></DatePicker>
          </View>
          <View style={styles.formRow}>
            <Button
              title="Reserve"
              color="#512DA8"
              style={styles.formItem}
              onPress={() => this.handleReservation()}
              accessibilityLabel="Learn more about this purple button"
            />
          </View>
        </Animatable.View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  formRow: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
    margin: 20,
  },
  formLabel: {
    fontSize: 18,
    flex: 2,
  },
  formItem: {
    flex: 1,
  },
  modal: {
    justifyContent: "center",
    margin: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    backgroundColor: "#512DA8",
    textAlign: "center",
    color: "white",
    marginBottom: 20,
  },
  modalText: {
    fontSize: 18,
    margin: 10,
  },
});

export default Reservation;
