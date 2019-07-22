import { UserModel } from "../Model/UserModel";
import { BaseController } from "./BaseController";
import assert = require("assert");
import { UserDAO } from "../DAO/UserDAO";
import * as restify from "restify";
import { environment } from "../Common/Environment";

export class UserController extends BaseController {

    private DAO: UserDAO;
    constructor() {
        super();
        this.DAO = new UserDAO;
    }

    public async FindById(req: restify.Request, resp: restify.Response, next: restify.Next): Promise<void> {
        try{
            // get and validate parameters
            let id = req.params.id as string;
            assert(id, "Id is required!");

            // get record from db and prepare response
            let user =  await this.DAO.FindById(id);
            if (user)
                resp.json(user);
            else
                resp.send(404);
            next();
        }
        catch(err){
            resp.send(500, err);
        }
    }
    public async FindAll(req: restify.Request, resp: restify.Response, next: restify.Next): Promise<void> {

        try {
            // get parameters for pagination
            let top: number = +req.query.top || +environment.mongoPagination.limit;
            let skip: number = +req.query.skip || 0;

            // get records from db and return them
            let users = await this.DAO.FindAll(top, skip);
            let response = {count: users.length, records: users};
            resp.send(response);
            next();
        }
        catch(err){
            resp.send(500, err);
        }
    }

    public async Create(req: restify.Request, resp: restify.Response, next: restify.Next): Promise<void> {
        
        try {
            this.validateModel(req.body);
            let user = await this.DAO.Create(req.body as UserModel);
            let response = {message: "Successfully created!", id: user.id};
            resp.send(response);
        }
        catch(err){
            resp.send(500, err);
        }
    }

    public async Update(req: restify.Request, resp: restify.Response, next: restify.Next): Promise<void> {
        try {
            assert(req.params.id, "Id is required!");
            this.validateModel(req.body);
            var result = await this.DAO.Update(req.params.id, req.body)
            if (result.n){
                let response = {message: "Successfully updated!"};
                resp.send(response);
            }
            else
                resp.send(404);  
        }
        catch(err){
            resp.send(500, err);
        }
    }

    public Delete(req: restify.Request, resp: restify.Response, next: restify.Next): Promise<void> {
        throw new Error("Method not implemented.");
    }

    private validateModel(body: any){
        assert(body.givenName, "Given name is required! param givenName is null or empty");
        assert(body.familyName, "Family name is required! param familyName is null or empty");
        assert(body.email, "Email is required! param email is null or empty");
    }
}


const ctrl = new UserController();
export function FindById(req: restify.Request, resp: restify.Response, next: restify.Next){
    ctrl.FindById(req, resp, next);
}

export function FindAll(req: restify.Request, resp: restify.Response, next: restify.Next){
    ctrl.FindAll(req, resp, next);
}

export function Create(req: restify.Request, resp: restify.Response, next: restify.Next){
    ctrl.Create(req, resp, next);
}

export function Update(req: restify.Request, resp: restify.Response, next: restify.Next){
    ctrl.Update(req, resp, next);
}

export function Delete(req: restify.Request, resp: restify.Response, next: restify.Next){
    ctrl.Delete(req, resp, next);
}
