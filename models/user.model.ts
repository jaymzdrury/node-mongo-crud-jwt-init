import bcrypt from 'bcrypt'
import { model, Schema } from 'mongoose';
import {UserModel} from './interfaces'
import config from '../config/default'

const UserSchema: Schema = new Schema({
    email: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    password: { type: String, required: true },
},{timestamps: false,  versionKey: false})

UserSchema.pre("save", async function (next) {
    let user = this as UserModel
    if(!user.isModified('password')) return next()

    const salt = await bcrypt.genSalt(<number>config.saltWorkFactor)
    const hash = bcrypt.hashSync(user.password, salt)
    user.password = hash
    return next()
})

UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    const user = this as UserModel
    return bcrypt.compare(candidatePassword, user.password).catch((e: any) => false)
}

export default model<UserModel>('User', UserSchema);