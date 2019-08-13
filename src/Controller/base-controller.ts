
import * as restify from "restify";

export abstract class BaseController {
    abstract findById(req: restify.Request, resp: restify.Response, next: restify.Next): Promise<void>;
    abstract findAll(req: restify.Request, resp: restify.Response, next: restify.Next): Promise<void>;
    abstract create(req: restify.Request, resp: restify.Response, next: restify.Next): Promise<void>;
    abstract overwrite(req: restify.Request, resp: restify.Response, next: restify.Next): Promise<void>;
    abstract update(req: restify.Request, resp: restify.Response, next: restify.Next): Promise<void>;
    abstract delete(req: restify.Request, resp: restify.Response, next: restify.Next): Promise<void>;
    
}
