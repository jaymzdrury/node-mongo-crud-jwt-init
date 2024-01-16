import { Schema, Document, model } from "mongoose";
import {UserModel} from './interfaces'

export interface DataModel extends Document {
    userId: UserModel["_id"],
    data: string
}

const DataSchema: Schema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    data: { type: String, required: true}
},{timestamps: false, versionKey: false})

export default model<DataModel>('Data', DataSchema);