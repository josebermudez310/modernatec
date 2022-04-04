export const SERVER_PORT:number = Number(process.env.PORT) || 4800;
export const KEY_FACE:string= process.env.KEY_FACE || '35170aa3641842a9b3b3a4f978fc5379';

export const ENDPOINT_FACE:string= process.env.ENDPOINT_FACE || 'https://prototipomodernatec.cognitiveservices.azure.com/';
export const GROUP_ID:string=  process.env.GROUP_ID || 'person-group-modernatec-01'
export const JWT_SECRET= process.env.JWT_SECRET || "fYUOwz4FWTuPunyNj5S49kaxQnKEGx6MEMWe7zxyAjkNFLe3S0BLQFwzohFb4R57";
export const DB_HOST=process.env.DB_HOST || '127.0.0.1';
export const DB_USER=process.env.SB_USER || 'root';
export const DB_DATABASE= process.env.DB_DATA_BASE || 'modernatec';
export const DB_PASSWORD= process.env.DB_PASSWORD || '';
export const URL_BASE_AUTH= process.env.URL_BASE_AUTH || 'http://127.0.0.1:8000/api/auth'
export const URL_BASE_USER= process.env.URL_BASE_USER || 'http://127.0.0.1:8000/api/users'