import React, { Component, useEffect, useState } from 'react';
import { Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View,Text,FlatList} from 'react-native';
import firebase from '../database/firebase';
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationHelpersContext } from '@react-navigation/native';
import {getGames} from '../components/gamesApi'

export default class Games extends Component{

    state={
        games: [],
        currentUser: ""
    }

    goToGame = (email) => {
        firebase.firestore().collection("users").doc(firebase.auth().currentUser.email).collection("games").doc(email).get().then((documentsnapshot)=>{
            this.props.navigation.navigate("Room",{roomId:documentsnapshot.get("roomId")})
        })
    }

    onGamesReceived = (games)=>{
        console.log(games)
        this.setState(prevState =>({
            games:prevState.games = games
        }))
    }

    componentDidMount(){
        getGames(this.onGamesReceived)
    }

    render (){
        return( 
            <FlatList
        data={this.state.games}
        ListEmptyComponent={
            <View>
                <Text style={{ fontWeight: 'bold' }}>No games</Text>
            </View>
        }
        renderItem={({ item }) => (
            <View style={styles.game}>
                <Text>{item.key}</Text>
                <TouchableOpacity
                onPress={() => this.goToGame(item.key)}
                style={styles.button}>
                    <Text style={{color:"#fff"}}>Go to Game</Text>
                </TouchableOpacity>
            </View>
        )}
    />
        )
    }
}

const styles = StyleSheet.create({
    game:{
        marginTop:10,
        flex: 1,
        display:"flex",
        justifyContent:"center",
        alignItems: 'center',
        flexDirection:"row"
    },
    button: {
        alignItems: "center",
        backgroundColor: "#3740FE",
        padding: 2,
        marginLeft:15
      }
})