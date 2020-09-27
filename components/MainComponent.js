import React, { Component } from "react";
import Dishdetail from "./DishdetailComponent";
import Menu from "./MenuComponent";
import { DISHES } from "C:/Users/Aaryan/Projects/ReactNative/confusion/shared/dishes.js";
import { View } from "react-native";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
      selectedDish: null,
    };
  }

  onDishSelect(dishId) {
    this.setState({ selectedDish: dishId });
  }

  render() {
    return (
      <View>
        <Menu
          dishes={this.state.dishes}
          onPress={(dishId) => this.onDishSelect(dishId)}
        />
        <Dishdetail
          dish={
            this.state.dishes.filter(
              (dish) => dish.id === this.state.selectedDish
            )[0]
          }
        />
      </View>
    );
  }
}

export default Main;
