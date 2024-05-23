<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Content-Type: application/json');

$json = file_get_contents("php://input");
$params = json_decode($json);

require("../conexion.php");

$response = new stdClass();

if (isset($params->electromecanica) && isset($params->metalmecanica) && isset($params->asistenciatecnica) && isset($params->id)) {
    $electromecanica = mysqli_real_escape_string($conexion, $params->electromecanica);
    $metalmecanica = mysqli_real_escape_string($conexion, $params->metalmecanica);
    $asistenciatecnica = mysqli_real_escape_string($conexion, $params->asistenciatecnica);
    $id = mysqli_real_escape_string($conexion, $params->id);

    $editar = "UPDATE ordenes_de_servicio 
               SET electromecanica='$electromecanica', 
                   metalmecanica='$metalmecanica', 
                   asistenciatecnica='$asistenciatecnica' 
               WHERE id_ordenes_de_servicio='$id'";

    if (mysqli_query($conexion, $editar)) {
        $response->resultado = 'OK';
        $response->mensaje = 'Datos modificados';
    } else {
        $response->resultado = 'ERROR';
        $response->mensaje = 'No se pudo editar: ' . mysqli_error($conexion);
    }
} else {
    $response->resultado = 'ERROR';
    $response->mensaje = 'Datos incompletos';
}

echo json_encode($response);

mysqli_close($conexion);
?>
