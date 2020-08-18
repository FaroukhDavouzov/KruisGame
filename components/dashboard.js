// components/dashboard.js

import React, { Component } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import firebase from '../database/firebase';
import { EvilIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class Dashboard extends Component {
  constructor() {
    super();
    this.state = { 
      uid: ''
    }
  }

  signOut = () => {
    firebase.auth().signOut().then(() => {
      this.props.navigation.navigate('Login')
    })
    .catch(error => this.setState({ errorMessage: error.message }))
  }  

  render() {
    this.state = { 
      displayName: firebase.auth().currentUser.displayName,
      uid: firebase.auth().currentUser.uid
    }    
    return (
      <View style={styles.container}>
        <Text style = {styles.textStyle}>
          Hello, {this.state.displayName}
        </Text>
        <TouchableOpacity
        style={styles.button}
        onPress={() => this.signOut()}>
            <Text style={styles.textStyleButton}>Logout</Text>
        </TouchableOpacity>
        <TouchableOpacity
        style={styles.button}
        onPress={() =>this.props.navigation.navigate('AddFriend')}
        >
            <Text style={styles.textStyleButton}>Add Friend</Text>
        </TouchableOpacity>
        <TouchableOpacity
        style={styles.button}
        onPress={() =>this.props.navigation.navigate('PendingInvites')}
        >
            <Text style={styles.textStyleButton}>Pending Invites</Text>
        </TouchableOpacity>
        <TouchableOpacity
        style={styles.button}
        onPress={() =>this.props.navigation.navigate('Friends')}
        >
            <Text style={styles.textStyleButton}>Friends</Text>
        </TouchableOpacity>
        <TouchableOpacity
        style={styles.button}
        onPress={() =>this.props.navigation.navigate('GameInvites')}
        >
            <Text style={styles.textStyleButton}>Game Invites</Text>
        </TouchableOpacity>
        <TouchableOpacity
        style={styles.button}
        onPress={() =>this.props.navigation.navigate('Games')}
        >
            <Text style={styles.textStyleButton}>Games</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display:"flex",
    alignItems:"center",
    justifyContent: "center",
    backgroundColor: '#fff'
  },
  textStyle: {
    fontSize: 15,
    marginBottom: 20
  },
  button: {
    alignItems: "center",
    backgroundColor: "#3740FE",
    padding: 10,
    marginBottom:10
  },
  textStyleButton:{
      fontSize:15,
      color:"#fff"
  }
});