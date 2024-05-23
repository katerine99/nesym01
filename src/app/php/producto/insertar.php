<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Content-Type: application/json");

$json = file_get_contents("php://input");
$params = json_decode($json);

require("../conexion.php");

$nombre = mysqli_real_escape_string($conexion, $params->nombre);
$fo_marca = mysqli_real_escape_string($conexion, $params->fo_marca);

$ins = "INSERT INTO producto (nombre, fo_marca) VALUES ('$nombre', '$fo_marca')";

mysqli_query($conexion, $ins) or die("no inserto");

class Result {}
$response = new Result();
$response->resultado = "OK";
$response->mensaje = "Datos grabados";

echo json_encode($response);