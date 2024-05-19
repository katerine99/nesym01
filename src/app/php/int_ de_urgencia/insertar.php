<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Content-Type: application/json");

$json = file_get_contents("php://input");
$params = json_decode($json);

require("../conexion.php");

// Verificar que 'area' esté presente en los parámetros
if (!isset($params->area)) {
    $response = new stdClass();
    $response->resultado = 'ERROR';
    $response->mensaje = 'Área no proporcionada';
    echo json_encode($response);
    exit();
}

// Usar consultas preparadas para evitar inyecciones SQL
$stmt = $conexion->prepare("INSERT INTO intervencion_de_urgencia (area) VALUES (?)");
$stmt->bind_param("s", $params->area);

if ($stmt->execute()) {
    $response = new stdClass();
    $response->resultado = 'OK';
    $response->mensaje = 'Datos grabados';
} else {
    $response = new stdClass();
    $response->resultado = 'ERROR';
    $response->mensaje = 'No se pudo insertar';
}

echo json_encode($response);
$stmt->close();
$conexion->close();
?>

