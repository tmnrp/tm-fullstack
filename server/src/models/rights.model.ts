import { model, Schema } from "mongoose";
import { CONST_MODEL_NAMES } from "../constants";

export interface IRights {
  name: string;
}

export const rightsSchema = new Schema<IRights>(
  {
    name: { type: String, unique: true },
  },
  {
    timestamps: true,
  }
);

export const rightsModel = model(CONST_MODEL_NAMES.rights, rightsSchema);
