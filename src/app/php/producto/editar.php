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

$id = $params->id_producto;
$nombre = $params->nombre;
$marca = $params->fo_marca;

$editar = "UPDATE producto SET nombre='$nombre', fo_marca='$marca' WHERE id_producto='$id'";

if (!mysqli_query($conexion, $editar)) {
    $response = (object) [
        'resultado' => 'error',
        'mensaje' => 'error_al_editar_datos'
    ];
} else {
    $response = (object) [
        'resultado' => 'OK',
        'mensaje' => 'datos_modificados'
    ];
}

header('Content-Type: application/json');
echo json_encode($response);
?>