// @flow
import React, {Component} from "react";
import * as _ from "lodash";
import moment from "moment";

import {StyleSheet, Text, View, ScrollView} from "react-native";
import {Container, Tab, Tabs, TabHeading, H1, H2,H6, Icon} from "native-base";
import {inject, observer} from "mobx-react/native";

import {Task as ITask} from "../Model";
import {BaseContainer, Avatar, Task, Styles, TaskOverview} from "../components";
import OverviewStore from "./OverviewStore";


import variables from "../../native-base-theme/variables/commonColor";

const RUNNING = 1;
const COMPLETED = 2;
@inject("store") @observer
export default class Overview extends Component {

    render(): React$Element<*> {
      const {store} = this.props;

        return <BaseContainer title="Dashboard" navigation={this.props.navigation}>
            <Tabs>
            <Tab heading={ <TabHeading><Icon style={{color:"green"}} name="md-thumbs-up" /><Text> UPVOTED</Text></TabHeading>}>
              <OverviewTab period={RUNNING} {...{store}} />

            </Tab>
            <Tab heading={ <TabHeading><Icon style={{color:"red"}} name="md-thumbs-down" /><Text> SKIPPED</Text></TabHeading>}>
                <OverviewTab period={COMPLETED} {...{store}} />
            </Tab>
            <Tab heading={ <TabHeading><Icon style={{color:"red"}} name="md-thumbs-down" /><Text> DOWNVOTED</Text></TabHeading>}>
                <OverviewTab period={COMPLETED} {...{store}} />
            </Tab>
            </Tabs>
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

        return <Container>
            <ScrollView style={{backgroundColor: "#e8e8e8"}}>
            {
                _.map(tasks, (task, key) => <Task {...{task, key}} />)
            }
            </ScrollView>
        </Container>
    }
}

const style = StyleSheet.create({
    tabHeading: {
        color: 'red'
    },
    tab: {
        backgroundColor: "#f8f8f8",
        padding: variables.contentPadding * 4
    }
});
