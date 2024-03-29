<?php

use App\Exports\SeguridadExport;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;  //controlador de regitros y autenticacion con tokens
use App\Http\Controllers\CitasController;
use App\Http\Controllers\CorreosController; //controlador del envio de correos
use App\Http\Controllers\CronJobController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RegistroController;
use App\Http\Controllers\SeguridadController;
use Maatwebsite\Excel\Row;

/*
|--------------------------------------------------------------------------
| API Routes

|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group([
    'middleware' => 'api',    // se llama al middelware para optenerlo en la api
    'prefix' => 'auth'        //se coloca el prefix auth para que todas las url que lo contengan soliciten tokens esecto la de register y la de login
], function ($router) {
    Route::post('login', [AuthController::class, 'login']);       //ruta para hacer el login del sitio web como parametros esta ruta nesesita el email y el password para poder realizar el logueo y devolver el token del usuario
    Route::post('logout', [AuthController::class, 'logout']);     //ruta para cerrar sesion esta ruta nesesta como parametros el token del usuario para cerrar la sesion
    Route::post('refresh', [AuthController::class, 'refresh']);   //ruta para generar un nuevo token de un usuario registrado, como parametro se solicita el token para registrar un nuevo token asociado a un nuevo usuario
    Route::post('me', [AuthController::class, 'me']);             //ruta para obtener informacion de un token de un usuario logueado
    Route::post('Registro_Invitado', [AuthController::class, 'Registro_Invitado']); // ruta para registrar a un usuario como invitado
    Route::get('email_password_reset/{email}', [AuthController::class, 'email_password_reset']); /**Esta ruta resive como variable el email al cual se le va a restablecer la contraseña */
    Route::post('Validacion_code', [AuthController::class, 'Validacion_code']); /**En esta ruta se va a validar que el usuario pueda canbiar la contraseña con un codigo ya registrado  */
    Route::post('confirm_reset_password', [AuthController::class, 'confirm_reset_password']);/**esta ruta devuelve el mensaje para saber si se puede o no cambiar la contraseña  */
    Route::get('contador', [AuthController::class, 'contador']);/**en esta ruta se realiza el cambio de contraseña */

    /**
     * 31-03-2022
     * Robin David Rodriguez Bautista 
     * Creacion de ruta para cambiar la contraseña teniendo la contraseña anterior 
     */
    Route::post('password_update', [AuthController::class, 'password_update']);/**ruta para cambiar la contraseña teniendo la contraseña anterior */
    
    
});
Route::get('verificacion_correo/{code}', [CorreosController::class, 'verificacion_correo']); // controlador para verificar que el correo que estan registrando tengan acceso






// Route::get('Cron_Confirmed', [CronJobController::class, 'Cron_Confirmed']); // controlador para verificar que el correo que estan registrando tengan acceso
/**
 * 13-06-2022
 * Robin David Rodriguez Bautista 
 * Solicitud de que se pueda visualizar el detalle de la cita para los invitados
 */
Route::post('citas/informacion', [CitasController::class, 'show_invitado']);        /**acceder a la informacion de una cita en espesifico  */

Route::group([
    'middleware' => 'api',    // se llama al middelware para optenerlo en la api
    'prefix' => 'users'        //se coloca el prefix auth para que todas las url que lo contengan soliciten tokens esecto la de register y la de login
], function ($router) {
    Route::post('index', [UserController::class, 'index']);       //ruta para hacer el login del sitio web como parametros esta ruta nesesita el email y el password para poder realizar el logueo y devolver el token del usuario
    Route::post('store', [UserController::class, 'store']);      //ruta para registrar los usuarios
    Route::post('contrato', [UserController::class, 'contrato']); //ruta para registrar un nuevo contrato
    Route::post('show', [UserController::class, 'show']);         //ruta para ver un usuario en espesifico
    Route::put('update/{id}', [UserController::class, 'update']); //ruta para actualizar los usuarios
 /**23-03-2022
     *  Robin David Rodriguez Bautista
     * Agregacion de ruta para traer informacion del contrato, poder ver toda la informacion del contrato.
    */
    Route::post('contrato_show', [UserController::class, 'contrato_show']); //ruta para visualizar un contrato

    /**
     * Robin David Rodriguez Bautista 
     * 31-03-2021
     * creacion  de ruta para actualizar la informacion del perfil 
     */



    Route::post('perfil_update', [UserController::class, 'perfil_update']);/**controlador para editar la informacion del perfil  */
});

Route::group([
    'middleware' => 'api',    // se llama al middelware para optenerlo en la api
    'prefix' => 'citas'        //se coloca el prefix auth para que todas las url que lo contengan soliciten tokens esecto la de register y la de login
], function ($router) {
    Route::post('index', [CitasController::class, 'index']);       //ruta para hacer el login del sitio web como parametros esta ruta nesesita el email y el password para poder realizar el logueo y devolver el token del usuario
    Route::post('store', [CitasController::class, 'store']);      //crear citas
    Route::post('show', [CitasController::class, 'show']);        /**acceder a la informacion de una cita en espesifico  */
    Route::put('update/{id}', [CitasController::class, 'update']);/**actualizacion de una cita  */
    Route::delete('destroy', [CitasController::class, 'destroy']);/**eliminacion de una cita  */
}); 


Route::group([
    'middleware' => 'api',    // se llama al middelware para optenerlo en la api
    'prefix' => 'Registro'        //se coloca el prefix auth para que todas las url que lo contengan soliciten tokens esecto la de register y la de login
], function ($router) {
    Route::post('Registro_entrada', [RegistroController::class, 'Registro_entrada']);/**registra la entrada de un usuario y un nuevo registro */
    Route::post('Registro_salida', [RegistroController::class, 'Registro_salida']);/**registra la salida de un usuario y un nuevo registro */
    Route::post('Base_datos', [RegistroController::class, 'Base_datos']);/**subir el archivo para generar registros a la base de datos  */
    Route::post('export', [RegistroController::class, 'export']);/**subir el archivo para generar registros a la base de datos  */
     /**31-03-2022
     *  Robin David Rodriguez Bautista
     * Agregacion de ruta para traer la informacion del ultimo registro del usuario
    */
    Route::post('UltimoRegistro', [RegistroController::class, 'UltimoRegistro']);/**subir el archivo para generar registros a la base de datos  */
});


/**
 * 30-04-2022
 * Robin David Rodriguez Bautista 
 * Solicitud de servicio para descargar excel sobre los registros de entrada 
 */
Route::group([
    'middleware' => 'api',    // se llama al middelware para optenerlo en la api
    'prefix' => 'Seguridad'        //se coloca el prefix auth para que todas las url que lo contengan soliciten tokens esecto la de register y la de login
], function ($router) {

    Route::post('userEnLInea', [SeguridadController::class, 'userEnLInea']); // ruta para descargar excel de los usuarios que estan dentro de la entidad 
/** 31-05-2022 
 *  Robin David Rodriguez Bautista 
 *  solicitud de implementar servicio para eliminar el codigo del usuario cuando se confirma la cita.   
*/

    Route::post('deleteCita', [SeguridadController::class,'deleteCita']);

});
