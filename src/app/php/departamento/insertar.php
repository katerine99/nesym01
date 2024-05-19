
Copiar código
<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Content-Type: application/json");

$json = file_get_contents("php://input");
$params = json_decode($json);

require("../conexion.php");

if (isset($params->nombre)) {
    $nombre = $params->nombre;

    $ins = "INSERT INTO departamento (nombre) VALUES ('$nombre')";

    if (mysqli_query($conexion, $ins)) {
        $response = new stdClass();
        $response->resultado = 'OK';
        $response->mensaje = 'Datos grabados';
    } else {
        $response = new stdClass();
        $response->resultado = 'ERROR';
        $response->mensaje = 'No se pudo insertar el departamento';
    }

    echo json_encode($response);
} else {
    $response = new stdClass();
    $response->resultado = 'ERROR';
    $response->mensaje = 'Datos incompletos';
    echo json_encode($response);
}

mysqli_close($conexion);
