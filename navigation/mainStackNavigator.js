import * as React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

import Login from '../components/login';
import Signup from '../components/signup';
import Dashboard from '../components/dashboard';
import AddUserScreen from '../components/addFriend';
import PendingInvitesScreen from '../components/pendingInvites'
import Friends from '../components/friends'
import GameInvites from '../components/gameInvites'
import Games from '../components/games'
import about from '../components/about'


const Stack = createStackNavigator()

export default function MyStack() {
    return (
      <Stack.Navigator
        initialRouteName="Signup"
        screenOptions={{
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#3740FE',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen 
          name="Signup" 
          component={Signup} 
          options={{ title: 'Signup' }}
        />       
        <Stack.Screen 
          name="Login" 
          component={Login} 
          options={
            {title: 'Login'},
            {headerLeft: null} 
          }
        />
        <Stack.Screen 
         name="Dashboard" 
         component={Dashboard} 
         options={
           { title: 'Dashboard' },
           {headerLeft: null} 
         }
        />
        <Stack.Screen 
         name="AddFriend" 
         component={AddUserScreen} 
         options={
           { title: 'Add a friend' },
           {headerLeft: null} 
         }
        />
        <Stack.Screen 
         name="PendingInvites" 
         component={PendingInvitesScreen} 
         options={
           { title: 'Pending Invites' },
           {headerLeft: null} 
         }
        />
        <Stack.Screen 
         name="Friends" 
         component={Friends} 
         options={
           { title: 'Friends' },
           {headerLeft: null} 
         }
        />
        <Stack.Screen 
         name="GameInvites" 
         component={GameInvites} 
         options={
           { title: 'Game Invites' },
           {headerLeft: null} 
         }
        />
        <Stack.Screen 
         name="Games" 
         component={Games} 
         options={
           { title: 'Games' },
           {headerLeft: null} 
         }
        />
        <Stack.Screen 
         name="About" 
         component={about} 
         options={
           { title: 'About' },
           {headerLeft: null} 
         }
        />
      </Stack.Navigator>
    );
  }