import mongoose from "mongoose";

export interface BaseModel extends mongoose.Document {
    created: string;
}


