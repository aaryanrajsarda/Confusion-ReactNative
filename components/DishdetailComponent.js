import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  FlatList,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Modal,
  Button,
} from "react-native";
import { Card, Icon, Rating } from "react-native-elements";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import { postFavorite } from "../redux/ActionCreators";
import { postComment } from "../redux/ActionCreators";
import * as Animatable from "react-native-animatable";

function RenderComments(props) {
  const comments = props.comments;

  const renderCommentItem = ({ item, index }) => {
    return (
      <View key={index} style={{ margin: 10 }}>
        <Text style={{ fontSize: 14 }}>{item.comment}</Text>
        <Text style={{ fontSize: 12 }}>{item.rating} Stars</Text>
        <Text style={{ fontSize: 12 }}>
          {"-- " + item.author + ", " + item.date}{" "}
        </Text>
      </View>
    );
  };

  return (
    <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
      <Card title="Comments">
        <FlatList
          data={comments}
          renderItem={renderCommentItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </Card>
    </Animatable.View>
  );
}

function RenderDish(props) {
  const dish = props.dish;

  if (dish != null) {
    return (
      <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
        <Card featuredTitle={dish.name} image={{ uri: baseUrl + dish.image }}>
          <Text style={{ margin: 10 }}>{dish.description}</Text>
          <View style={styles.icons}>
            <Icon
              raised
              reverse
              name={props.favorite ? "heart" : "heart-o"}
              type="font-awesome"
              color="orange"
              onPress={() =>
                props.favorite
                  ? console.log("Already Favorite")
                  : props.onPress()
              }
            ></Icon>
            <Icon
              raised
              reverse
              name="pencil"
              type="font-awesome"
              color="darkblue"
              onPress={() => props.toggleModal()}
            ></Icon>
          </View>
        </Card>
      </Animatable.View>
    );
  } else {
    return <View></View>;
  }
}

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    favorites: state.favorites,
  };
};

const mapDispatchToProps = (dispatch) => ({
  postFavorite: (dishId) => dispatch(postFavorite(dishId)),
  postComment: (dishId, rating, author, comment) =>
    dispatch(postComment(dishId, rating, author, comment)),
});

class Dishdetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 5,
      author: "",
      comment: "",
      showModal: false,
    };
  }

  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  resetForm() {
    this.setState({
      rating: 5,
      author: "",
      comment: "",
    });
  }

  handleComment(dishId) {
    this.props.postComment(
      dishId,
      this.state.rating,
      this.state.author,
      this.state.comment
    );

    console.log(JSON.stringify(this.state));
    this.toggleModal();
  }

  markFavorite(dishId) {
    this.props.postFavorite(dishId);
  }

  render() {
    const dishId = this.props.route.params.dishId;
    return (
      <ScrollView>
        <RenderDish
          dish={this.props.dishes.dishes[+dishId]}
          favorite={this.props.favorites.some((el) => el === dishId)}
          onPress={() => this.markFavorite(dishId)}
          toggleModal={() => this.toggleModal()}
        />
        <RenderComments
          comments={this.props.comments.comments.filter(
            (comment) => comment.dishId === dishId
          )}
        />
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.showModal}
          onDismiss={() => {
            this.toggleModal();
            this.resetForm();
          }}
          onRequestClose={() => {
            this.toggleModal();
            this.resetForm();
          }}
        >
          <View style={styles.modal}>
            <Rating
              ratingCount={5}
              showRating
              startingValue={5}
              fractions={0}
              onFinishRating={(rating) => this.setState({ rating: rating })}
            ></Rating>
            <View style={{ marginTop: 25 }}>
              <View style={styles.formRow}>
                <Icon name="user-o" type="font-awesome"></Icon>
                <TextInput
                  style={{ marginLeft: 5 }}
                  placeholder="Author"
                  onChangeText={(text) => this.setState({ author: text })}
                ></TextInput>
              </View>
              <View style={styles.formRow}>
                <Icon name="comment-o" type="font-awesome"></Icon>
                <TextInput
                  style={{ marginLeft: 5 }}
                  placeholder="Comment"
                  onChangeText={(text) => this.setState({ comment: text })}
                ></TextInput>
              </View>
            </View>
            <Button
              onPress={() => this.handleComment(dishId)}
              color="#512DA8"
              title="Submit"
            />
            <Button
              onPress={() => {
                this.toggleModal();
                this.resetForm();
              }}
              color="black"
              title="Cancel"
            />
          </View>
        </Modal>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  icons: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  modal: {
    justifyContent: "center",
    margin: 20,
  },
  formRow: {
    justifyContent: "flex-start",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "black",
    paddingBottom: 5,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);
