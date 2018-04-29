import { RepositoryBase, loaderOf, NumberId } from "./record";
import { UserRecord } from "records/record-infos";

export type UserId = NumberId<"user">;

export interface UnsavedUser {
  username: string;
  password: string;
  email: string;
}

export interface SavedUser extends UnsavedUser {
  id: UserId;
}

export class UserRepository extends RepositoryBase(UserRecord) {
  byId = loaderOf(this).findOneBy("id");
}
