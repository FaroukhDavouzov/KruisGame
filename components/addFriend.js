// screens/AddUserScreen.js

import React, { Component } from 'react';
import { Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View, Alert } from 'react-native';
import firebase from '../database/firebase';

class AddUserScreen extends Component {
  constructor() {
    super();
    this.currentUser = firebase.auth().currentUser;
    this.dbRef = firebase.firestore().collection('users');
    this.state = {
      email: '',
      isLoading: false
    };
  }
  
  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  doesUserExistWithEmailInFriendList(){
    var docref = firebase.firestore().collection("users").doc(this.currentUser.email).collection("friends").doc(this.state.email);
    return docref.get().then((snapshot) => {
      if(snapshot.exists){
        return true;
      }else{
        return false;
      }
    })
  }

  sendFriendInvite() {
    if(this.state.email === '' || this.state.email == this.currentUser.email){
        if(this.state.email === '' ){
            alert('Fill at least the email!')
        }
        if(this.state.email == this.currentUser.email){
            alert('You can not send an invite to yourself')
        }
    } else {
      this.setState({
        isLoading: true,
      });
      var docRef = this.dbRef.doc(this.state.email)
      docRef.get().then((snapshot) =>{
          if(!snapshot.exists || this.doesUserExistWithEmailInFriendList()){
            if(!snapshot.exist){
              alert("user not defined");
              this.setState({
                  isLoading: false,
                  email:""
                });
            }
            if(this.doesUserExistWithEmailInFriendList){
              alert("This user is already your friend");
              this.setState({
                  isLoading: false,
                  email:""
                });
            }
          }else{
            this.dbRef.doc(this.state.email).collection("pendingInvitesFrom").doc(this.currentUser.email).set({
                email: this.currentUser.email,
              }).then((res) => {
                this.setState({
                  email: '',
                  isLoading: false,
                });
                Alert.alert("Friend invite send!")
                this.props.navigation.navigate('Dashboard')
              })
              .catch((err) => {
                alert("Error found: ", err);
                this.setState({
                  isLoading: false,
                });
              });
          }
      })
    }
  }

  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E"/>
        </View>
      )
    }
    return (
      <ScrollView style={styles.container}>
        <View style={styles.inputGroup}>
          <TextInput
              multiline={true}
              numberOfLines={4}
              placeholder={'Email'}
              value={this.state.email}
              onChangeText={(val) => this.inputValueUpdate(val, 'email')}
          />
        </View>
        <View style={styles.button}>
          <Button
            title='Add User'
            onPress={() => this.sendFriendInvite()} 
            color="#19AC52"
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default AddUserScreen;