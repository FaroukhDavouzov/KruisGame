import React, { Component, useEffect, useState } from 'react';
import { Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View, Alert,Text } from 'react-native';
import firebase from '../database/firebase';
import {getRoomById} from "../components/roomApi"
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {MaterialCommunityIcons as Icon} from 'react-native-vector-icons'

export default function Room({route,navigation}){
    const {roomId} = route.params
    const [player1,setPlayer1] = useState("")
    const [player2,setPlayer2] = useState("")
    const [player1Score,setPlayer1Score] = useState()
    const [player2Score,setPlayer2Score] = useState()

    useEffect(()=>{
        async function getAllPlayers(){
           await getPlayers() 
        }
        getAllPlayers()
    },[])
    
    const getPlayers = async () => {
        var snapshot = await firebase.firestore().collection("rooms").doc(roomId).get()
        var player1 = await snapshot.get("player1")
        var player2 = await snapshot.get("player2")
        var score1 = await snapshot.get("player1Score")
        var score2 = await snapshot.get("player2Score")
        setPlayer1(player1)
        setPlayer2(player2)
        setPlayer1Score("player1Score")
        setPlayer2Score("player2Score")
    }

    return(
        <View style={styles.container}>
            <View style={styles.player}>
                <Text style={styles.textMarginRight}>player1: {player1}</Text><Text></Text>
            </View>
            <View style={styles.player}>
                <Text style={styles.textMarginRight}>player2: {player2}</Text>
            </View>
            <View style={{display:"flex",flexDirection:"row"}}>
                <TouchableOpacity style={styles.button}>
                    <Text style={{color:"#fff"}}>Rock</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={{color:"#fff"}}>Paper</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={{color:"#fff"}}>Scissors</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        alignItems:"center"
    },
    player:{
        display:"flex",
        flexDirection:"row",
        marginBottom:20
    },
    textMarginRight:{
        marginRight:20
    },
    button: {
        alignItems: "center",
        backgroundColor: "#3740FE",
        padding: 10,
        marginBottom:10,
        marginRight:10
      }
})