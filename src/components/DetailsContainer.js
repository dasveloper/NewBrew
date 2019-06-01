// @flow
import React, {Component} from "react";
import {KeyboardAvoidingView,StyleSheet, ScrollView} from "react-native";
import {Container, Button, Header as NBHeader, Footer, FooterTab, Left, Body, Title, Right, Icon} from "native-base";
import { EvilIcons } from "@expo/vector-icons";
import type { NavigationScreenProp } from "react-navigation/src/TypeDefinition";

import Avatar from "./avatar/Avatar";

import variables from "../../native-base-theme/variables/commonColor";

export default class BaseContainer extends Component {
    props: {
        title: string | React$Element<*>,
        navigation: NavigationScreenProp<*, *>,
        scrollable?: boolean,
        children?: React$Element<*>
    }

    render(): React$Element<*> {
        const {title, navigation, scrollable} = this.props;
        return <Container>

                {

                        this.props.children
                }
                <Footer>
                          <FooterTab>
                            <Button transparent active={title==='Brews'}
                            onPress={() => navigation.navigate("Lists")}>
                              <Icon transparent active={title==='Brews'} style={{fontSize: 32}} name="md-beer" />
                            </Button>
                            <Button transparent active={title==='Breweries'}
                            onPress={() => navigation.navigate("Timeline")}>
                              <Icon transparent active={title==='Breweries'} style={{fontSize: 32}} name="md-home" />
                            </Button>
                            <Button transparent active={title==='Search'}
                            onPress={() => navigation.navigate("Home")}>
                              <Icon transparent active={title==='Search'} style={{fontSize: 32}} name="md-search" />
                            </Button>
                            <Button transparent active={title==='Profile'}
                              onPress={() => navigation.navigate("Profile")}>
                              <Icon transparent active={title==='Profile'} style={{fontSize: 32 }} name="md-person" />
                            </Button>
                          </FooterTab>
                        </Footer>
            </Container>;
    }
}
const style = StyleSheet.create({
    tabHeading: {
        color: variables.gray
    },
    footer: {
        backgroundColor: "#f8f8f8",
        padding: variables.contentPadding * 4
    }
});
