// @flow
import React, {Component} from "react";
import {Image, StyleSheet} from "react-native";
import {observer, inject} from "mobx-react/native";

import Images from "../images/Images";
import MainStore from "../../MainStore";
@inject("store") @observer

export default class Avatar extends Component {

    props: {
        size: number,
        id: number,
        style?: StyleSheet.Styles | Array<StyleSheet.Styles>
    }

    static defaultProps = {
        size: 20,
        id: 0
    }

    render(): React$Element<*> {

        const {store, size, id, style} = this.props;
        let link = store.userProfilePic;
        let source;
        if (link) {
            source = {uri:link};
        } else {
            source = Images.defaultAvatar;
        }
        return <Image source={source} style={[style, { width: size, height: size, borderRadius: size / 2 }]} />;
    }
}
