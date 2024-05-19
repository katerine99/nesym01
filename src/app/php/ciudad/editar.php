<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Content-Type: application/json");

$json = file_get_contents("php://input");
$params = json_decode($json);

require("../conexion.php");

$id = $params->id;
$nombre = $params->nombre;
$fo_depto = $params->fo_depto;

$editar = "UPDATE ciudad SET nombre='$nombre', fo_depto='$fo_depto' WHERE id_ciudad='$id'";

mysqli_query($conexion, $editar) or die("no edito");

class Result {}
$response = new Result();
$response->resultado = "OK";
$response->mensaje = "Datos modificados";

echo json_encode($response);

