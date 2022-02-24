<?php

namespace App\Http\Controllers;

use App\Models\tipo_codigo;
use App\Http\Requests\Storetipo_codigoRequest;
use App\Http\Requests\Updatetipo_codigoRequest;

class TipoCodigoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
     * @param  \App\Http\Requests\Storetipo_codigoRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Storetipo_codigoRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\tipo_codigo  $tipo_codigo
     * @return \Illuminate\Http\Response
     */
    public function show(tipo_codigo $tipo_codigo)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\tipo_codigo  $tipo_codigo
     * @return \Illuminate\Http\Response
     */
    public function edit(tipo_codigo $tipo_codigo)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\Updatetipo_codigoRequest  $request
     * @param  \App\Models\tipo_codigo  $tipo_codigo
     * @return \Illuminate\Http\Response
     */
    public function update(Updatetipo_codigoRequest $request, tipo_codigo $tipo_codigo)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\tipo_codigo  $tipo_codigo
     * @return \Illuminate\Http\Response
     */
    public function destroy(tipo_codigo $tipo_codigo)
    {
        //
    }
}
