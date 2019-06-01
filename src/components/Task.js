// @flow
import FitImage from 'react-native-fit-image';

import * as _ from "lodash";
import React, {Component} from "react";
import {View, H6, StyleSheet, Image, Dimensions} from "react-native";
import {H3, Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';

import {Avatar, Styles, Circle} from "../components";
import {Task as ITask} from "../Model";

import variables from "../../native-base-theme/variables/commonColor";

export default class Task extends Component {


    props: {
        task: ITask,
        timeline?: boolean

    }
    constructor(props) {
      super(props)


    }
      componentWillMount() {


      }

    componentWillUnmount() {
    }
  render() {
    const {task} = this.props;
    const {breweryName, brewDesc,imagelink, brewName, brewType, brewABV, brewIBU, brewImage} = task;
    console.log({breweryName})
    const {  navigation  } = this.props;

    var myColor = '#c8c8c8';
    return (

        <Content>
          <Card>
            <CardItem>
            <Left>
              <Body>
                <Text>{brewName}</Text>
                <Text note>{brewType}</Text>
              </Body>
            </Left>
            </CardItem>
            <CardItem style={{backgroundColor: "#f8f8f8"}}>
              <Left>
              <Text>ABV:</Text>
              <Text note>{brewABV}</Text>
              </Left>
              <Left>
              <Text>IBU:</Text>
              <Text note>{brewIBU}</Text>
              </Left>
              <Left>
              <Text>PRICE:</Text>
              <Text note>$7.50</Text>
              </Left>
            </CardItem>
            <CardItem>
              <Body>
              <Text>{brewDesc}</Text>

              </Body>
            </CardItem>
            <CardItem cardBody>
              <Image source={{uri: brewImage}} style={{height: 200, width: null, flex: 1}}/>
            </CardItem>

            <CardItem>
   <Left>
     <Button light  style={{backgroundColor: 'white'}}>
       <Icon style={{fontSize: 16,color:"#000"}} active name="md-thumbs-up" />
       <Text style={{fontSize: 16,color:"#000"}}>12 Likes</Text>
     </Button>
   </Left>
   <Body >
     <Button light style={{backgroundColor: 'white'}}>
       <Icon style={{fontSize: 16, color:"#000"}} active name="md-chatbubbles" />
       <Text style={{fontSize: 16, color:"#000"}}>4 Comments</Text>
     </Button>
   </Body>
   <Right>

     <Text style={{fontSize: 16,color:"#000"}}>11h ago</Text>

   </Right>
 </CardItem>
          </Card>
        </Content>
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
