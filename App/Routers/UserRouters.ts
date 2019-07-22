import { RouterBase } from "./RouterBase";
import * as restify from "restify";
import * as UserConttoller from "../Controller/UserController";


class UserRouter extends RouterBase{
    
    constructor (){
        super();
        
    }
    public ApplyRouters(application: restify.Server) {
        application.get('/users', UserConttoller.FindAll);
        application.get('/users/:id', UserConttoller.FindById);
        application.post('/users', UserConttoller.Create);
        application.put('/users/:id', UserConttoller.Update);
    }
}

export const userRouter = new UserRouter();