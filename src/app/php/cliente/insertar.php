<?php
header("Access-Control-Allow-origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

$json = file_get_contents ("php://input");

$params = json_decode($json);

require ("../conexion.php");

 $ins = "INSERT INTO cliente (nombre, celular) VALUES ('alisson lopez', '3217353236')";
//$ins = "INSERT INTO  cliente (nombre, celular) VALUES ('$params ->nombre, '$params ->celular)";


mysqli_query ($conexion,$ins) or die ("no inserto");

Class Result{}

$response = new Result ();
$response -> resultado = "ok";
$response -> mensaje = "datos_grabados";


header("content-type: application/json");
echo json_encode($response);
?>
