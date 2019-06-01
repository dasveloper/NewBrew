
// @flow
import React, {Component} from "react";
import * as _ from "lodash";
import moment from "moment";

import {StyleSheet, Text, View, ScrollView} from "react-native";
import {Container, Tab, Tabs, TabHeading, H1, H2,H6, Icon, Item, Input, Header, Button, Left, Body, Right, List, ListItem} from "native-base";
import {inject, observer} from "mobx-react/native";

import {SearchResults as ITask} from "../Model";
import {BaseContainer, Avatar, SearchResults, Styles, TaskOverview} from "../components";
import type { NavigationScreenProp } from "react-navigation/src/TypeDefinition";


import variables from "../../native-base-theme/variables/commonColor";


@inject("store") @observer
export default class Overview extends Component {
  props: {
      navigation: NavigationScreenProp<*, *>,

  }
  constructor(props){
    super(props);
    this.state = {
      results: {}
    };
    this.search = this.search.bind(this);

  }

  search() {
    fetch('http://138.197.98.89/jbjbhbcxdxrsz/getBreweries.php')
    .then((response) => response.json())
    .then((responseData) => {
      let results = responseData;
      this.setState({ results });
       }).done();
  }
    render(): React$Element<*> {
      const {store} = this.props;
      const { navigation} = this.props;

        return <BaseContainer title="Search" navigation={this.props.navigation}>

          <Header searchBar rounded>
            <Item>
              <Icon name="ios-search" />
              <Input placeholder="Search" />
            </Item>
            <Button onPress={this.search} transparent>
              <Text>Search</Text>
            </Button>
          </Header>
          <ScrollView style={[style.backgroundGray, Styles.flexGrow]}>
          <Results navigation ={navigation} results = {this.state.results}/>

          </ScrollView>
        </BaseContainer>;
    }
}

class Results extends Component {

    render(): React$Element<*> {
    //  const {this.state.results} = this.props;
    const { navigation} = this.props;

        let tasks: ITask[];
            tasks =       this.props.results;


        return <List style={{backgroundColor: "#e8e8e8"}}>
            {
                _.map(tasks, (task, key) => <SearchResults  navigation ={navigation} {...{task, key}} />)
            }
            </List>

    }
}
const style = StyleSheet.create({
    tabHeading: {
        color: 'red'
    },
    backgroundGray:{
      backgroundColor: "#e8e8e8"

    },
    tab: {
        backgroundColor: "#f8f8f8",
        padding: variables.contentPadding * 4
    }
});
