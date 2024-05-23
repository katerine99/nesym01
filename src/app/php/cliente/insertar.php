<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Content-Type: application/json");

$json = file_get_contents("php://input");
$params = json_decode($json);

require("../conexion.php");

$nombre = $params->nombre;
$celular = $params->celular;

$ins = "INSERT INTO cliente (nombre, celular) VALUES ('$nombre', $celular)";

mysqli_query($conexion, $ins) or die("no inserto");

class Result {}
$response = new Result();
$response->resultado = "OK";
$response->mensaje = "Datos grabados";

echo json_encode($response);