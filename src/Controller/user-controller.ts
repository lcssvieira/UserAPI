import { UserModel } from "../Model/user-model";
import { BaseController } from "./base-controller";
import assert = require("assert");
import { UserDAO } from "../DAO/user-dao";
import {Request, Response, Next}  from "restify";
import { environment } from "../Common/environment";

export class UserController extends BaseController {
  
    private _dao: UserDAO;
    constructor() {
        super();
        this._dao = new UserDAO;
    }

    /**
     * @author Lucas Vieira <lcssvieira@gmail.com>
     * @description Return a specific user from the unique identifier (id)
     * @param req 'Request' object from Restify. It must have the parameter 'id'
     * @param resp 'Response' object from Restify
     * @param next 'Next' object from Restify
     */
    async findById(req: Request, resp: Response, next: Next): Promise<void> {
        try{
            // get and validate parameters
            let id = req.params.id as string;
            assert(id, "Id is required!");

            // get record from db and prepare response
            let user =  await this._dao.findById(id);
            if (user)
                resp.json(user);
            else
                resp.send(404);
            next();
        }
        catch(ex){
            next(ex);
        }
    }

    /**
     * @author Lucas Vieira <lcssvieira@gmail.com>
     * @description Return as many registered users as possible - according to the limits of pagination configured
     * @param req 'Request' object from Restify. It may have the parameters 'top' and 'skip' to customize the pagination 
     * @param resp 'Response' object from Restify
     * @param next 'Next' object from Restify
     */
    async findAll(req: Request, resp: Response, next: Next): Promise<void> {

        try {
            // get parameters for pagination
            let top: number = +req.query.top || +environment.mongoPagination.limit;
            let skip: number = +req.query.skip || 0;

            // get records from db and return them
            let users = await this._dao.findAll(top, skip);
            let response = {count: users.length, records: users};
            resp.send(response);
            next();
        }
        catch(ex){
            next(ex);
        }
    }

    /**
     * @author Lucas Vieira <lcssvieira@gmail.com>
     * @description Register new user as long as the informed parameters are valid
     * @param req 'Request' object from Restify. It must have the parameter 'body' that must match a valid UserModel
     * @param resp 'Response' object from Restify
     * @param next 'Next' object from Restify
     */
    async create(req: Request, resp: Response, next: Next): Promise<void> {
        
        try {
            this.validateModel(req.body);
            let user = await this._dao.create(req.body as UserModel);
            let response = {message: "Successfully created!", id: user.id};
            resp.send(response);
            next();
        }
        catch(ex){
            next(ex);
        }
    }

    /**
     * @author Lucas Vieira <lcssvieira@gmail.com>
     * @description Replace a registered user
     * @param req 'Request' object from Restify. It must have the parameter 'body' that must match a valid UserModel
     * @param resp 'Response' object from Restify
     * @param next 'Next' object from Restify
     */
    async overwrite(req: Request, resp: Response, next: Next): Promise<void> {
        try {
            assert(req.params.id, "Id is required!");
            this.validateModel(req.body);
            var result = await this._dao.overwrite(req.params.id, req.body)
            if (result.n){
                let response = {message: "Successfully Overwritten!"};
                resp.send(response);
            }
            else
                resp.send(404);  
            next();
        }
        catch(ex){
            next(ex);
        }
    }

    /**
     * @author Lucas Vieira <lcssvieira@gmail.com>
     * @description Update some of the properties of a registered user
     * @param req 'Request' object from Restify. It must have the parameter 'body' with a valid 'id' of user and the properties that should be updated
     * @param resp 'Response' object from Restify
     * @param next 'Next' object from Restify
     */
    async update(req: Request, resp: Response, next: Next): Promise<void> {
        try {
            assert(req.params.id, "Id is required!");
            var result = await this._dao.update(req.params.id, req.body)
            if (result){
                resp.send(result);
            }
            else
                resp.send(404);  
            next();
        }
        catch(ex){
            next(ex);
        }
    }

        /**
     * @author Lucas Vieira <lcssvieira@gmail.com>
     * @description Delete an user
     * @param req 'Request' object from Restify. It must have the parameter 'id'
     * @param resp 'Response' object from Restify
     * @param next 'Next' object from Restify
     */
    async delete(req: Request, resp: Response, next: Next): Promise<void> {
        try {
            assert(req.params.id, "Id is required!");
            var cmsResult = await this._dao.delete(req.params.id)
            if (cmsResult.result.n){
                resp.send(204);
            }
            else
                resp.send(404); 
            next(); 
        }
        catch(ex){
            next(ex);
        }
    }

        /**
     * @author Lucas Vieira <lcssvieira@gmail.com>
     * @description Internal function used to check if a specific json matches a valid UserModel
     * @param body Object that's supposed to match a valid UserModel 
     */
    validateModel(body: any){
        assert(body.givenName, "Given name is required! param givenName is null or empty");
        assert(body.familyName, "Family name is required! param familyName is null or empty");
        assert(body.email, "Email is required! param email is null or empty");
    }
}

export const userCtrl = new UserController();
