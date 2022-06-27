<?php

namespace App\Exports;

use App\Models\registro;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromQuery;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Events\AfterSheet;

class RegistrosExport implements FromCollection, ShouldAutoSize, WithHeadings, WithEvents
{
    use Exportable;

    public function __construct($fecha_1, $fecha_2)
    {
        $this->year1 = $fecha_1;/**pasamos las variables desde el controlador y se la asignamos a las variables del metodo constructor  */
        $this->year2 = $fecha_2;
    }

    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        $registros = DB::table('users')
            ->join('registros', 'users.id', '=', 'registros.numero_identificacion')
            ->select('users.name','users.numero_identificacion','fecha','hora_ingreso','hora_salida')
            ->whereBetween('fecha', [$this->year1, $this->year2])
            ->get();
        return $registros;
        //return registro::query()->whereBetween('fecha', [$this->year1, $this->year2]);

        // return DB::table('registros')/**consulta eloquent para filtrar los datos  */
        //->whereBetween('fecha', [$this->year1, $this->year2])
        //->get();
       // return registro::query()->whereBetween('fecha', [$this->year1, $this->year2]);/**le damos las fechas las cuales son el filtrado para generar el reporte  */
    }
    /**
     * 25/04/2022 
     * Robin David Rodriguez Bautista 
     * solicitud de colocar cabeceras en el archivo excel 
     */

     //funcion para agregar cabeceras
    public function headings():array
    {
        //nombres de las cabecera a agregar
        return [
            'Nombre',
            'Numero de identificacion',
            'Fecha del registro',
            'Hora de ingreso',
            'Hora de salida'
        ];
    }

    //funcion para colocar en negrilla la cabecera
    public function registerEvents(): array
    {
        return [
            AfterSheet::class => function (AfterSheet $event) {
                $event->sheet->getStyle('A1:E1')->applyFromArray([
                    'font' => [
                        'bold' => true
                    ]
                ]);
            }
        ];
    }
}
