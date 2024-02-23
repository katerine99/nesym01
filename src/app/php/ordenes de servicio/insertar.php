<?php
header("Access-Control-Allow-origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

$json = file_get_contents ("php://input");

$params = json_decode($json);

require ("../conexion.php");

 $ins = "INSERT INTO ordenes_de_servicio (electromecanica, metalmecanica, asistencia_tecnica) VALUES ('instalacion de sensores', 'supervision', 'asistencia tecnica')";
//$ins = "INSERT INTO  ordenes_de_servicio (electromecanica, metalmecanica, asistencia_tecnica) VALUES ('$params ->electromecanica','$params->metalmecanica','$params->asistencia_tecnica')";


mysqli_query ($conexion,$ins) or die ("no inserto");

Class Result{}

$response = new Result ();
$response -> resultado = "ok";
$response -> mensaje = "datos_grabados";


header("content-type: application/json");
echo json_encode($response);
?>
