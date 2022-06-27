
<html lang="es">
<head>
    <meta charset="utf-8">
</head>
<body>
    <h2>Hola, Usted ha sido registrado en Modernatec </h2>
    <p>Su contraseña es la siguiente: {{$code}} </p>
    <p>Codigo para confirmar el correo </p>
  <!--  <a href="{{ url('https://back-modernatec-ssl.herokuapp.com/api/verificacion_correo/') .$code_confirmacion }}">confirme su correo aqui</a>-->
  <a href="{{ url('https://api.modernatec.ml/api/verificacion_correo/') .$code_confirmacion }}">confirme su correo aqui</a>

    <!--<a href="{{url('http://127.0.0.1:8000/api/verificacion_correo/') .$code_confirmacion}}">confirme su correo aqui</a>-->
    <p>Recuerde cambiar la contraseña para su siguiente inicio de sesion.</p>
</body>
</html>

