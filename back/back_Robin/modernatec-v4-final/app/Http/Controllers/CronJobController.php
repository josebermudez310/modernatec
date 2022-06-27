<?php

namespace App\Http\Controllers;

use App\Models\citas;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class CronJobController extends Controller
{
    public function Cron_Confirmed()
    {


        $user = DB::table('users')->select("*")->where('confirmed', 0)->get(); //instanciamos todos los usuarios que no estan confirmados



        function Tiempo($fechaInicio, $fechaFin) //creamos una funcion que va a contar el tiempo entre las dos fechas 
        {
            //fecha 1 fecha en que se creo al usuario
            $datetime1 = date_create($fechaInicio);
            // fecha 2 fecha actual 
            $datetime2 = date_create($fechaFin);
            // creamos el intervalo entre las dos fechas 
            $interval = date_diff($datetime1, $datetime2);

            // asignamos a la varible tiempo un array el cual va a contener el valor que da el inteervalo 
            $tiempo = array();

            foreach ($interval as $valor) // recorremos el intervalo 
            {
                $tiempo[] = $valor;
            }
            // retornamos el arreglo 
            return $tiempo;
        }

        // asignamos la fecha actual 
        $date = date("d-m-y");


        foreach ($user /**esta variable tiene los usuaros que trae la consulta eloquent*/ as $key /**posicion en que se encuentra  */ => $value /**valor que se desea obtener  */) {

            $diferencia[$key]/**esta variable contiene a todos los usuarios mas la posicion en el arreglo  */ = Tiempo($value->created_at, $date) /**funcion de diferencia de tiempo  */;
        }

     // return $diferencia;
        

        $arreglo = array (); /**variable de lo que vamos a contener  */
        foreach ($user as $key => $value) 
        {
            if ($diferencia[$key][1] <> 0 ) {
                
                array_push($arreglo, $value);
                
            }
        }

        /**eliminar usuarios que no estan confirmados  */
        foreach ($arreglo  as $usuarioEliminado)
         {
            User::destroy($usuarioEliminado->id);
        }
        
    }
}
