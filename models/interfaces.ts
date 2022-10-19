import { Document } from "mongoose"

export interface UserModel extends Document {
    email: string,
    name: string,
    password: string
    comparePassword(camdidatePassword: string): Promise<Boolean>
}