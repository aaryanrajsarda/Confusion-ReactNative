import React, { Component } from "react";
import { View, FlatList } from "react-native";
import { ListItem } from "react-native-elements";
import { DISHES } from "C:/Users/Aaryan/Projects/ReactNative/confusion/shared/dishes.js";

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
    };
  }

  render() {
    const renderMenuItem = ({ item, index }) => {
      return (
        <ListItem
          key={index}
          title={item.name}
          subtitle={item.description}
          hideChevron={true}
          onPress={() =>
            this.props.navigation.navigate("Dishdetail", { dishId: item.id })
          } //navigation parameter, goes to Dishdetail with the dishId parameter
          leftAvatar={{ source: require("./images/uthappizza.png") }}
        />
      );
    };
    return (
      <View>
        <FlatList
          data={this.state.dishes} //data specifies the array to be used. Here dishes is the array
          renderItem={renderMenuItem} //renderMenuItem is the function passed which tells how to render the array items
          keyExtractor={(item) => item.id.toString()} //keyExtractor accepts string values
        />
      </View>
    );
  }
}

export default Menu;
