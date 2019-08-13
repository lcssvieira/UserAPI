import * as restify from "restify";
import { environment } from "../Common/environment";
import { RouterBase } from "../Routers/router-base";
import mongoose from "mongoose";
import { mergePatchBodyParser } from "./merge-path-body-parser";
import { handleError } from "./error-handler";

export class Server {
    application: restify.Server;
    private _port = environment.server.port;

    constructor (){
        this.application = restify.createServer({
            name: "UserAPI",
            version: "1.0.0"
        });
        this.application.use(restify.plugins.queryParser());
        this.application.use(restify.plugins.bodyParser());
        this.application.use(mergePatchBodyParser);
    }

    /**
     * @author Lucas Vieira <lcssvieira@gmail.com>
     * @description Initialize routers and return the server app
     * @param routers List of Routers to be initialized with the web server
     */
    async setup(routers: RouterBase[] = []){
        await this.initServer(routers);
        return this;
    }

    /**
     * @author Lucas Vieira <lcssvieira@gmail.com>
     * @description Initialize the database
     */
    initDb(): mongoose.MongooseThenable{
        mongoose.Promise = global.Promise;
        return mongoose.connect(environment.db.url, {
            useMongoClient: true
        }); 
    }

    /**
     * @author Lucas Vieira <lcssvieira@gmail.com>
     * @param routers List of Routers to apply
     * @description Apply routers and initialize server
     */
    initServer(routers: RouterBase[]): Promise<restify.Server>{
        return new Promise<restify.Server>((resolve, reject) =>{
            try {
                // applying routers
                routers.forEach((router) =>{  router.applyRouters(this.application); });
                
                // starting
                this.application.listen(this._port, () =>{
                    resolve(this.application);
                });

                // handle errors
                this.application.on('restifyError', handleError);
            }
            catch(err){
                reject(err);
            }
        })
    }
}