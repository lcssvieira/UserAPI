import mongoose from "mongoose";
import { BaseModel } from "./BaseModel";


export interface UserModel extends BaseModel {
    givenName: string;
    familyName: string;
    email: string;
}
export const UserSchema = new mongoose.Schema({
    givenName: {
        type: "String"
    },
    familyName: {
        type: "String"
    },
    email: {
        type: "String",
        unique: true
    },
    createdAt: { 
        type: Date, 
        required: true, 
        default: Date.now 
    }
});        


