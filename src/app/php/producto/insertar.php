<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

$json = file_get_contents("php://input");

$params = json_decode($json);

require("../conexion.php");

$nombre = $params->nombre;
$marca = $params->marca;

$ins = "INSERT INTO producto (nombre, fo_marca) VALUES ('$nombre', $fo_marca)";

mysqli_query($conexion, $ins) or die("no inserto");

class Result {}

$response = new Result();
$response->resultado = "ok";
$response->mensaje = "datos_grabados";

header("Content-Type: application/json");
echo json_encode($response);
?>