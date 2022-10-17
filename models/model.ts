import { model, Schema } from 'mongoose';
import {DataModel} from './interfaces'

const DataSchema: Schema = new Schema({
    string: { type: String, required: true },
},{timestamps: false,  versionKey: false})

export default model<DataModel>('Data', DataSchema);