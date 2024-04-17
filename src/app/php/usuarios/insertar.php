<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

$json= file_get_contents("php://input");

$params = json_decode($json);

require ("../conexion.php");

 //$ins = "INSERT INTO usuarios (nombre, clave, usuario, cargo) VALUES ('juan Carlos', SHA1('12345'), 'juan23@hotmail.com','invitado')";
$ins = "INSERT INTO  usuarios (nombre, clave, usuario,cargo) VALUES ('$params->nombre', SHA1('$params->clave'),'$params->usuario','$params->cargo')";


mysqli_query ($conexion,$ins) or die ("no inserto");

Class Result{}

$response = new Result ();
$response -> resultado = "ok";
$response -> mensaje = "datos_grabados";


header("content-type: application/json");
echo json_encode($response);
