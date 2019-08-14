import { RouterBase } from "./router-base";
import * as restify from "restify";
import {userCtrl}  from "../Controller/user-controller";

class UserRouter extends RouterBase {

    /**
     * @author Lucas Vieira <lcssvieira@gmail.com>
     * @description Function that defines all API operations available to handle the entity User on this project
     */
    applyRouters(application: restify.Server) {
        application.get('/users', (req, resp, next) => userCtrl.findAll(req, resp, next));
        application.get('/users/:id', (req, resp, next) => userCtrl.findById(req, resp, next));
        application.post('/users', (req, resp, next) => userCtrl.create(req, resp, next));
        application.put('/users/:id', (req, resp, next) => userCtrl.overwrite(req, resp, next));
        application.patch('/users/:id', (req, resp, next) => userCtrl.update(req, resp, next));
        application.del('/users/:id', (req, resp, next) => userCtrl.delete(req, resp, next));
    }
}

export const userRouter = new UserRouter();