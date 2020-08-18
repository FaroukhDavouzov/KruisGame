import React, { Component, useEffect, useState } from 'react';
import { Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View,Text,FlatList} from 'react-native';
import firebase from '../database/firebase';
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function friends(){
    const [loading, setLoading] = useState(true); // Set loading to true on component mount
    const [friends, setFriends] = useState([]); // Initial empty array of users
    const [currentUser,setCurrentUser] = useState()

    useEffect(() => {
        const subscriber = firebase.firestore().collection("users").doc(firebase.auth().currentUser.email).collection("friends").onSnapshot((querysnapshot)=>{
            const friendsFromDb = []
            querysnapshot.forEach(documentsnapshot => {
                friendsFromDb.push({
                    ...documentsnapshot.data(),
                    key:documentsnapshot.id
                })
            })
            setFriends(friendsFromDb)
            setLoading(false)
            setCurrentUser(firebase.auth().currentUser)
        })
        return () => subscriber()
    },[])

    const sendGameInvite = (email) => {
        if(alreadyInGameWithOtherUser){
            alert("You're already in a game with this user")
        }else{
            firebase.firestore().collection("users").doc(email).collection("gameInvites").doc(currentUser.email).set({
                email : currentUser.email
            }).then((res) => {
                alert("Game invite send!")
            }).catch((err) => {
                alert(err)
            })
        }
    }

    const alreadyInGameWithOtherUser = (email) => {
        firebase.firestore().collection("users").doc(currentUser.email).collection("games").doc(email).onSnapshot((documentsnapshot) =>{
            if(documentsnapshot.exists){
                return true
            }else{
                return false
            }
        })
    }
    

    if(loading){
        return <ActivityIndicator></ActivityIndicator>
    }

    return (
        <FlatList
        data={friends}
        ListEmptyComponent={
            <View>
                <Text style={{ fontWeight: 'bold' }}>No friends</Text>
            </View>
        }
        renderItem={({ item }) => (
            <View style={styles.friend}>
                <Text>{item.email}</Text>
                <TouchableOpacity
                onPress={() => sendGameInvite(item.email)}
                style={styles.button}>
                    <Text style={{color:"#fff"}}>Invite for a game</Text>
                </TouchableOpacity>
            </View>
        )}
    />
    )
}
const styles = StyleSheet.create({
    friend:{
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