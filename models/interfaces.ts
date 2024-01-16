import { Document } from "mongoose"

export interface UserInput {
    email: string,
    name: string,
    password: string
}

export interface UserModel extends UserInput, Document {
    comparePassword(camdidatePassword: string): Promise<Boolean>
}