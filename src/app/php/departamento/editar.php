<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Content-Type: application/json");

$json = file_get_contents("php://input");
$params = json_decode($json);

require("../conexion.php");

if (isset($params->nombre) && isset($params->id)) {
    $nombre = $params->nombre;
    $id = $params->id;

    $editar = "UPDATE departamento SET nombre='$nombre' WHERE id_depto='$id'";

    if (mysqli_query($conexion, $editar)) {
        $response = new stdClass();
        $response->resultado = 'OK';
        $response->mensaje = 'Datos modificados';
    } else {
        $response = new stdClass();
        $response->resultado = 'ERROR';
        $response->mensaje = 'No se pudo editar el departamento';
    }

    echo json_encode($response);
} else {
    $response = new stdClass();
    $response->resultado = 'ERROR';
    $response->mensaje = 'Datos incompletos';
    echo json_encode($response);
}

mysqli_close($conexion);

