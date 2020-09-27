import React, { Component } from "react";
import { View, FlatList } from "react-native";
import { ListItem } from "react-native-elements";

function Menu(props) {
  const renderMenuItem = ({ item, index }) => {
    return (
      <ListItem
        key={index}
        title={item.name}
        subtitle={item.description}
        hideChevron={true} //hides the arrow
        leftAvatar={{ source: require("./images/uthappizza.png") }}
      />
    );
  };

  return (
    <FlatList
      data={props.dishes} //data specifies the array to be used. Here dishes is the array
      renderItem={renderMenuItem} //renderMenuItem is the function passed which tells how to render the array items
      keyExtractor={(item) => item.id.toString()} //keyExtractor accepts string values
    />
  );
}

export default Menu;
