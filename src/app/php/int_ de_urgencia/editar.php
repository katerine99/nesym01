<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Content-Type: application/json');

$json = file_get_contents("php://input");
$params = json_decode($json);

// Asegúrate de que se proporciona un ID
if (!isset($params->id)) {
    $response = new stdClass();
    $response->resultado = 'ERROR';
    $response->mensaje = 'ID no proporcionado';
    echo json_encode($response);
    exit();
}

require("../conexion.php");

// Usa consultas preparadas para evitar inyecciones SQL
$stmt = $conexion->prepare("UPDATE intervencion_de_urgencia SET area = ? WHERE id_intervencion_de_urgencia = ?");
$stmt->bind_param("si", $params->area, $params->id);

if ($stmt->execute()) {
    $response = new stdClass();
    $response->resultado = 'OK';
    $response->mensaje = 'Datos modificados';
} else {
    $response = new stdClass();
    $response->resultado = 'ERROR';
    $response->mensaje = 'No se pudo editar';
}

echo json_encode($response);
$stmt->close();
$conexion->close();
