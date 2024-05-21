<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

$json = file_get_contents("php://input");

$params = json_decode($json);

if ($params === null) {
    $response = (object) [
        'resultado' => 'error',
        'mensaje' => 'error_decodificacion_json'
    ];
    echo json_encode($response);
    exit;
}

require("../conexion.php");

$nombre = $params->nombre;
$marca = $params->marca;

if (!$conexion) {
    $response = (object) [
        'resultado' => 'error',
        'mensaje' => 'error_conexion_bd'
    ];
    echo json_encode($response);
    exit;
}

$ins = $conexion->prepare("INSERT INTO producto (nombre, fo_marca) VALUES (?, ?)");
$ins->bind_param("ss", $nombre, $marca);
$ins->execute();

if ($ins->affected_rows > 0) {
    $response = (object) [
        'resultado' => 'ok',
        'mensaje' => 'datos_grabados'
    ];
} else {
    $response = (object) [
        'resultado' => 'error',
        'mensaje' => 'error_al_grabar_datos'
    ];
}

header("Content-Type: application/json");
echo json_encode($response);
?>