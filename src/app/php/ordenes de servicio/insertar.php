<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Content-Type: application/json");

$json = file_get_contents("php://input");
$params = json_decode($json);

require("../conexion.php");

$electromecanica = mysqli_real_escape_string($conexion, $params->electromecanica);
$metalmecanica = mysqli_real_escape_string($conexion, $params->metalmecanica);
$asistenciatecnica = mysqli_real_escape_string($conexion, $params->asistenciatecnica);

$ins = "INSERT INTO ordenes_de_servicio (electromecanica, metalmecanica, asistenciatecnica) VALUES ('$electromecanica', '$metalmecanica', '$asistenciatecnica')";

if (mysqli_query($conexion, $ins)) {
    class Result {}
    $response = new Result();
    $response->resultado = "OK";
    $response->mensaje = "Datos grabados";

    echo json_encode($response);
} else {
    die("Error al insertar datos: " . mysqli_error($conexion));
}