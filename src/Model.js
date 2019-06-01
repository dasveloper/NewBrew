// @flow
export type Lists = { [string]:  List };
export type Tasks = { [string]:  Task };
export type Upvotes = { [string]:  Task };
export type Downvotes = { [string]:  Task };
export type ListItems = { [string]:  ListItem };
export type Participants = { [string]:  Participant };

export interface User {
  profile: Profile,
  lists: Lists,
  tasks: Tasks,
  reach: Reach,
  votes: Votes,
}

export interface Votes {
  upvotes: Upvotes,
  downvotes: Downvotes,
}

export interface Reach {
  reachCount: number,
}

export interface Profile {
  name: string,
  emailNotifications: boolean,
  phoneNotifications: boolean,
  profilePic: string,
}

export interface List {
  name: string,
  description: string,
  items: ListItems,
}

export interface ListItem {
  title: string,
  done: boolean,
}

export interface Task {
  title: string,
  time: number,
  project: string,
  done: boolean,
  upvotes: number,
  imagelink: string,
}

export interface Participant {
  uid: string,
}

