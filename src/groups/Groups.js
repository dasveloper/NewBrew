
/**
 * @flow
 */

import React from 'react';
import { Button, ScrollView } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Login from "../login/Login";
import Profile from "../profile/Profile";
import Home from "../home/Home";
import Lists from "../lists/Lists";

const MyNavScreen = ({ navigation, banner }) => (
  <ScrollView>
    <Button
      onPress={() => navigation.navigate('Profile', { name: 'Jane' })}
      title="Go to a profile screen"
    />
    <Button
      onPress={() => navigation.navigate('Photos', { name: 'Jane' })}
      title="Go to a photos screen"
    />
    <Button onPress={() => navigation.goBack(null)} title="Go back" />
  </ScrollView>
);

const MyHomeScreen = ({ navigation }) => (
  <MyNavScreen banner="Home Screen" navigation={navigation} />
);


Home.navigationOptions = {
  title: 'Search',
  headerStyle :{
      backgroundColor:'#fff'

  }
};
Profile.navigationOptions = {
  title: 'Brewery Details',
  headerStyle :{
      backgroundColor:'#fff'

  }
};
Lists.navigationOptions = {
  title: 'Beer Details',
  headerStyle :{
      backgroundColor:'#fff'

  }
};
const SimpleStack = StackNavigator({
  Home: {
    screen: Home,
  },
  Profile: {
    path: '../sign-up/Signup',
    screen: Profile,
  },
  Photos: {
    path: '../login/Login',
    screen: Lists,
  },
});

export default SimpleStack;
