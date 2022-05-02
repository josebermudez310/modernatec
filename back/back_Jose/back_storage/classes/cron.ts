/**
 * @author Jose Daniel Bermudez Salamanca
 */
//importaciones necesarias
import cron from 'node-cron';
import { Conection } from '../db/config';

//clase con todos los cron
export default class Cron {
    //atributo con la conexion con la base de datos
    private conection;
    constructor(){
        //realizamos la conexion con la base de datos
        this.conection=new Conection();
    }
    //cron para eliminar las cuentas no confirmadas despues de 30 dias
    public correoNoConfirmado = cron.schedule('0 23 * * *',async()=>{
        //consulta para traer todos los usuarios no conectados
        this.conection.conection.query('select * from users where confirmed=0',(err,resp)=>{
            if(resp){
                //constante con la fecha actual
                const currenDate:any = new Date();
                //recorremos la respuesta retornada por la consulta
                resp.forEach((element:any) => {
                    //traemos la diferencia de los días
                    let difference = Math.abs(currenDate-element.created_at);
                    //convertimos la diferencia a dias
                    let days = difference/(1000 * 3600 * 24);
                    //validamos que hayan pasado 30 dias
                    if(days>30){
                        this.conection.conection.query(`delete from users where id = ${element.id}`)
                    }    
                });
            }
        });
    },{
        scheduled:false,
        timezone:'America/Bogota'
    })
}