import React, { Component } from "react";
import { FlatList, View, Text, ScrollView } from "react-native";
import { ListItem, Card } from "react-native-elements";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import { Loading } from "./LoadingComponent";
import * as Animatable from "react-native-animatable";

const mapStateToProps = (state) => {
  return {
    leaders: state.leaders,
  };
};

class About extends Component {
  render() {
    function History() {
      return (
        <Text>
          Started in 2010, Ristorante con Fusion quickly established itself as a
          culinary icon par excellence in Hong Kong. With its unique brand of
          world fusion cuisine that can be found nowhere else, it enjoys
          patronage from the A-list clientele in Hong Kong. Featuring four of
          the best three-star Michelin chefs in the world, you never know what
          will arrive on your plate the next time you visit us.
          {"\n"}
          {"\n"}
          The restaurant traces its humble beginnings to The Frying Pan, a
          successful chain started by our CEO, Mr. Peter Pan, that featured for
          the first time the world's best cuisines in a pan.
        </Text>
      );
    }
    const renderLeaders = ({ item, index }) => {
      return (
        <ListItem
          key={index}
          title={item.name}
          subtitle={item.description}
          hideChevron={true}
          leftAvatar={{ source: { uri: baseUrl + item.image } }}
        />
      );
    };

    if (this.props.leaders.isLoading) {
      return (
        <ScrollView>
          <Card featuredTitle="Our History" title="Our History">
            {History()}
            <Loading />
          </Card>
        </ScrollView>
      );
    } else if (this.props.leaders.errMess) {
      return (
        <ScrollView>
          <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
            <Card featuredTitle="Our History" title="Our History">
              {History()}
              <Text>{this.props.leaders.errMess}</Text>
            </Card>
          </Animatable.View>
        </ScrollView>
      );
    } else {
      return (
        <ScrollView>
          <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
            <Card featuredTitle="Our History" title="Our History">
              {History()}
            </Card>
            <Card
              featuredTitle="Corporate Leadership"
              title="Corporate Leadership"
            >
              <FlatList
                data={this.props.leaders.leaders}
                renderItem={renderLeaders}
                keyExtractor={(item) => item.id.toString()}
              />
            </Card>
          </Animatable.View>
        </ScrollView>
      );
    }
  }
}

export default connect(mapStateToProps)(About);
