import { model, Schema } from "mongoose";
import { CONST_MODEL_NAMES } from "../constants";

export interface IRoles {
  name: string;
  rightsID: Array<Schema.Types.ObjectId>;
}

export const rolesSchema = new Schema<IRoles>(
  {
    name: { type: String, unique: true },
    rightsID: [{ type: Schema.Types.ObjectId, ref: CONST_MODEL_NAMES.rights }],
  },
  {
    timestamps: true,
  }
);

export const rolesModel = model(CONST_MODEL_NAMES.roles, rolesSchema);
