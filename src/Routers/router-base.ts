import * as restify from "restify";

export abstract class RouterBase {
    abstract applyRouters(application: restify.Server): any;
}




