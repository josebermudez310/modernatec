<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Validator;


class usersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */


    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['', '']]);// declaramos las rutas las cuales no es nesesario el token para realisar el registro
    }

    public function index()
    {
        return "hola desde users";
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }



    public function user_register(Request $request) // esta funcion registra invitados
    {

        $user = response()->json(auth()->user());
        $rol_map = ($user->{'original'}->{'rol'});

        if ($rol_map == 1) {
            $validator = Validator::make($request->all(), [  //valida los campos a ser registrados como invitado
                'name' => 'required',
                'apellidos' => 'required',
                'numero_identificacion' => 'required',
                'telefono' => 'required',
                'url_imagen',
                'estado' => 'required',
                'email' => 'required|string|email|max:100|unique:users',
                'password' => 'required|string|min:8',
                'id_area' => 'required',
                'id_contrato' => 'required',
                'rol' => 'required',

            ]);

            if($validator->fails()){                        // en caso de algun error en la informacion el dara el siguente error
                return response()->json($validator->errors()->toJson(),400);
            }

            $user = User::create(array_merge(     // incriptacion de la contraseña
                $validator->validate(),
                ['password' => bcrypt($request->password)]
            ));

            return response()->json([             //mensaje de que un usuario se registro exitosamente
                'message' => '¡Usuario registrado exitosamente!',
                'user' => $user
            ], 201);

        }else{
            return "no tiene acceso para registrar nuevas personas";
        }


     /*
        $validator = Validator::make($request->all(), [  //valida los campos a ser registrados como invitado
            'name' => 'required',
            'apellidos' => 'required',
            'numero_identificacion' => 'required',
            'telefono' => 'required',
            'url_imagen',
            'estado' => 'required',
            'email' => 'required|string|email|max:100|unique:users',
            'password' => 'required|string|min:8',
            'id_area' => 'required',
            'id_contrato' => 'required',
            'rol' => 'required',

        ]);
        if($validator->fails()){                        // en caso de algun error en la informacion el dara el siguente error
            return response()->json($validator->errors()->toJson(),400);
        }

        $user = User::create(array_merge(     // incriptacion de la contraseña
            $validator->validate(),
            ['password' => bcrypt($request->password)]

        ));

        return response()->json([             //mensaje de que un usuario se registro exitosamente
            'message' => '¡Usuario registrado exitosamente!',
            'user' => $user
        ], 201);*/
    }



}
