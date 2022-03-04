<?php

namespace App\Http\Controllers;

use App\Models\citas;
use Illuminate\Http\Request;
use App\Http\Requests\UpdatecitasRequest;
use Illuminate\Support\Facades\DB;
class CitasController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);// declaramos las rutas las cuales no es nesesario el token para realisar el registro
    }


    public function index()
    {
        $user = response()->json(auth()->user());
        $rol_map = ($user->{'original'}->{'rol'});

        if ($rol_map == 1) {
        $usuarios = citas::all();
        return $usuarios;
        }
        return "no tienen acceso";
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StorecitasRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user = response()->json(auth()->user());
        $rol_map = ($user->{'original'}->{'rol'});
        if ($rol_map == 1) {
            $cita = new citas();
            $cita -> codigo_cita =  $request -> codigo_cita;
            $cita -> fecha =  $request -> fecha;
            $cita -> hora =  $request -> hora;
            $cita -> correo_solicitante =  $request -> correo_solicitante;
            $cita -> correo_invitado =  $request -> correo_invitado;
            $cita -> area =  $request -> area;
            $cita -> numero_identificacion =  $request -> numero_identificacion;
            $cita -> tipo_codigo =  $request -> tipo_codigo;

            $cita->save();
            return $cita;
        }

        return "este rol no tiene acceso para realziar modificaciones";
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\citas  $citas
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //$citas = citas::findOrfail($id);

        $profession = DB::table('citas')->select('*')->where('codigo_cita', '=', $id)->first();
        return $profession;
        /*
        $user = response()->json(auth()->user());
        $rol_map = ($user->{'original'}->{'rol'});
        if ($rol_map == 1) {
        $citas = citas::findOrfail($id);
        return $citas;
        return "se han registrado los cambios";
        }
        */
    }

    //return "este rol no tiene acceso para realziar modificaciones";
    //}

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\citas  $citas
     * @return \Illuminate\Http\Response
     */
    public function edit(citas $citas)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdatecitasRequest  $request
     * @param  \App\Models\citas  $citas
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $user = response()->json(auth()->user());
        $rol_map = ($user->{'original'}->{'rol'});
        if ($rol_map == 1) {

        $cita = citas::findOrfail($request->id);

        $cita -> codigo_cita =  $request -> codigo_cita;
        $cita -> fecha =  $request -> fecha;
        $cita -> hora =  $request -> hora;
        $cita -> correo_solicitante =  $request -> correo_solicitante;
        $cita -> correo_invitado =  $request -> correo_invitado;
        $cita -> area =  $request -> area;
        $cita -> numero_identificacion =  $request -> numero_identificacion;

        $cita->save();
        return $cita;
        }
        return "este usuario no puede editar citas";

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\citas  $citas
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $user = response()->json(auth()->user());
        $rol_map = ($user->{'original'}->{'rol'});
        if ($rol_map == 1) {
        citas::destroy($request->id);
        }

    }

}
