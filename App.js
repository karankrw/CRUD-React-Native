/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  StatusBar,
  TouchableOpacity
} from 'react-native';


import Ionicons from 'react-native-vector-icons/Ionicons';
import Evilicons from 'react-native-vector-icons/EvilIcons';
import Aptdesign from 'react-native-vector-icons/';



//Importing Navigators here
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';


//Importing Screens here
import HomeScreen from "./screens/HomeScreen"
import DetailScreen from "./screens/DetailsScreen"
import MainTabScreen from './screens/MainTabScreen';
import { DrawerContent } from './screens/DrawerContent';


//Creating Navigators here
const HomeStack = createStackNavigator();
const DetailStack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createMaterialBottomTabNavigator();




//Logical Code




export default function App() {
  return (
    <NavigationContainer>
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={MainTabScreen} />
      {/*<Drawer.Screen name="Details" component={DetailsScreen} />*/}
    </Drawer.Navigator>
    </NavigationContainer>
  );
}

