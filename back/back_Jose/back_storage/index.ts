/**
 * @author Jose Daniel Bermudez Salamanca
 */
//importaciones necesarias
import Server from "./classes/server";
import cors from 'cors';
import bodyParser from "body-parser";
import { routerStorage } from "./routes/storage";
import { routerCitasStorage } from './routes/citasStorage';


//llamamos la instance del servidor
const server = Server.instance;

//body-parser
server.app.use(bodyParser.urlencoded({ extended: true }));
server.app.use(bodyParser.json());


//cors
server.app.use(cors({ origin: true, credentials: true }));

//rutas para el storage del usuario
server.app.use('/api/storage', routerStorage);
//rutas para el storage de las citas
server.app.use('/api/citasstorage', routerCitasStorage);


//iniciamos el servidor
server.start(() => {
    console.log(`servidor corrriendo en el puerto ${server.port}`);
})