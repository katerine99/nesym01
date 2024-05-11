<?php
header("Access-Control-Allow-origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

$json = file_get_contents ("php://input");

$params = json_decode($json);

require ("../conexion.php");

 //$ins = "INSERT INTO repuestos (cantidad, total) VALUES ('23','72')";
$ins = "INSERT INTO  repuestos (cantidad, total) VALUES '$params ->cantidad', '$params->total";


mysqli_query ($conexion,$ins) or die ("no inserto");

Class Result{}

$response = new Result ();
$response -> resultado = "ok";
$response -> mensaje = "datos_grabados";


header("content-type: application/json");
echo json_encode($response);
?>
