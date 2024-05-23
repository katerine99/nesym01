<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Content-Type: application/json');

// Obtener y decodificar el contenido JSON
$json = file_get_contents("php://input");
$params = json_decode($json);

// Verificar si se pudo obtener y decodificar el contenido JSON
if ($json === false || $params === null) {
    $response = array("resultado" => "ERROR", "mensaje" => "Error al recibir los datos JSON");
    echo json_encode($response);
    exit;
}

require("../conexion.php");

// Verificar si la conexión a la base de datos fue exitosa
if ($conexion->connect_error) {
    $response = array("resultado" => "ERROR", "mensaje" => "Error de conexión a la base de datos");
    echo json_encode($response);
    exit;
}

// Asegurarse de que el parámetro id está presente
if (!isset($params->id)) {
    $response = array("resultado" => "ERROR", "mensaje" => "El ID es requerido");
    echo json_encode($response);
    exit;
}

$id = $params->id;
$cantidad = isset($params->cantidad) ? $params->cantidad : 0;
$total = isset($params->total) ? $params->total : 0;

$editar = "UPDATE repuestos SET cantidad='$cantidad', total='$total' WHERE id_repuestos='$id'";
$resultado = mysqli_query($conexion, $editar);

// Verificar si la consulta fue exitosa
if ($resultado) {
    $response = array("resultado" => "OK", "mensaje" => "datos modificados");
} else {
    $response = array("resultado" => "ERROR", "mensaje" => "no se pudieron modificar los datos");
}

echo json_encode($response);
?>