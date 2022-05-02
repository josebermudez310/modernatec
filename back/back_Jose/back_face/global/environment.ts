/**
 * @author Jose Daniel Bermudez Salamanca
 */
 import dotenv from 'dotenv';

 dotenv.config();
export const SERVER_PORT:number = Number(process.env.PORT) ;//puerto del servidor
export const KEY_FACE= process.env.KEY_FACE ;//clave del face api

export const ENDPOINT_FACE= process.env.ENDPOINT_FACE || '';//punto de conexión de face api
export const GROUP_ID=  process.env.GROUP_ID || '';//id del grupo de personas de face api
export const DB_HOST=process.env.DB_HOST ;//host de la base de datos
export const DB_USER=process.env.DB_USER ;//usuario de la base de datos
export const DB_DATABASE= process.env.DB_DATABASE ;//base de datos a la cual conectarse
export const DB_PASSWORD= process.env.DB_PASSWORD ;//contraseña de la base de datos
export const URL_BASE_AUTH= process.env.URL_BASE_AUTH ;//dirección del servicio de autenticación
export const URL_BASE_USER= process.env.URL_BASE_USER ;//dirección del servicio de usuarios