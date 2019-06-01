// @flow
import React, {Component} from "react";
import * as _ from "lodash";
import moment from "moment";

import {StyleSheet, Text, View, ScrollView} from "react-native";
import {Container, Tab, Tabs, TabHeading, H1, H2,H6,Button,Icon} from "native-base";
import {inject, observer} from "mobx-react/native";

import {Task as ITask} from "../Model";
import {BaseContainer, Avatar, Task, Styles, TaskOverview} from "../components";


import variables from "../../native-base-theme/variables/commonColor";

const RUNNING = 1;
const COMPLETED = 2;
@inject("store") @observer
export default class Profile extends Component {
  constructor(props){
    super(props);
    this.state = {
      brew: {}
    };

  }
  componentWillMount() {
          const {state} = this.props.navigation;
          const data = {brewId: state.params.brewId};

    fetch(`http://138.197.98.89/jbjbhbcxdxrsz/getBrewDetails.php?brewId=${data.brewId}`)
    .then((response) => response.json())
    .then((responseData) => {
      console.log(responseData)
      let brew = responseData;
      this.setState({ brew });
       }).done();
  }
    render(): React$Element<*> {
      const {store} = this.props;
      const {state, goBack} = this.props.navigation;
      const {  navigation  } = this.props;

        return <BaseContainer title="Brew Details" navigation={this.props.navigation}>


<Task navigation ={navigation} task={this.state.brew} />

        </BaseContainer>;
    }
}

@observer
class OverviewTab extends Component {
    props: {
        period: 1 | 2 ,
        store: MainStore
    }
    render(): React$Element<*> {
        const {period, store} = this.props;
        const {  navigation  } = this.props;

        const now = moment();
        let label: string;
        let tasks: ITask[];
            tasks = store.getUpvotedPosts();

        return           <ScrollView style={[style.backgroundGray, Styles.flexGrow]}>

            {
                _.map(tasks, (task, key) => <Task navigation ={navigation} {...{task, key}} />)
            }
            </ScrollView>
    }
}

const style = StyleSheet.create({
    tabHeading: {
        color: variables.gray
    },
    tab: {
        backgroundColor: "#f8f8f8",
        padding: variables.contentPadding * 4
    }
});
