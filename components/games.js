import React, { Component, useEffect, useState } from 'react';
import { Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View,Text,FlatList} from 'react-native';
import firebase from '../database/firebase';
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Games(){
    const [loading, setLoading] = useState(true); // Set loading to true on component mount
    const [games, setGames] = useState([]); // Initial empty array of users
    const [currentUser,setCurrentUser] = useState()

    useEffect(()=>{
        const subscriber = firebase.firestore().collection("users").doc(firebase.auth().currentUser.email).collection("games").onSnapshot((querySnapshot) => {
            const gamesFromDb = []
            querySnapshot.forEach((documentsnapshot) =>{
                gamesFromDb.push({
                    ...documentsnapshot.data(),
                    key:documentsnapshot.id
                })
            })
            setGames(gamesFromDb)
            setLoading(false)
            setCurrentUser(firebase.auth().currentUser)
        })
        return () => subscriber()
    },[])

    if(loading){
        return(
            <ActivityIndicator></ActivityIndicator>
        )
    }

    const goToGame = (email) => {

    }

    return (
        <FlatList
        data={games}
        ListEmptyComponent={
            <View>
                <Text style={{ fontWeight: 'bold' }}>No games</Text>
            </View>
        }
        renderItem={({ item }) => (
            <View style={styles.game}>
                <Text>{item.key}</Text>
                <TouchableOpacity
                onPress={() => goToGame(item.email)}
                style={styles.button}>
                    <Text style={{color:"#fff"}}>Go to Game</Text>
                </TouchableOpacity>
            </View>
        )}
    />
    )
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