// @flow
import * as firebase from "firebase";

import {User} from "../Model";
import {DEFAULT_USER} from "../Constants";

var config = {
  apiKey: "AIzaSyC3g5NtvZ5Er8HFeE58YrIbkIOSdz80v7w",
  authDomain: "hourglass-fd5a1.firebaseapp.com",
  databaseURL: "https://hourglass-fd5a1.firebaseio.com",
  projectId: "hourglass-fd5a1",
  storageBucket: "hourglass-fd5a1.appspot.com",
  messagingSenderId: "397292812658"
};

export default class Firebase {
    static database: firebase.database.Database;
    static auth: firebase.auth.Auth;
    static storage: firebase.storage.Storage;

    static init() {
        firebase.initializeApp(config);
        Firebase.auth = firebase.auth();
        Firebase.database = firebase.database();
        Firebase.storage = firebase.storage();
    }

    static get userRef(): firebase.database.Reference {
        return Firebase.database.ref(`users/${Firebase.auth.currentUser.uid}`);
    }
    static get taskRef(): firebase.database.Reference {
        return Firebase.database.ref(`tasks/`);

    }

    static async getUser(): Promise{
        const snapshot = await Firebase.database.ref(`users/${Firebase.auth.currentUser.uid}`).once("value");
        return snapshot.val();
    }
    static async getTask(): Promise{
      console.log("in")
      const snapshot = await Firebase.database.ref(`tasks`).once("value");
    //  console.log(snapshot)
      return snapshot.val()
          ?
              _.map(snapshot.val(), task => task)
                  .filter(task => {
                      ;
                      return !task.done;
                  })
          :
              []
          ;

    };

    static async setDefaultUserIfEmpty(): Promise<void> {
      //  const uid = Firebase.auth.currentUser.uid;
        //const snapshot = await Firebase.database.ref(`users/${uid}`).once("value");
        //if (snapshot.val() === null) {
          //  await Firebase.database.ref(`users/${uid}`).set(DEFAULT_USER);
        //}
    }
}
