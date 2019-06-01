
/**
 * @flow
 */

import React from 'react';
import { StackNavigator } from 'react-navigation';
import Breweries from "../timeline/Timeline";
import Profile from "../profile/Profile";



Breweries.navigationOptions = {
  title: 'Breweries',
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

const SimpleStack = StackNavigator({
  Breweries: {
    screen: Breweries,
  },
  Profile: {
    path: '../sign-up/Signup',
    screen: Profile,
  }
});

export default SimpleStack;
