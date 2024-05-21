<?php
header("Access-Control-Allow-origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

$json = file_get_contents ("php://input");

$params = json_decode($json);

require ("../conexion.php");

 //$ins = "INSERT INTO proveedor (nombre, direccion , celular, email) VALUES ('santiago melendez', 'santander de quilichao', '3116065271','santiago@gmail.com')";
$ins = "INSERT INTO  proveedor (nombre, direccion, celular, email ) VALUES ('$params->nombre','$params->direccion','$params->celular','$params->email')";


mysqli_query ($conexion,$ins) or die ("no inserto");

Class Result{}

$response = new Result ();
$response -> resultado = "ok";
$response -> mensaje = "datos_grabados";


header("content-type: application/json");
echo json_encode($response);

