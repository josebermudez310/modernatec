/**
 * @author Jose Daniel Bermudez Salamanca
 */
//importaciones necesarias
import Server from "./classes/server";
import { router } from "./routes/router";
import cors from "cors";
import bodyParser from "body-parser";

//instanciamos el servidor
const server = new Server();

//body-parser
server.app.use(bodyParser.urlencoded({extended:true}));
server.app.use(bodyParser.json());

//cors
server.app.use(cors({origin:true,credentials:true}));

//rutas
server.app.use('/api',router);

//iniciamos el servidor
server.start(()=>{
    console.log(`servidor corriendo en el puerto ${server.port}`);    
});