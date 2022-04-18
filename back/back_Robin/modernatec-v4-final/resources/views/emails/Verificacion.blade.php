<html lang="es">
<head>
    <meta charset="utf-8">
</head>
<body>
    <h2>Hola , gracias por registrarte en <strong>Modernatec</strong> !</h2>
    <p>Por favor confirma tu correo electrónico.</p>
    <p>Para ello simplemente debes hacer click en el siguiente enlace:</p>
    <a href="{{ url('https://back-modernatec-ssl.herokuapp.com/api/verificacion_correo/') .$code }}">Link de confirmacion</a>
</body>
</html>

