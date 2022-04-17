/**
 * @author Jose Daniel Bermudez Salamanca
 */
export const SERVER_PORT=Number(process.env.PORT)|| 4500;//puerto del servidor
export const URL_APP= process.env.URL_APP ||  'localhost:4500';//dirección en la que se encuentra la app
export const URL_BASE_AUTH= process.env.URL_BASE_AUTH || 'http://127.0.0.1:8000/api/auth'//dirección del servicio de autenticación
export const URL_BASE_USER= process.env.URL_BASE_USER || 'http://127.0.0.1:8000/api/users'//dirección del servicio de usuarios