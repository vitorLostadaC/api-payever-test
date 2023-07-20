import { ObjectId } from 'bson';

interface UserProps {
  name: string;
  first_name: string;
  last_name: string;
  avatar?: string;
}

export class User {
  private props: UserProps;
  private _id: ObjectId;

  constructor(props: UserProps, id?: ObjectId) {
    this._id = id || new ObjectId();
    this.props = props;
  }

  get id(): ObjectId {
    return this._id;
  }

  get name(): string {
    return this.props.name;
  }

  set name(name: string) {
    this.name = name;
  }

  get first_name(): string {
    return this.props.first_name;
  }

  set first_name(first_name: string) {
    this.first_name = first_name;
  }

  get last_name(): string {
    return this.props.last_name;
  }

  set last_name(last_name: string) {
    this.last_name = last_name;
  }

  get avatar(): string {
    return this.props.avatar;
  }

  set avatar(avatar: string) {
    this.avatar = avatar;
  }
}
