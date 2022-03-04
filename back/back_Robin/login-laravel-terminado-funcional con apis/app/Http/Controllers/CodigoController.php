<?php

namespace App\Http\Controllers;

use App\Models\codigo;
use App\Http\Requests\StorecodigoRequest;
use App\Http\Requests\UpdatecodigoRequest;

class CodigoController extends Controller
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
     * @param  \App\Http\Requests\StorecodigoRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StorecodigoRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\codigo  $codigo
     * @return \Illuminate\Http\Response
     */
    public function show(codigo $codigo)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\codigo  $codigo
     * @return \Illuminate\Http\Response
     */
    public function edit(codigo $codigo)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdatecodigoRequest  $request
     * @param  \App\Models\codigo  $codigo
     * @return \Illuminate\Http\Response
     */
    public function update(UpdatecodigoRequest $request, codigo $codigo)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\codigo  $codigo
     * @return \Illuminate\Http\Response
     */
    public function destroy(codigo $codigo)
    {
        //
    }
}
