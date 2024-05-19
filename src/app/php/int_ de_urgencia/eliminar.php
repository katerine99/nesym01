<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Content-Type: application/json");

require("../conexion.php");

// Verificar que el ID está presente en la solicitud
if (!isset($_GET['id'])) {
    $response = new stdClass();
    $response->resultado = 'ERROR';
    $response->mensaje = 'ID no proporcionado';
    echo json_encode($response);
    exit();
}

$id = intval($_GET['id']); // Asegurarse de que el ID sea un entero

// Usar consultas preparadas para evitar inyecciones SQL
$stmt = $conexion->prepare("DELETE FROM intervencion_de_urgencia WHERE id_intervencion_de_urgencia = ?");
$stmt->bind_param("i", $id);

if ($stmt->execute()) {
    $response = new stdClass();
    $response->resultado = 'OK';
    $response->mensaje = 'intervencion borrada';
} else {
    $response = new stdClass();
    $response->resultado = 'ERROR';
    $response->mensaje = 'No se pudo eliminar';
}

echo json_encode($response);
$stmt->close();
$conexion->close();