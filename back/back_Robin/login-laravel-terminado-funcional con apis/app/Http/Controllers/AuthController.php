<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Lcobucci\JWT\Signer\Key;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */


     /** Robin David Rodriguez Bautista
      * 28/02/2022
     */

     // se crear el constructor para pasar el midelwere que dejara libre las rutas que no nesesiten toke
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);// declaramos las rutas las cuales no es nesesario el token para realisar el registro
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */

    public function login()
    {

    $login_roles = request(['email', 'password']);
    $email = request(['email']);

    $user = DB::table('users')->select("*")->where('email', $email )->get();
        foreach($user as $users){
        $rol_mapeado = $users->rol;
        $estado_mapeado = $users->estado;
    }




    if (! $token = auth()->attempt($login_roles)) {
              return response()->json(['error' => 'Las credenciales no son validas'], 401);
       }elseif($rol_mapeado <> null && $estado_mapeado === 'true'){
             return $this->respondWithToken($token);
       }else{
        return response()->json(['error' => 'El usuario esta registrado pero no tiene acceso a ingresar'], 200);
       }
    }



   // public function login()// funcion para el logueo de la aplicacion
   // {


        /*
        $login_roles = request(['email', 'password']); // se solicita el parametro correo y contraseña para realizar el inicio de sesion
         $email = request(['email']);                   // instanciamos el correo como instancia para luego utiliarlo en la consulta eloquent
         $user = DB::table('users')->select("*")->where('email', $email )->get(); // traemos todos los datos del usuario con el email que esta intentado iniciar sesion
               foreach($user as $users){
                $estado_mapeado = $users->estado;
                $rol_mapeado = $users->rol;                //realizamos el mapeo instanciando del rol con el email del  usuario que intenta iniciar sesion    }
            }

        if (! $token = auth()->attempt($login_roles)) {    //solicitamos las variable que tenemos en el request para verificar que esten registrados
              return response()->json(['error' => 'Unauthorized'], 401);

         }elseif($estado_mapeado == true  && $rol_mapeado <> null ){                    //verificamos que tengan un rol
             return $this->respondWithToken($token);
         }else{                                             //en caso de que esten registrados pero no tengan un rol les mostrara el mensaje de error asignado
            return response()->json(['error' => 'No puede ingresar sin un rol asignado']);
         }*/

   //}

   /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()  // esta url trae todos los datos de un usuario como parametro el token
    {
            return response()->json(auth()->user());

        // return response()->json(auth()->user());
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout() //esta funcion realiza el cerrado de sesion teniendo como parametro el token
    {
        auth()->logout();

        return response()->json(['message' => 'Se a cerrado la sesión']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh() // esta funcion trae un nuevo usuario resibiendo como parametro el token anterior
    {
        return $this->respondWithToken(auth()->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)  // esta funcion crea el token
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }

    public function register(Request $request) // esta funcion registra invitados
    {
        $validator = Validator::make($request->all(), [  //valida los campos a ser registrados como invitado
            'name' => 'required',
            'numero_identificacion' => 'required',
            'apellidos' => 'required',
            'telefono' => 'required',
            'email' => 'required|string|email|max:100|unique:users',
            'numero_identificacion' => 'required',
            //'password' => 'required|string|min:8',

        ]);
        if($validator->fails()){                        // en caso de algun error en la informacion el dara el siguente error
            return response()->json($validator->errors()->toJson(),400);
        }



        $user = User::create(array_merge(     // incriptacion de la contraseña
            $validator->validate(),
            ['password' => null]
            //['password' => bcrypt($request->password)]
            //hasj HMACSHA256
            // 256 bits
        ));

        return response()->json([             //mensaje de que un usuario se registro exitosamente
            'message' => '¡Usuario registrado exitosamente!',
            'user' => $user
        ], 201);
    }

}
