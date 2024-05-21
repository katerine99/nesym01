<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization");

// Recibe el JSON de la petición
$json = file_get_contents("php://input");

// Decodifica el JSON a un objeto PHP
$params = json_decode($json);

// Incluye el archivo de conexión a la base de datos
require("../conexion.php");

// Verifica que la conexión sea exitosa
if (!$conexion) {
    die("Conexión fallida: " . mysqli_connect_error());
}

// Prepara la consulta SQL usando sentencias preparadas
$stmt = $conexion->prepare("INSERT INTO repuestos (cantidad, total) VALUES (?, ?)");

// Vincula los parámetros
$stmt->bind_param("ii", $params->cantidad, $params->total);

// Ejecuta la consulta y verifica si fue exitosa
if ($stmt->execute()) {
    // Define la clase Result para la respuesta
    class Result {}
    
    // Crea una nueva instancia de Result y establece el resultado y el mensaje
    $response = new Result();
    $response->resultado = "OK";
    $response->mensaje = "Datos grabados";

    // Devuelve la respuesta en formato JSON
    header("Content-Type: application/json");
    echo json_encode($response);
} else {
    // Maneja el error si la consulta falla
    http_response_code(500);
    echo json_encode(array("resultado" => "Error", "mensaje" => "No se pudo insertar el repuesto", "error" => $stmt->error));
}

// Cierra la sentencia y la conexión
$stmt->close();
$conexion->close();
