<?php

namespace App\Http\Controllers;

use App\Models\citas;
use App\Http\Requests\StorecitasRequest;
use App\Http\Requests\UpdatecitasRequest;

class CitasController extends Controller
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
     * @param  \App\Http\Requests\StorecitasRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StorecitasRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\citas  $citas
     * @return \Illuminate\Http\Response
     */
    public function show(citas $citas)
    {
        //
    }

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
    public function update(UpdatecitasRequest $request, citas $citas)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\citas  $citas
     * @return \Illuminate\Http\Response
     */
    public function destroy(citas $citas)
    {
        //
    }
}
