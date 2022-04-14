/**
 * @author Jose Daniel Bermudez Salamanca
 */
export const SERVER_PORT:number = Number(process.env.PORT) || 4800;//puerto del servidor
export const KEY_FACE:string= process.env.KEY_FACE || '';//clave del face api

export const ENDPOINT_FACE:string= process.env.ENDPOINT_FACE || '';//punto de conexión de face api
export const GROUP_ID:string=  process.env.GROUP_ID || '';//id del grupo de personas de face api
export const DB_HOST=process.env.DB_HOST || '';//host de la base de datos
export const DB_USER=process.env.SB_USER || '';//usuario de la base de datos
export const DB_DATABASE= process.env.DB_DATA_BASE || '';//base de datos a la cual conectarse
export const DB_PASSWORD= process.env.DB_PASSWORD || '';//contraseña de la base de datos
export const URL_BASE_AUTH= process.env.URL_BASE_AUTH || 'https://back-modernatec-ssl.herokuapp.com/api/auth'//dirección del servicio de autenticación
export const URL_BASE_USER= process.env.URL_BASE_USER || 'https://back-modernatec-ssl.herokuapp.com/api/users'//dirección del servicio de usuarios