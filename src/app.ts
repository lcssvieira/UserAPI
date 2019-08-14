import {Server} from "./Server/server";
import { RouterBase } from "./Routers/router-base";
import { userRouter } from "./Routers/user-routers";

const routers: RouterBase[] = [userRouter];
const server = new Server();

/**
 * @author Lucas Vieira <lcssvieira@gmail.com>
 * @description Function that initializes the application
 * @param dbAddress Address to connect to the database
 * @param serverPort Application port
 */
async function startApp(dbAddress?: string, serverPort?: number){
    try {
        console.log("starting database...")
        await server.initDb(dbAddress);
        console.log("starting server...");
        await server.setup(routers, serverPort);
        console.log("Server is listening", server.application.address())
    }
    catch (err) {
        console.log(`Failed to start server`);
        console.log(err);
        process.exit(1);
    }
}

async function endApp(){
    console.log("ending database...");
    await server.endDb();
    console.log("ending application...");
    await server.endApplication();
}

export const App = {
    start: startApp,
    end: endApp
}