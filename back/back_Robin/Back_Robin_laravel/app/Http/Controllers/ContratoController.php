<?php

namespace App\Http\Controllers;

use App\Models\contrato;
use App\Http\Requests\StorecontratoRequest;
use App\Http\Requests\UpdatecontratoRequest;

class ContratoController extends Controller
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
     * @param  \App\Http\Requests\StorecontratoRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StorecontratoRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\contrato  $contrato
     * @return \Illuminate\Http\Response
     */
    public function show(contrato $contrato)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\contrato  $contrato
     * @return \Illuminate\Http\Response
     */
    public function edit(contrato $contrato)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdatecontratoRequest  $request
     * @param  \App\Models\contrato  $contrato
     * @return \Illuminate\Http\Response
     */
    public function update(UpdatecontratoRequest $request, contrato $contrato)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\contrato  $contrato
     * @return \Illuminate\Http\Response
     */
    public function destroy(contrato $contrato)
    {
        //
    }
}
