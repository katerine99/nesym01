<?php

header('Access-Control-Allow-origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

$json= file_get_contents("php://input");

$params = json_decode($json);

require ("../conexion.php");

 //$ins = "INSERT INTO usuario (nombre, clave, correo, cargo) VALUES ('juan', SHA1('12345'), 'juan2@hotmail.com','invitado')";
$ins = "INSERT INTO  usuarios(nombre, clave, usuario,cargo) VALUES ('$params->nombre',('$params->clave'),'$params->usuario','$params->cargo')";


mysqli_query ($conexion,$ins) or die ("no inserto");

Class Result{}

$response = new Result ();
$response -> resultado = "ok";
$response -> mensaje = "datos_grabados";


header("content-type: application/json");
echo json_encode($response);