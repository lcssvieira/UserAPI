import {Server} from "./Server/Server";
import { RouterBase } from "./Routers/RouterBase";
import { userRouter } from "./Routers/UserRouters";

const routers: RouterBase[] = [userRouter];
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
