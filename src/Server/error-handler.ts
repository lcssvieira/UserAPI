import {Request, Response}  from 'restify';

/**
 * @author Lucas Vieira <lcssvieira@gmail.com>
 * @description Function that handles all API Errors to prepare a standardized response
 * @param req  'Request' object from Restify
 * @param resp 'Response' object from Restify
 * @param err  Error being thrown
 * @param done Callback to end the error handling operation
 */
export const handleError = (req: Request, resp: Response, err: any, done: () => void) =>{
    err.toJSON = () =>{
        return {
            message: err.message
        }
    };
    switch(err.name){
        case "MongoError":
            if (err.code === 11000)
                err.statusCode = 400;
        break;
    }
    done();
}