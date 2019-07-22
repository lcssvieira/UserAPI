import mongoose, { Error } from "mongoose";
import * as Model from "../Model/UserModel";
import { BaseDAO } from "./BaseDAO";

export class UserDAO extends BaseDAO {

    private UserDocument: mongoose.Model<Model.UserModel>;
    constructor (){
        super();
        this.UserDocument =  mongoose.model<Model.UserModel>("User", Model.UserSchema);
    }

    public async FindById(id: string): Promise<Model.UserModel> {
        var user = await this.UserDocument.findById(id);
        return user ? user : null as any;
    }

    public async FindAll(top: number, skip: number) : Promise<Model.UserModel[]> {
        var users = await this.UserDocument.find()
            .sort('_id')
            .limit(top)
            .skip(skip);
        return users;
    }

    public async Create(model: Model.UserModel): Promise<Model.UserModel>{
        var user = new this.UserDocument(model);
        var response = await user.save();
        return response;
    }

    public async Update(id: string, model: Model.UserModel): Promise<any>{
        const options = {overwrite: true};
        const query = this.UserDocument.update({_id: id}, model , options);
        return await query.exec();
    }
}
