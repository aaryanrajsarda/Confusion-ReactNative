import React, { Component } from "react";
import { FlatList, View, Text, ScrollView } from "react-native";
import { ListItem, Card } from "react-native-elements";
import { LEADERS } from "../shared/leaders";

class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leaders: LEADERS,
    };
  }
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
          leftAvatar={{ source: require("./images/alberto.png") }}
        />
      );
    };
    return (
      <ScrollView>
        <Card featuredTitle="Our History" title="Our History">
          {History()}
        </Card>
        <Card featuredTitle="Corporate Leadership" title="Corporate Leadership">
          <FlatList
            data={this.state.leaders}
            renderItem={renderLeaders}
            keyExtractor={(item) => item.id.toString()}
          />
        </Card>
      </ScrollView>
    );
  }
}

export default About;
