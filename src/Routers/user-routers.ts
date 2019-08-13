import { RouterBase } from "./router-base";
import * as restify from "restify";
import {UserController, userCtrl}  from "../Controller/user-controller";

class UserRouter extends RouterBase {

    /**
     * @author Lucas Vieira <lcssvieira@gmail.com>
     * @description Function that defines all API operations available to handle the entity User on this project
     */
    applyRouters(application: restify.Server) {
        application.get('/users', userCtrl.findAll);
        application.get('/users/:id', userCtrl.findById);
        application.post('/users', userCtrl.create);
        application.put('/users/:id', userCtrl.overwrite);
        application.patch('/users/:id', userCtrl.update);
        application.del('/users/:id', userCtrl.delete);
    }
}

export const userRouter = new UserRouter();