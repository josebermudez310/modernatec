<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\usersController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

/* 28-02-2022
   Robin David Rodriguez Bautista
   se implemento jwt y todas sus rutas
*/

Route::group([
    'middleware' => 'api',    // se llama al middelware para optenerlo en la api
    'prefix' => 'auth'        //se coloca el prefix auth para que todas las url que lo contengan soliciten tokens esecto la de register y la de login
], function ($router) {
    Route::post('login', [AuthController::class, 'login']);       //ruta para hacer el login del sitio web como parametros esta ruta nesesita el email y el password para poder realizar el logueo y devolver el token del usuario
    Route::post('logout', [AuthController::class, 'logout']);     //ruta para cerrar sesion esta ruta nesesta como parametros el token del usuario para cerrar la sesion
    Route::post('refresh', [AuthController::class, 'refresh']);   //ruta para generar un nuevo token de un usuario registrado, como parametro se solicita el token para registrar un nuevo token asociado a un nuevo usuario
    Route::post('me', [AuthController::class, 'me']);             //ruta para ver a detalle todos los datos del usuario como parametro resibe el token actual del usuario para traer todos los datos del usuario
    Route::post('register', [AuthController::class, 'register']); //ruta register permite registrar a los usuarios como invitados en el aplicativo
    Route::post('user_register', [AuthController::class, 'user_register']); //ruta register permite registrar a los usuarios como invitados en el aplicativo

});



Route::group([
    'middleware' => 'api',    // se llama al middelware para optenerlo en la api
    'prefix' => 'users'        //se coloca el prefix auth para que todas las url que lo contengan soliciten tokens esecto la de register y la de login
], function ($router) {
    Route::post('index', [usersController::class, 'index']);       //ruta para hacer el login del sitio web como parametros esta ruta nesesita el email y el password para poder realizar el logueo y devolver el token del usuario

});


