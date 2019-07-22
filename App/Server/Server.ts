import * as restify from "restify";
import { environment } from "../Common/Environment";
import { RouterBase } from "../Routers/RouterBase";
import mongoose from "mongoose";

export class Server {
    public application: restify.Server;
    private port = environment.server.port;

    constructor (){
        this.application = restify.createServer({
            name: "UserAPI",
            version: "1.0.0"
        });
        this.application.use(restify.plugins.queryParser());
        this.application.use(restify.plugins.bodyParser());
    }

    public async setup(routers: RouterBase[] = []){
        await this.initRouters(routers);
        return this;
    }

    public initDb(): mongoose.MongooseThenable{
        mongoose.Promise = global.Promise;
        return mongoose.connect(environment.db.url, {
            useMongoClient: true
        }); 
    }

    public initRouters(routers: RouterBase[]): Promise<restify.Server>{
        return new Promise<restify.Server>((resolve, reject) =>{
            try {
                // applying routers
                routers.forEach((router) =>{  router.ApplyRouters(this.application); });
                
                // starting
                this.application.listen(this.port, () =>{
                    resolve(this.application);
                });
            }
            catch(err){
                reject(err);
            }
        })
    }
}