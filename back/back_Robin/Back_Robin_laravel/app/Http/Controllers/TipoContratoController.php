<?php

namespace App\Http\Controllers;

use App\Models\tipo_contrato;
use App\Http\Requests\Storetipo_contratoRequest;
use App\Http\Requests\Updatetipo_contratoRequest;

class TipoContratoController extends Controller
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
     * @param  \App\Http\Requests\Storetipo_contratoRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Storetipo_contratoRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\tipo_contrato  $tipo_contrato
     * @return \Illuminate\Http\Response
     */
    public function show(tipo_contrato $tipo_contrato)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\tipo_contrato  $tipo_contrato
     * @return \Illuminate\Http\Response
     */
    public function edit(tipo_contrato $tipo_contrato)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\Updatetipo_contratoRequest  $request
     * @param  \App\Models\tipo_contrato  $tipo_contrato
     * @return \Illuminate\Http\Response
     */
    public function update(Updatetipo_contratoRequest $request, tipo_contrato $tipo_contrato)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\tipo_contrato  $tipo_contrato
     * @return \Illuminate\Http\Response
     */
    public function destroy(tipo_contrato $tipo_contrato)
    {
        //
    }
}
