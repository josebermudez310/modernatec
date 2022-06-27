<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class Registro_User_Mailable extends Mailable
{
    public $subject = "Registrado en Modernatec";
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    private $codigo;
    /**
     * 25/04/2022 
     * Robin David Rodriguez Bautista 
     * solicitud de enviar el codigo de confirmacion en el mismo correo en el que se envia la contraseña 
     */
    private $code_confirmacion;

    public function __construct($code,$confirmacion)
    {
        $this->codigo = $code;
        /**codigo para de confirmacion */
        $this->code_confirmacion = $confirmacion;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('emails.Registro_User') //devolvemos una vista y ademas le pasamos la variable con el codigo que va a ser utilizado
        ->with([
             'code_confirmacion' => $this->code_confirmacion,
            'code' => $this->codigo,  // codigo que se va a enviar
        ]);
    }
}
