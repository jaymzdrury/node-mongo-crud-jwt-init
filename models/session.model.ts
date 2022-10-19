import {Document, Schema, Types, model} from "mongoose";
import {UserModel} from './interfaces'

export interface SessionModel extends Document {
    user: UserModel["_id"]
    valid: boolean
    userAgent: string
}
const sessionSchema = new Schema({
    user: {type: Types.ObjectId, ref: "User"},
    valid: {type: Boolean, default: true},
    userAgent: {type: String}
},{timestamps: false, versionKey: false})

export default model<SessionModel>("Session", sessionSchema)
