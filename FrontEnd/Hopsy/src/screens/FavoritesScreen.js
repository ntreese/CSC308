import React, { Component } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Image,
  View,
  Text,
} from "react-native";
import Header from "../components/Header";
import { SearchBar, List, ListItem } from "react-native-elements";
import { DrawerActions } from "react-navigation-drawer";
import _ from "lodash";

import GLOBAL from '../../global';
import CustomButton from "../components/CustomButton";

export default class FavoritesScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: "",
      data: "",
      fullData: "",
      currentBeer: "",
      isFetching: false,
      modalVisible: false
    };
  }

  _fetchData() {
    return fetch(GLOBAL.dblink + 'get-beerDB?')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          data: responseJson,
          fullData: responseJson,
          currentBeer: responseJson[0],
        }, function(){
        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }

  
  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    this._fetchData();
  };


  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Header
          text={"We think you'll like this!"}
          onPress={() => {
            this.props.navigation.dispatch(DrawerActions.openDrawer());
          }}
        />
        <View style={styles.twinContainer}>
          <CustomButton
            // style={styles.simpleYesButton}
            onPress={() => {console.log("yes")}}
            text="Yes"
          />
          <CustomButton
            // style={styles.simpleNoButton}
            onPress={() => {console.log("no")}}
            text="No"
          />
          <CustomButton
            // style={styles.simpleNoButton}
            onPress={() => {console.log("skip")}}
            text="skip"
          />
        </View>
      </SafeAreaView>
    );
  }

}

const styles = StyleSheet.create({
  tributton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  twinContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 50
  },
  simpleYesButton: {
    height: 55,
    //marginTop: 10,
    width: 120,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center"
  },
  simpleNoButton: {
    height: 55,
    width: 120,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center"
    //marginTop: 10
  },
  image: {
    width: 400,
    height: 400,
    top: "25%",
    left: "1%",
    justifyContent: "center",
    alignItems: "center",
    resizeMode: "contain"
  },
  modalText: {
    top: "25%",
    fontSize: 30,
    fontWeight: "300",
    textAlign: "center"
  },
  modalName: {
    top: "25%",
    fontSize: 30,
    fontWeight: "300",
    textAlign: "center"
  },
  modalABV: {
    top: "25%",
    fontSize: 30,
    textAlign: "center"
  },
  modalCalories: {
    top: "25%",
    fontSize: 30,
    textAlign: "center"
  },
  modalExit: {
    alignItems: "center",
    top: "25%",
    backgroundColor: "#FFF"
  },
  name: {
    flex: 8,
    flexDirection: "row",
    fontSize: 30,
    fontWeight: "300"
  },
  subtext: {
    fontSize: 12,
    flex: 1,
    flexDirection: "row"
  },
  modal: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFF"
  },
  text: {
    color: "#3f2949",
    paddingBottom: 100
  },
  container: {
    flex: 1,
    paddingTop: Expo.Constants.statusBarHeight
  }
});