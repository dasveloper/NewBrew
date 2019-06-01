// @flow
import moment from "moment";
import autobind from "autobind-decorator";
import React, {Component} from "react";
import {observer} from "mobx-react/native";
import {StyleSheet, View, Text, Image,ScrollView} from "react-native";
import {Container,H1, Button, Tab, Tabs, TabHeading,Spinner, Icon} from "native-base";

import CreateStore from "./CreateStore";

import {BaseContainer, Styles, Images, Field} from "../components";

import variables from "../../native-base-theme/variables/commonColor";
import { ImagePicker } from 'expo';

const RUNNING = 1;
const COMPLETED = 2;

@observer
export default class Create extends Component {
  state = {
    image: null,
  };

    store = new CreateStore();

    @autobind
    async save(): Promise<void> {
        await this.store.save();
        this.props.navigation.navigate("Overview");
    }

    render(): React$Element<*> {
          let { image } = this.state;
        return <BaseContainer title="Create New" navigation={this.props.navigation} scrollable>
        <Image source={Images.lists} style={Styles.header}>
            <View style={[Styles.center, Styles.flexGrow, Styles.headerMask]}>
                <H1 style={{ color: "white" }}>NEW POST</H1>
            </View>
        </Image>
        <Tabs locked={true}>
            <Tab heading={<TabHeading style={{ flexDirection: 'column', height: 100}}><Icon name="text" active ={true} style={{color:"#02cda2", fontSize: 50}} /><Text style={style.tabHeading}>TEXT</Text></TabHeading>}>
            <View>

            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
        title="Pick an image from camera roll"
        onPress={this._pickImage}
        />
        {image &&
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        </View>
            <Field
                label="Title"
                defaultValue={this.store.task.title}
                onChange={title => this.store.title = title}
            />
            <Field
                label="Project"
                defaultValue={this.store.task.project}
                onChange={project => this.store.project = project}
            />

            <Button primary full onPress={this.save}>
            {
                this.store.loading ? <Spinner color="white" /> : <Text style={style.text}>CREATE</Text>
            }
            </Button>
            </View>
            </Tab>
            <Tab heading={<TabHeading style={{ flexDirection: 'column'}}><Icon name="camera" active ={true} style={{color:"#02cda2", fontSize: 50}} /><Text style={style.tabHeading}>PHOTO</Text></TabHeading>}>
            <View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
        title="Pick an image from camera roll"
        onPress={this._pickImage}
        />
        {image &&
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        </View>
            <Field
                label="Title"
                defaultValue={this.store.task.title}
                onChange={title => this.store.title = title}
            />
            <Field
                label="Project"
                defaultValue={this.store.task.project}
                onChange={project => this.store.project = project}
            />

            <Button primary full onPress={this.save}>
            {
                this.store.loading ? <Spinner color="white" /> : <Text style={style.text}>CREATE</Text>
            }
            </Button>
            </View>
            </Tab>
            <Tab heading={<TabHeading style={{ flexDirection: 'column'}}><Icon name="link" active ={true} style={{color:"#02cda2", fontSize: 50}} /><Text style={style.tabHeading}>LINK</Text></TabHeading>}>
            <View>

            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
        title="Pick an image from camera roll"
        onPress={this._pickImage}
        />
        {image &&
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        </View>
            <Field
                label="Title"
                defaultValue={this.store.task.title}
                onChange={title => this.store.title = title}
            />
            <Field
                label="Project"
                defaultValue={this.store.task.project}
                onChange={project => this.store.project = project}
            />

            <Button primary full onPress={this.save}>
            {
                this.store.loading ? <Spinner color="white" /> : <Text style={style.text}>CREATE</Text>
            }
            </Button>
            </View>
            </Tab>
        </Tabs>

        </BaseContainer>;
    }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });
    if (!result.cancelled) {
      this.store.image =result.uri;
      this.store.imagename =getFilenameFromUri(result.uri);

      this.store.imageextension = getFileExtensionFromFilename(result.uri);

      this.setState({ image: result.uri });
    }
  };
}
const getFileExtensionFromFilename = (filename: string): string => {
  let match = /\.(\w+)$/.exec(filename);
  let type = match ? `image/${match[1]}` : `image`;
  return type;
};
const getFilenameFromUri = (uri: string): string => {
  return uri.split('/').pop();
};
const style = StyleSheet.create({
    icon: {
        color: variables.brandInfo,
        fontSize: 30
    },
    avatars: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    avatar: {
        marginRight: variables.contentPadding / 2
    },
    text: {
        color: "white"
    },
    tabHeading: {
        color: variables.gray
    },
    tab: {
        backgroundColor: "#f8f8f8",
        padding: variables.contentPadding * 4
    }
});
