import { model, Schema } from "mongoose";
import { CONST_MODEL_NAMES } from "../constants";

export interface ISettings {
  [key: string]: string;
}
export interface IUsers {
  username: string;
  password: string;
  rolesID: Schema.Types.ObjectId;
  surName: string;
  firstName: string;
  lastName: string;
  settings: ISettings;
}

export const usersSchema = new Schema<IUsers>(
  {
    username: { type: String, unique: true },
    password: { type: String },
    surName: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    settings: { type: Object },
    rolesID: { type: Schema.Types.ObjectId, ref: CONST_MODEL_NAMES.roles },
  },
  {
    timestamps: true,
  }
);

export const usersModel = model(CONST_MODEL_NAMES.users, usersSchema);
