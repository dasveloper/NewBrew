// @flow
import autobind from "autobind-decorator";
import moment from "moment";
import React, {Component} from "react";
import {View, Text} from "react-native";
import {Switch, List, ListItem, Body, Right} from "native-base";
import {observable, action} from "mobx";
import { observer } from "mobx-react/native";

import SettingsStore from "./SettingsStore";

import {BaseContainer, Styles, Avatar, Field} from "../components";

import variables from "../../native-base-theme/variables/commonColor";

@observer
export default class Settings extends Component {

    store = new SettingsStore();

    render(): React$Element<*> {
        const {profile} = this.store;
        return <BaseContainer title="Settings" navigation={this.props.navigation} scrollable>
            <View style={[Styles.header, Styles.center, Styles.whiteBg]}>
                <Avatar size={100} />
            </View>
            {
                profile && <List>
                    <ListItem itemDivider>
                        <Text>GENERAL</Text>
                    </ListItem>
                    <Field
                        label="Name"
                        defaultValue={profile.name}
                        onChange={value => this.store.setName(value)}
                    />
                    <Field
                        label="Birthday (Day Month Year)"
                        defaultValue={moment.unix(profile.birthday).format("DD/MM/YYYY")}
                        onChange={value => this.store.setBirthday(value)}
                        last
                    />
                    <ListItem itemDivider>
                        <Text>NOTIFICATIONS</Text>
                    </ListItem>
                    <ListItem>
                        <Body>
                        <Text>Email Notification</Text>
                        </Body>
                        <Right>
                            <SettingsSwitch
                                defaultValue={profile.emailNotifications}
                                onToggle={done => this.store.toggleEmailNotifications(done)}
                            />
                        </Right>
                    </ListItem>
                    <ListItem last>
                        <Body>
                        <Text>Phone Notification</Text>
                        </Body>
                        <Right>
                            <SettingsSwitch
                                defaultValue={profile.phoneNotifications}
                                onToggle={done => this.store.togglePhoneNotifications(done)}
                            />
                        </Right>
                    </ListItem>
                </List>
            }
        </BaseContainer>;
    }
}

@observer
class SettingsSwitch extends Component {

    props: {
        defaultValue: boolean,
        onToggle: boolean => void
    }

    @observable value: boolean;

    componentWillMount() {
        const {defaultValue} = this.props;
        this.value = defaultValue;
    }

    @autobind @action
    toggle() {
        const {onToggle} = this.props;
        this.value = !this.value;
        onToggle(this.value);
    }

    render(): React$Element<*> {
        return <Switch
            value={this.value}
            onValueChange={this.toggle}
            onTintColor="rgba(80, 210, 194, .5)"
            thumbTintColor={this.value ? variables.brandInfo : "#BEBEC1"}
        />;
    }

}