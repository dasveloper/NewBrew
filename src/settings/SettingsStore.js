// @flow
import {observable, computed} from "mobx";
import moment from "moment";
import  {debounce} from "throttle-debounce";

import {Profile} from "../Model";
import {Firebase} from "../components";

export default class SettingsStore {

    @observable _profile: Profile;
    @computed get profile(): Profile { return this._profile; }
    set profile(profile: Profile) { this._profile = profile; }

    setBirthday = debounce(3000, (birthday: string) => {
        const date = moment(birthday, "DD/MM/YYYY");
        if (date.isValid()) {
            const timestamp = parseInt(date.format("X"), 10);
            Firebase.userRef.child("profile/birthday").set(timestamp);
        } else {
            alert("Invalid Date Format");
        }
    });

    setName = debounce(1000, (name: string) => {
        Firebase.userRef.child("profile/name").set(name);
    });

    constructor() {
        Firebase.getUser().then(user => this.profile = user.profile);
    }

    toggleEmailNotifications(done: boolean) {
        Firebase.userRef.child("profile/emailNotifications").set(done);
    }

    togglePhoneNotifications(done: boolean) {
        Firebase.userRef.child("profile/phoneNotifications").set(done);
    }
}