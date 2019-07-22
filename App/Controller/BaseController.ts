
import * as restify from "restify";

export abstract class BaseController {
    public abstract FindById(req: restify.Request, resp: restify.Response, next: restify.Next): Promise<void>;
    public abstract FindAll(req: restify.Request, resp: restify.Response, next: restify.Next): Promise<void>;
    public abstract Create(req: restify.Request, resp: restify.Response, next: restify.Next): Promise<void>;
    public abstract Update(req: restify.Request, resp: restify.Response, next: restify.Next): Promise<void>;
    public abstract Delete(req: restify.Request, resp: restify.Response, next: restify.Next): Promise<void>;
    
}
