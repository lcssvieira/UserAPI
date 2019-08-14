import {Request, Response, Next}  from 'restify';

const mpContentType = "application/merge-patch+json";

/**
 * @author Lucas Vieira <lcssvieira@gmail.com>
 * @description Handler to allow the content type 'application/merge-patch+json' only for PATCH methods.
 * @param req  'Request' object from Restify
 * @param resp 'Response' object from Restify
 * @param next 'Next' object from Restify 
 */
export const mergePatchBodyParser = (req: Request, resp: Response, next: Next) =>{
    if (req.getContentType() === mpContentType && req.method == "PATCH"){
        (<any>req).rawBody = req.body;
        try {
            req.body = JSON.parse(req.body);
        }
        catch(ex){
            return next(new Error(`Invalid content: ${ex.message}`))
        }
    }
    return next();
}