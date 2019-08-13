import {Server} from "./Server/server";
import { RouterBase } from "./Routers/router-base";
import { userRouter } from "./Routers/user-routers";

const routers: RouterBase[] = [userRouter];
/**
 * @author Lucas Vieira <lcssvieira@gmail.com>
 * @description Function that initializes the application
 */
async function startAPI(){
    try {
        const server = new Server();
        await server.initDb();
        await server.setup(routers);
        console.log("Server is listening", server.application.address());
    }
    catch (err) {
        console.log(`Failed to start server`);
        console.log(err);
        process.exit(1);
    }
}
startAPI();
