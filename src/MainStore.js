// @flow
import moment from "moment";
import * as _ from "lodash";
import {observable, computed} from "mobx";

import {Firebase} from "./components";
import type {User, Task} from "./Model";

export default class MainStore {

    @observable _user: User;
    @computed get user(): User { return this._user; }
    set user(user: User) { this._user = user; }

    @observable _uupvotedPosts: Task[];
    @computed get upvotedPosts(): upvotedPosts { return this._upvotedPosts; }
    set upvotedPosts(upvotedPosts: Task[]) { this._upvotedPosts = upvotedPosts; }

    @observable _userVotesDown: Task[];
    @computed get downvotedPosts(): downvotedPosts { return this._downvotedPosts; }
    set downvotedPosts(downvotedPosts: Task[]) { this._downvotedPosts = downvotedPosts; }


    init() {

      Firebase.userRef.on("value",snapshot => {
        this.user = snapshot.val();

      });

      Firebase.userRef.child("votes/downvotes").on("value",snapshot => {
        this.downvotedPosts = snapshot.val();
      });
      fetch('http://138.197.98.89/jbjbhbcxdxrsz/testUsers.php')
      .then((response) => response.json())
      .then((responseData) => {
            this.upvotedPosts = responseData;

         }).done();

    }

    get taskCount(): number {
        return this.user ? Object.keys(this.user.tasks).length : 0;
    }

    get completedTaskCount():  Task[] {

        return this.user ? _.map(this.user.tasks, task => task).filter(task => task.done).length : 0;
    }
    get userProfilePic(): String {
        return this.user ? this.user.profile.profilePic : "";
    }
    getUpvotedPosts(): number {
      return this.upvotedPosts;
    }
    getDownvotedPosts(): number {
      return this.downvotedPosts;
    }
    getCompletedTasks(): number {
      return this.user
          ?
              _.map(this.user.tasks, task => task)
                  .filter(task => {
                      ;
                      return task.done;
                  })
          :
              []
          ;
    }
    getRunningTasks(): number {
      console.log("1st");
      console.log(this.user.tasks);
      return this.user
          ?
              _.map(this.user.tasks, task => task)
                  .filter(task => {
                      ;
                      return !task.done;
                  })
          :
              []
          ;
    }
    get overdueTaskCount(): number {
        const now = (new Date()).getTime() / 1000;
        return this.user ? _.map(this.user.tasks, task => task)
                .filter(task => !task.done)
                .filter(task => task.time <= now).length
            : 0;
    }


    getTasksOfDay(day: number, month: number): Task[] {
        return this.user
            ?
                _.map(this.user.tasks, task => task)
                    .filter(task => {
                        const time = moment.unix(task.time);
                        return day === time.date() && month === time.month();
                    })
            :
                []
            ;

    }

    getTasksOfWeek(week: number): Task[] {
        return this.user
            ?
                _.map(this.user.tasks, task => task)
                    .filter(task => moment.unix(task.time).week() === week)
            :
                []
        ;
    }

    getTasksOfMonth(month: number): Task[] {
        return this.user
            ?
                _.map(this.user.tasks, task => task)
                    .filter(task => moment.unix(task.time).month() === month)
            :
                []
        ;
    }
}
