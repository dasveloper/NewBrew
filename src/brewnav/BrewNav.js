
/**
 * @flow
 */

import React from 'react';
import { Button, ScrollView } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Brews from "../brews/Brews";
import BrewDetails from "../brewdetails/BrewDetails";




Brews.navigationOptions = {
  title: 'Brews',
  headerStyle :{
      backgroundColor:'#fff'

  }
};
BrewDetails.navigationOptions = {
  headerStyle :{
      backgroundColor:'#fff'

  }
};

const SimpleStack = StackNavigator({
  Brews: {
    screen: Brews,
  },
  BrewDetails: {
    path: '../sign-up/Signup',
    screen: BrewDetails,
  }
});

export default SimpleStack;
