// @flow
import React, {Component} from "react";
import * as _ from "lodash";
import moment from "moment";

import {StyleSheet, Text, View, ScrollView} from "react-native";
import {Container, Tab, Tabs, TabHeading, H1, H2,H6} from "native-base";
import {inject, observer} from "mobx-react/native";

import {Task as ITask} from "../Model";
import {BaseContainer, Avatar, Task, Styles, TaskOverview} from "../components";



const RUNNING = 1;
const COMPLETED = 2;
@inject("store") @observer
export default class Brews extends Component {

    render(): React$Element<*> {
      const {store} = this.props;

        return <BaseContainer title="Brews" navigation={this.props.navigation}>

        <OverviewTab period={RUNNING} {...{store}} />


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
        const now = moment();
        let label: string;
        let tasks: ITask[];
            tasks = store.getUpvotedPosts();

        return           <ScrollView style={[style.backgroundGray, Styles.flexGrow]}>

            {
                _.map(tasks, (task, key) => <Task {...{task, key}} />)
            }
            </ScrollView>
    }
}

const style = StyleSheet.create({
    tabHeading: {
        color:'red'
    },
    tab: {
        backgroundColor: "#f8f8f8"
    }
});
