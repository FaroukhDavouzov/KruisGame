import firebase from '../database/firebase';

export async function getRoomById(roomId){
    var snapshot = await (await firebase.firestore().collection("rooms").doc(roomId).get()).get("player1")
    return snapshot
}