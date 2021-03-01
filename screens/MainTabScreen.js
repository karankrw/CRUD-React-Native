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

import firestore from '@react-native-firebase/firestore';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontawesome from 'react-native-vector-icons/FontAwesome';
import Aptdesign from 'react-native-vector-icons/AntDesign';


import HomeScreen from "./HomeScreen"
import DetailScreen from "./DetailsScreen"
import StudentDetails from "./StudentDetails"


import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

const HomeStack = createStackNavigator();
const DetailStack = createStackNavigator();
const StudentStack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();



//Bottom Tab Navigator
const MainTabScreen = () => (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#FF6347"
      inactiveColor="#fff"
    >
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
            title: "Home",
          tabBarLabel: 'Home',
          tabBarColor: '#788eec',
          tabBarIcon: ({ color }) => (
            <Fontawesome name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Details"
        component={DetailStackScreen}
        options={{
            title: "Details",
          tabBarLabel: 'Add Student',
          tabBarColor: '#FF6347',
          tabBarIcon: ({ color }) => (
            <Fontawesome name="plus-circle" color={color} size={23} />
          ),
        }}
      />
    </Tab.Navigator>
  );
  


  //Home Screen
const HomeStackScreen = ({navigation}) => (
    <HomeStack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: '#788eec'
      },
      headerTintColor: '#ffffff',
      headerTitleStyle: {
        fontWeight: 'bold',
      }
    }}>
      <HomeStack.Screen name="Home" component={HomeScreen}
      options={{
          title: 'Students',
          headerLeft: () => {
              <Ionicons.Button name="ios-menu" size={25}
              backgroundColor="#fff"
               onPress={() => navigation.openDrawer()}></Ionicons.Button>
          }
      }}></HomeStack.Screen>
    </HomeStack.Navigator>
  )
  
  
//Details Screen
  const DetailStackScreen = ({navigation}) => (
    <DetailStack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: '#FF6347'
      },
      headerTintColor: '#ffffff',
      headerTitleStyle: {
        fontWeight: 'bold',
      }
    }}>
      <HomeStack.Screen name="Enter Details" component={DetailScreen} />
    </DetailStack.Navigator>
  )


//Details Screen
const StudentDetailsStackScreen = ({navigation}) => (
    <StudentStack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: '#54F878'
      },
      headerTintColor: '#ffffff',
      headerTitleStyle: {
        fontWeight: 'bold',
      }
    }}>
      <HomeStack.Screen name="Student Details" component={StudentDetails} />
    </StudentStack.Navigator>
  )
 
  

  export default MainTabScreen;