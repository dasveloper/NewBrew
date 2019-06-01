// @flow
import {observable, computed} from "mobx";

import {Firebase} from "../components";

export default class SignUpStore {

    @observable _loading: boolean = false;
    @computed get loading(): boolean { return this._loading; }
    set loading(loading: boolean) { this._loading = loading; }

    @observable _email: string = "";
    @computed get email(): string { return this._email; }
    set email(email: string) { this._email = email; }

    @observable _password: string = "";
    @computed get password(): string { return this._password; }
    set password(password: string) { this._password = password; }

    @observable _displayName: string = "";
    @computed get displayName(): string { return this._displayName; }
    set displayName(displayName: string) { this._displayName = displayName; }


    async signIn(): Promise<void> {
        const {email, password, displayName} = this;
        this.loading = true;
        try {
            await Firebase.auth.createUserWithEmailAndPassword(email, password)

           .then(function(user){
              const newuser = Firebase.auth.currentUser;
              const uid = newuser.uid;
                Firebase.database.ref(`users/${uid}`).set(
                  {
                  reach:{
                      "reachCount" : 0
                  },
                  profile : {
                        "name" : displayName,
                        "emailNotifications" : true,
                        "phoneNotifications" : true,
                    }
                  }
                  );
            });

            this.loading = false;
        } catch(e) {
            this.loading = false;
            throw e;
        }
    }
}
