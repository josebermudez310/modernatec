/**
 * @author Jose Daniel Bermudez Salamanca
 */
import dotenv from 'dotenv';

dotenv.config();

export const SERVER_PORT=Number(process.env.PORT);//puerto del servidor

export const URL_APP= process.env.URL_APP;//dirección en la que se encuentra la app

export const URL_BASE_AUTH= process.env.URL_BASE_AUTH ;//dirección del servicio de autenticación
export const URL_BASE_USER= process.env.URL_BASE_USER ;//dirección del servicio de usuarios

export const DB_DATABASE= process.env.DB_DATABASE;//nombre de la base de datos a la cual se conectará
export const DB_HOST= process.env.DB_HOST;//host de la base de datos
export const DB_PASSWORD= process.env.DB_PASSWORD;//contraseña del usuario de la base de datos
export const DB_USER= process.env.DB_USER;//usuario de la base de datos