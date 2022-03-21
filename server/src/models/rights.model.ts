import { model, Schema } from "mongoose";
import { CONST_MODEL_NAMES } from "../constants";

export interface IRights {
  name: string;
  label: string;
  description?: string;
}

export const rightsSchema = new Schema<IRights>(
  {
    name: { type: String, unique: true },
    label: { type: String, unique: true },
    description: { type: String, unique: true },
  },
  {
    timestamps: true,
  }
);

export const rightsModel = model(CONST_MODEL_NAMES.rights, rightsSchema);
