import React, { Component } from 'react';
import { Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View, Alert, Text } from 'react-native';
import firebase from '../database/firebase';
export default function About(){
return(
<View>
    <Text style={styles.textStyle}>
        Welcome to the About screen
    </Text>
</View>    
)    
}

const styles=StyleSheet.create({
    textStyle:{
        fontSize:30
    }
})