import { model, Schema } from "mongoose";
import { CONST_MODEL_NAMES } from "../constants";

//
export interface ISettings {
  [key: string]: string;
}

//
export interface IUserSettings {
  settings: ISettings;
  usersID: Schema.Types.ObjectId;
}

//
export const userSettingsSchema = new Schema<IUserSettings>(
  {
    settings: { type: Object },
    usersID: { type: Schema.Types.ObjectId, ref: CONST_MODEL_NAMES.users },
  },
  {
    timestamps: true,
  }
);

//
export const userSettingsModel = model(
  CONST_MODEL_NAMES["user-settings"],
  userSettingsSchema
);
