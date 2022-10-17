import { Document } from "mongoose"

export interface Data {
    string: string
}
export interface DataModel extends Data, Document {}