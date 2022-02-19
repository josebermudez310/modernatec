//importaciones necesarias

import Server from "./classes/server";
import cors from 'cors';
import bodyParser from "body-parser";
import { routerStorage } from "./routes/storage";

const server= new Server();

//body-parser
server.app.use(bodyParser.urlencoded({extended:true}));
server.app.use(bodyParser.json());



//rutas
server.app.use('/api/storage',routerStorage)

//cors
server.app.use(cors({origin:true,credentials:true}))

server.start(()=>{
    console.log(`servidor corrriendo en el puerto ${server.port}`);
})