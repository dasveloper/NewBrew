// @flow
import {observable, computed} from "mobx";
import moment from "moment";
import  {debounce} from "throttle-debounce";
import { RNS3 } from "react-native-aws3";

import type {Task, Participants} from "../Model";
import {Firebase} from "../components";

const defaultTask = {
    title: "New Task",
    time: parseInt(moment().format("X"), 10),
    project: "My Project",
    participants: {},
    done: false,
};

export default class CreateStore {

    task: Task = defaultTask;

    @observable _loading = false;
    @computed get loading(): boolean { return this._loading; }
    set loading(loading: boolean) { this._loading = loading; }

    @computed get title(): string { return this.task.title; }
    set title(title: string) { this.task.title = title; }

    @computed get time(): number { return this.task.time; }
    set time(time: number) { this.task.time = time; }

    @computed get project(): string { return this.task.project; }
    set project(project: string) { this.task.project = project; }

    @computed get participants(): Participants { return this.task.participants; }
    set participants(participants: Participants) { this.task.participants = participants; }

    @computed get done(): boolean { return this.task.done; }
    set done(done: boolean) { this.task.done = done; }




    async saveFb(): Promise<void> {
      const {title, time, project, participants, done, upvotes, imagelink} = this;
      const task: Task = {title, time, project, participants, done, upvotes, imagelink};
      await Firebase.userRef.child("tasks").push(task);
      await Firebase.taskRef.push(task);

      this.loading = false;
    }
    async save(): Promise<void> {

        this.loading = true;
        this.time = parseInt(moment().format("X"));
        this.upvotes = 0;
        const options = {
          keyPrefix: "uploads/",
          bucket: "reachappbucket",
          region: "us-east-1",
          accessKey: "AKIAIPTROMT4YU5L4WHQ",
          secretKey: "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",
          successActionStatus: 201
        }
        const file = {
  // `uri` can also be a file system path (i.e. file://)
  uri: this.image,
  name: this.imagename,
  type: this.imageextension
}

        RNS3.put(file, options).then(async (response) => {
          if (response.status !== 201){
            throw new Error("Failed to upload image to S3");
            this.loading = false;

          }

          this.imagelink = response.body.postResponse.location;
          const {title, time, project, done, upvotes, imagelink} = this;
          const task: Task = {title, time, project, done, upvotes, imagelink};
        //  await Firebase.userRef.child("tasks").push(task);
          console.log(task);
          await Firebase.taskRef.push(task);

          this.loading = false;

        });
        // TODO: replace = this.task with = this

    }
}
