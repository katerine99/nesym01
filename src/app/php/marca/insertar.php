<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

$json = file_get_contents("php://input");

$params = json_decode($json);

require("../conexion.php");

$nombre = isset($params->nombre) ? $params->nombre : '';

$ins = "INSERT INTO marca (nombre) VALUES ('$nombre')";

if(mysqli_query($conexion, $ins)) {
    $response = array(
        'resultado' => 'ok',
        'mensaje' => 'datos_grabados'
    );
} else {
    $response = array(
        'resultado' => 'error',
        'mensaje' => 'no_inserto'
    );
}

header("Content-Type: application/json");
echo json_encode($response);