// @flow
import moment from "moment";
import FitImage from 'react-native-fit-image';

import * as _ from "lodash";
import React, {Component} from "react";
import {View, H6, StyleSheet, Image, Dimensions} from "react-native";
import {H3, Container, Header, Content, Card, CardItem, Thumbnail, Text, Badge, Button, Icon, Left, Body, Right, List, ListItem  } from 'native-base';
import type { NavigationScreenProp } from "react-navigation/src/TypeDefinition";

import {Avatar, Styles, Circle} from "../components";
import {BrewNotification as ITask} from "../Model";

import variables from "../../native-base-theme/variables/commonColor";

export default class BrewNotification extends Component {


    props: {
        task: ITask,
        timeline?: boolean,

                navigation: NavigationScreenProp<*, *>


    }

      componentWillMount() {


      }

    componentWillUnmount() {
    }
  render() {

    const {task} = this.props;
    const {  navigation  } = this.props;

    const {brewName, id, brewLocation,brewType, brewImage} = task;

    var myColor = '#c8c8c8';
    return (

            <ListItem style={{paddingLeft: 0,backgroundColor: '#fff', margin: 5, marginBottom: 0}}>
            <View danger style={{backgroundColor: 'red', borderRadius: 50, alignSelf: 'center', margin:10, height: 10, width: 10}}>
       </View>
              <Thumbnail square style={{width: 100, height: 100}} source={{ uri:brewImage }} />
              <Body style={{alignContent:"flex-start"}}>

                <Text style={{fontWeight:'bold', fontSize: 20}}>{brewName}</Text>
                <Text >{brewType}</Text>

                <Text>Blue Montain Brewery</Text>
                <Text note>14 Hours Ago</Text>
              </Body>

              <Right>

              <Button transparent   onPress={() => navigation.navigate('BrewDetails', {brewId: id})}
                title="Go to Brent's profile">
                  <Icon name="arrow-forward" />
              </Button>


              </Right>
            </ListItem>
    );
  }

}


const LocalImage =({source, originalWidth, originalHeight}) => {
  let thisWidth = 0
  let thisHeight = 0

let windowWidth = Dimensions.get('window').width
let widthChange = (windowWidth-4)/originalWidth
let newWidth = originalWidth * widthChange
let newHeight = originalHeight * widthChange
console.log(newWidth)
console.log(newHeight)
return (
  <Image source={source} style={{width: newWidth, height: newHeight}}/>
)

}


const style = StyleSheet.create({
    row: {
        flexDirection: "row",
        alignItems: "center"
    },
    doublePadding: {
        padding: variables.contentPadding * 2
    },
    gray: {
        color: variables.gray
    },
    avatar: {
        marginTop: variables.contentPadding,
        marginRight: variables.contentPadding
    },
    verticalLine: {
        borderLeftWidth: variables.borderWidth,
        borderColor: variables.listBorderColor,
        position: "absolute"
    },
    time: {
        alignItems: "center",
        flexDirection: "row",
        padding: variables.contentPadding
    },
    title: {
        justifyContent: "center",
        flex: 1,
        padding: variables.contentPadding
    }
});
