<?php

namespace App\Exports;

use App\Models\registro;
use Maatwebsite\Excel\Concerns\FromCollection;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Events\AfterSheet;


class SeguridadExport implements FromCollection, WithHeadings, WithEvents,ShouldAutoSize
{
    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {

       // $user = DB::table('registros')->orderBy('id', 'desc')->select("*")->where('numero_identificacion', 'id')->get();
       //return  DB::table('registros')->select("*")->where('hora_salida', 'null')->get();

        //return registro::all();
        /**Esta consulta trae todos los usuarios los cuales tienen el registro de salida en null  */
     return   DB::table('users')
        ->join('registros', 'users.id', '=', 'registros.numero_identificacion')
        ->select('users.numero_identificacion','users.name','users.apellidos','users.telefono','users.email','registros.fecha','registros.hora_ingreso' )
        ->where('registros.hora_salida', )
        ->get();
    }

    // las cabeceras del excel 

    public function headings():array
    {
        //nombres de las cabecera a agregar
        return [
            'Numero de identificacion',
            'Nombre',
            'Apellidos',
            'Telefono',
            'Correo',
            'Fecha',
            'Hora de ingreso'
        ];
    }


    //funcion para colocar en negrilla la cabecera
    public function registerEvents(): array
    {
        return [
            AfterSheet::class => function (AfterSheet $event) {
                $event->sheet->getStyle('A1:G1')->applyFromArray([
                    'font' => [
                        'bold' => true
                    ]
                ]);
            }
        ];
    }
}
