
<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Content-Type: application/json");

$json = file_get_contents("php://input");
$params = json_decode($json);

require("../conexion.php");

// Verificar que los datos recibidos sean válidos
if (!isset($_GET['id']) || !isset($params->nombre) || !isset($params->celular)) {
    $response = (object) [
        'resultado' => 'Error',
        'mensaje' => 'Datos incompletos'
    ];
    echo json_encode($response);
    exit;
}

$id = $_GET['id'];
$nombre = $params->nombre;
$celular = $params->celular;

$editar = "UPDATE cliente SET nombre='$nombre', celular='$celular' WHERE id_cliente='$id'";

if (mysqli_query($conexion, $editar)) {
    $response = (object) [
        'resultado' => 'OK',
        'mensaje' => 'Datos modificados'
    ];
} else {
    $response = (object) [
        'resultado' => 'Error',
        'mensaje' => 'No se pudieron modificar los datos: ' . mysqli_error($conexion)
    ];
}

echo json_encode($response);
?>