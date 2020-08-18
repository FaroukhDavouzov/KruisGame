import React, { Component, useEffect, useState } from 'react';
import { Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View,Text,FlatList} from 'react-native';
import firebase from '../database/firebase';
import CheckBox from '@react-native-community/checkbox';
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

function PendingInvitesScreen(){
    const [loading, setLoading] = useState(true); // Set loading to true on component mount
    const [pendingInvites, setPendingInvites] = useState([]); // Initial empty array of users

    useEffect(() => {
        const subscriber = firebase.firestore().collection("users").doc(firebase.auth().currentUser.email).collection("pendingInvitesFrom").onSnapshot((querysnapshot) => {
            const users = []
            querysnapshot.forEach(documentsnapshot => {
                users.push({
                    ...documentsnapshot.data(),
                    key:documentsnapshot.id
                })
            })
            setPendingInvites(users)
            setLoading(false)
        })
        return () => subscriber()
    },[])

    if(loading){
        return <ActivityIndicator></ActivityIndicator>
    }

    function acceptInvite(email){
        var currentUserEmail = firebase.auth().currentUser.email
        firebase.firestore().collection("users")
        .doc(firebase.auth().currentUser.email).collection("pendingInvitesFrom").doc(email).delete()
        .then(
            firebase.firestore().collection("users").doc(currentUserEmail).collection("friends").doc(email).set({
                email:email,
            })
            .then(
                firebase.firestore().collection("users").doc(email).collection("friends").doc(currentUserEmail).set({
                    email:currentUserEmail
                })
                .then(
                    alert("Accepted invite!")
                ).catch((ex) => alert(ex))
            ).catch((ex) => alert(ex))
        ).catch((ex) => alert(ex))
    }

    return (
        <FlatList
            data={pendingInvites}
            ListEmptyComponent={
                <View>
                    <Text style={{ fontWeight: 'bold' }}>No Pending Invites</Text>
                </View>
            }
            renderItem={({ item }) => (
            <View style={styles.pendingInvite}>
                <Text>{item.email}</Text>
                <TouchableOpacity onPress={() => acceptInvite(item.email)}>
                    <View style={styles.icon}><AntDesign name="check" size={24} color="black" /></View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={styles.icon}><AntDesign name="close" size={24} color="black" /></View>
                </TouchableOpacity>
            </View>
            )}
        />
        ); 
}

const styles = StyleSheet.create({
    pendingInvite:{
        flex: 1,
        display:"flex",
        justifyContent:"center",
        alignItems: 'center',
        flexDirection:"row"
    },
    icon:{
        marginLeft:10,
    },
})

export default PendingInvitesScreen