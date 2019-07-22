import * as restify from "restify";

export abstract class RouterBase {
    public abstract ApplyRouters(application: restify.Server);
}




