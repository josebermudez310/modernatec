<?php

namespace App\Http\Controllers;

use App\Exports\SeguridadExport;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Support\Facades\Validator;
use App\Models\citas;

class SeguridadController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api'); // declaramos las rutas las cuales no es nesesario el token para realisar el registro
    }
    
    public function userEnLInea(Request $request){

        $validator =  Validator::make(
            $request->all(), // la variable validator va a contener todo lo que nos evia por el request
            [
                // validamos los campos que esta resibiendo el request para registrar a un nuevo usuario
                // los campos como los estamos llamando en el request se llaman igual en la base de datos
                'token' => 'required',
                /**validamos el token  */
            ]
        );

        if ($validator->fails()) // en caso de que lo que esta validando el request falla devolvemos el siguente mensaje
        {
            return response()->json([
                'message' => 'Error al enviar los datos, revise que se esten enviando todos los datos correctamente',
            ]);
        }


        /**asignamos los datos del token a una variable  */
        $user = response()->json(auth()->user());

        $rol_map = ($user->{'original'}->{'rol'});
        /**mapeamos con el rol que va a ingresar  */
        if ($rol_map == 3) {
    
        //return  DB::table('registros')->select("*")->where('hora_salida','NULL')->get();

        return Excel::download(new SeguridadExport, 'Reporte.xlsx');
        }
    }

    /**06-06-2022 
     * Robin David Rodriguez Bautista 
     * solicitud de implementar borrado de cita desde el rol seguridad 
     */

    public function deleteCita(Request $request){


        $validator =  Validator::make(
            $request->all(), // la variable validator va a contener todo lo que nos evia por el request
            [
                // validamos los campos que esta resibiendo el request para registrar a un nuevo usuario
                // los campos como los estamos llamando en el request se llaman igual en la base de datos
                'token' => 'required',
                'id' => 'required',
                /**validamos el token  */
            ]
        );

        if ($validator->fails()) // en caso de que lo que esta validando el request falla devolvemos el siguente mensaje
        {
            return response()->json([
                'message' => 'Error al enviar los datos, revise que se esten enviando todos los datos correctamente',
            ]);
        }
        $user = response()->json(auth()->user());/**asignamos la informacion del token a una variable  */
        $rol_map = ($user->{'original'}->{'rol'});/**mapeamos el rol con el que biene el token  */
        if ($rol_map == 3)/**si el rol es 3 entonces podra eliminar la cita  */
        {
            $cita = DB::table('citas')->where('id', $request->id)->get();
            $code = $cita[0]->codigo_cita;

            citas::destroy($request->id);/**eliminamos la cita  */
            /**enviamos correos a las personas que se les asigno a la cita */
                    return response()->json(/**respondemos con el siguiente mensaje  */
                 [
                     "message"=>"se elimino la cita"
                 ]);
        }
    }
}
