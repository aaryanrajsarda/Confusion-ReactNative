import React, { Component } from "react";
import { View, Text, Animated, Easing } from "react-native";
import { Card } from "react-native-elements";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import { Loading } from "./LoadingComponent";

function RenderItem(props) {
  const item = props.item;
  if (props.isLoading) {
    return <Loading />;
  } else if (props.errMess) {
    return (
      <View>
        <Text>{props.errMess}</Text>
      </View>
    );
  } else {
    if (item != null) {
      return (
        <Card
          featuredTitle={item.name}
          featuredSubtitle={item.designation}
          image={{ uri: baseUrl + item.image }}
        >
          <Text style={{ margin: 10 }}>{item.description}</Text>
        </Card>
      );
    } else {
      return <View></View>;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders,
  };
};

class Home extends Component {
  constructor(props) {
    super(props);
    this.animatedValue = new Animated.Value(0); //required for Animate API
  }

  componentDidMount() {
    this.animate();
  }

  animate() {
    this.animatedValue.setValue(0);
    Animated.timing(this.animatedValue, {
      toValue: 8, //value changes from 0 to 8
      duration: 8000, //over a duration of 8 seconds
      easing: Easing.linear, //describes how the change happens
    }).start(() => this.animate()); //redo the same thing
  }

  render() {
    const xpos1 = this.animatedValue.interpolate({
      /*time gets interpolated to coordinates */
      inputRange: [0, 1, 3, 5, 8], //time range
      outputRange: [1200, 600, 0, -600, -1200], //decides x coordinate
      /*
      1200 -- far right off screen
      600 -- right off screen
      0 -- on the screen
      -600 -- left off screen
      -1200 -- far left off screen
       */
    });

    const xpos2 = this.animatedValue.interpolate({
      inputRange: [0, 2, 4, 6, 8],
      outputRange: [1200, 600, 0, -600, -1200],
    });

    const xpos3 = this.animatedValue.interpolate({
      inputRange: [0, 3, 5, 7, 8],
      outputRange: [1200, 600, 0, -600, -1200],
    });

    return (
      <View style={{ flex: 1, flexDirection: "row", justifyContent: "center" }}>
        <Animated.View
          style={{ width: "100%", transform: [{ translateX: xpos1 }] }}
        >
          <RenderItem
            item={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
            isLoading={this.props.dishes.isLoading}
            errMess={this.props.dishes.errMess}
          />
        </Animated.View>
        <Animated.View
          style={{ width: "100%", transform: [{ translateX: xpos2 }] }}
        >
          <RenderItem
            item={
              this.props.promotions.promotions.filter(
                (promo) => promo.featured
              )[0]
            }
            isLoading={this.props.promotions.isLoading}
            errMess={this.props.promotions.errMess}
          />
        </Animated.View>
        <Animated.View
          style={{ width: "100%", transform: [{ translateX: xpos3 }] }}
        >
          <RenderItem
            item={
              this.props.leaders.leaders.filter((leader) => leader.featured)[0]
            }
            isLoading={this.props.leaders.isLoading}
            errMess={this.props.leaders.errMess}
          />
        </Animated.View>
      </View>
    );
  }
}

export default connect(mapStateToProps)(Home);
