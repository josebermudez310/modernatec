<?php

/**Robin David Rodriguez Bautista
 * 17-03-2022
 * Estudiante adsi
 */


namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class Citas_UpdateMailable extends Mailable
{
    use Queueable, SerializesModels;
    public $subject = "Actualizacion de citas";
    use Queueable, SerializesModels;
    private $codigo;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($code)
    {
        $this->codigo = $code;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('emails.Citas_update') //devolvemos una vista y ademas le pasamos la variable con el codigo que va a ser utilizado
        ->with([
            'code' => $this->codigo,  // codigo que se va a enviar
        ]);
    }
}
