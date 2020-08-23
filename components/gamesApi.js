import firebase from '../database/firebase';

export async function getGames(gamesRetrieved){
    var games = []
    var querysnapshot = await firebase.firestore().collection("users").doc(firebase.auth().currentUser.email).collection("games").get()

    querysnapshot.forEach((documentSnapshot)=>{
        games.push({
            ...documentSnapshot.data(),
            key:documentSnapshot.id
        })
    })

    gamesRetrieved(games)
}