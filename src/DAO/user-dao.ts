import mongoose, { Error } from "mongoose";
import * as Model from "../Model/user-model";
import { BaseDAO } from "./base-dao";

export class UserDAO extends BaseDAO {

    private _userDocument: mongoose.Model<Model.UserModel>;
    constructor (){
        super();
        this._userDocument =  mongoose.model<Model.UserModel>("User", Model.UserSchema);
    }
    /**
     * @author Lucas Vieira <lcssvieira@gmail.com>
     * @description Get a specific user from the database
     * @param id Unique identifier of the user
     */
    async findById(id: string): Promise<Model.UserModel> {
        var user = await this._userDocument.findById(id);
        return user ? user : null as any;
    }

    /**
     * @author Lucas Vieira <lcssvieira@gmail.com>
     * @description Get all users currently registered
     * @param top Maximum number of records to be returned
     * @param skip Number of records to be skip
     */
    async findAll(top: number, skip: number) : Promise<Model.UserModel[]> {
        var users = await this._userDocument.find()
            .sort('_id')
            .limit(top)
            .skip(skip);
        return users;
    }

    /**
     * @author Lucas Vieira <lcssvieira@gmail.com>
     * @description Add a new user into the database
     * @param model Valid UserModel to be added
     */
    async create(model: Model.UserModel): Promise<Model.UserModel>{
        var user = new this._userDocument(model);
        var response = await user.save();
        return response;
    }

    /**
     * @author Lucas Vieira <lcssvieira@gmail.com>
     * @description Overwrite an user not returning it
     * @param id Unique Identifier of the user to be replaced
     * @param model Valid UserModel source
     */
    async overwrite(id: string, model: Model.UserModel): Promise<any>{
        const options = {overwrite: true};
        const query = this._userDocument.update({_id: id}, model , options);
        return await query.exec();
    }

     /**
     * @author Lucas Vieira <lcssvieira@gmail.com>
     * @description Find and update an user
     * @param id Unique Identifier of the user to be updated
     * @param model Valid UserModel source
     */
    async update(id: string, model: Model.UserModel): Promise<any>{
        const options = {new: true};
        return await this._userDocument.findByIdAndUpdate(id, model, options);
    }

    /**
     * @author Lucas Vieira <lcssvieira@gmail.com>
     * @description Delete an user from the database
     * @param id Unique Identifier of the user to be deleted
     */
    async delete(id: string): Promise<any>{
        const query = this._userDocument.remove({_id: id});
        return await query.exec();
    }
    
    /**
     * @author Lucas Vieira <lcssvieira@gmail.com>
     * @description Delete an user from the database by email
     * @param id Unique Identifier of the user to be deleted
     */
    async deleteByEmail(email: string): Promise<any>{
        const query = this._userDocument.remove({email: email});
        return await query.exec();
    }

    /**
     * @author Lucas Vieira <lcssvieira@gmail.com>
     * @description Delete all users
     */
    async deleteAll(): Promise<any>{
        const query = this._userDocument.deleteMany({});
        return await query.exec();
    }
}
