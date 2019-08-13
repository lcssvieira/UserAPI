import mongoose from "mongoose";

export interface BaseModel extends mongoose.Document {
    createdAt: Date;
}


