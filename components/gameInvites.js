import React, { Component, useEffect, useState } from 'react';
import { Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View,Text,FlatList} from 'react-native';
import firebase from '../database/firebase';
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function GameInvites(){
    const [loading, setLoading] = useState(true); // Set loading to true on component mount
    const [gameInvites, setGameInvites] = useState([]); // Initial empty array of users
    const [currentUser,setCurrentUser] = useState()
    
    useEffect(() => {
        const subscriber = firebase.firestore().collection("users").doc(firebase.auth().currentUser.email).collection("gameInvites").onSnapshot((querysnapshot)=>{
            const invites = []
            querysnapshot.forEach(documentsnapshot => {
                invites.push({
                    ...documentsnapshot.data(),
                    key:documentsnapshot.id
                })
            })
            setGameInvites(invites)
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

    const acceptGameInvite = (email) => {
        firebase.firestore().collection("rooms").add({
            player1: currentUser.email,
            player2:email
        })
        .then(docRef=>{
            firebase.firestore().collection("users").doc(currentUser.email).collection("games").doc(email).set({
                roomId: docRef.id,
            }).then(()=>{
                firebase.firestore().collection("users").doc(email).collection("games").doc(currentUser.email).set({
                    roomId: docRef.id
                })
            }).catch((ex)=> alert(ex))
            .catch((ex)=>alert(ex))
        })
        .then(()=>{
            firebase.firestore().collection("users").doc(currentUser.email).collection("gameInvites").doc(email).delete()
            .then(()=>{
            })
            .catch((ex) => alert(ex))
        })
    }
    
    return (
        <FlatList
        data={gameInvites}
        ListEmptyComponent={
            <View>
                <Text style={{ fontWeight: 'bold' }}>No game invites</Text>
            </View>
        }
        renderItem={({ item }) => (
            <View style={styles.gameInvite}>
                <Text>{item.email}</Text>
                <TouchableOpacity
                onPress={() => acceptGameInvite(item.email)}
                style={styles.button}>
                    <Text style={{color:"#fff"}}>Accept invite</Text>
                </TouchableOpacity>
            </View>
        )}
    />
    )
}
const styles = StyleSheet.create({
    gameInvite:{
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