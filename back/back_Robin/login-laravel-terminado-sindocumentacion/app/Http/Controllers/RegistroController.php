<?php

namespace App\Http\Controllers;

use App\Models\registro;
use App\Http\Requests\StoreregistroRequest;
use App\Http\Requests\UpdateregistroRequest;

class RegistroController extends Controller
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
     * @param  \App\Http\Requests\StoreregistroRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreregistroRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\registro  $registro
     * @return \Illuminate\Http\Response
     */
    public function show(registro $registro)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\registro  $registro
     * @return \Illuminate\Http\Response
     */
    public function edit(registro $registro)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateregistroRequest  $request
     * @param  \App\Models\registro  $registro
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateregistroRequest $request, registro $registro)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\registro  $registro
     * @return \Illuminate\Http\Response
     */
    public function destroy(registro $registro)
    {
        //
    }
}
