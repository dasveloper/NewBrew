// @flow
import React, {Component} from "react";
import {Dimensions} from "react-native";
import {StyleProvider} from "native-base";
import {StackNavigator, DrawerNavigator} from "react-navigation";
import {Font, AppLoading} from "expo";
import {useStrict, observable, computed} from "mobx";
import {observer, Provider} from "mobx-react/native";

import {Images, Firebase} from "./src/components";
import {Login} from "./src/login";
import {SignUp} from "./src/sign-up";
import {Walkthrough} from "./src/walkthrough";
import {Drawer} from "./src/drawer";
import {Home} from "./src/home";
import {Calendar} from "./src/calendar";
import {Overview} from "./src/overview";
import {Groups} from "./src/groups";
import {BrewNav} from "./src/brewnav";
import {BreweryNav} from "./src/brewerynav";
import {BrewDetails} from "./src/brewdetails";

import {Lists} from "./src/lists";
import {Brews} from "./src/brews";

import {Profile} from "./src/profile";
import {Timeline} from "./src/timeline";
import {Settings} from "./src/settings";
import {Create} from "./src/create";
import MainStore from "./src/MainStore";

import getTheme from "./native-base-theme/components";
import variables from "./native-base-theme/variables/commonColor";

@observer
export default class App extends Component {

    store = new MainStore();

    @observable _ready: boolean = false;
    @observable _authStatusReported: boolean = false;
    @observable _isLoggedIn: boolean = false;

    @computed get ready(): boolean { return this._ready; }
    set ready(ready: boolean) { this._ready = ready; }

    @computed get authStatusReported(): boolean { return this._authStatusReported; }
    set authStatusReported(authStatusReported: boolean) { this._authStatusReported = authStatusReported; }

    @computed get isLoggedIn(): boolean { return this._isLoggedIn; }
    set isLoggedIn(isLoggedIn: boolean) { this._isLoggedIn = isLoggedIn; }

    componentWillMount() {
        const promises = [];
        promises.push(
            Font.loadAsync({
                "Avenir-Book": require("./fonts/Avenir-Book.ttf"),
                "Avenir-Light": require("./fonts/Avenir-Light.ttf")
            })
        );
        Promise.all(promises.concat(Images.downloadAsync()))
            .then(() => this.ready = true)
            // eslint-disable-next-line
            .catch(error => console.error(error))
        ;
        useStrict(true);
        Firebase.init();
        Firebase.auth.onAuthStateChanged(async user => {
            this.isLoggedIn = !!user;
            if (this.isLoggedIn) {
                await Firebase.setDefaultUserIfEmpty(user.uid);
                this.store.init();
            }
            this.authStatusReported = true;
        });
    }

    render(): React$Element<*> {
        const {ready, authStatusReported, isLoggedIn, store} = this;
        const onNavigationStateChange = () => undefined;
        return <Provider {...{store}}>
            <StyleProvider style={getTheme(variables)}>
                {
                    ready && authStatusReported ?
                        (
                            isLoggedIn ?
                                <PublicNavigator {...{onNavigationStateChange}} />
                                :
                                <PrivateNavigator {...{onNavigationStateChange}} />
                        )
                        :
                        <AppLoading/>
                }
            </StyleProvider>
        </Provider>;
    }
}

const MainNavigator = DrawerNavigator({
  BrewNav: { screen: BrewNav },
  BreweryNav: { screen: BreweryNav },
  BrewDetails: { screen: BrewDetails },

  Groups: { screen: Groups },

  Brews: { screen: Brews },

  Overview: { screen: Overview },
    Home: { screen: Home },
    Calendar: { screen: Calendar },
    Profile: { screen: Profile },
    Timeline: { screen: Timeline },
    Settings: { screen: Settings },
    Create: { screen: Create }
}, {
    drawerWidth: Dimensions.get("window").width,
    contentComponent: Drawer
});

const navigatorOptions = {
    headerMode: "none"
};

const PrivateNavigator = StackNavigator({
    Login: { screen: Login },
    SignUp: { screen: SignUp }
}, navigatorOptions);

const PublicNavigator = StackNavigator({
    Walkthrough: { screen: Walkthrough },
    Main: { screen: MainNavigator }
}, navigatorOptions);

export {PublicNavigator};
