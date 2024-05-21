<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require("../conexion.php");

$id = isset($_GET["id"]) ? $_GET["id"] : null;

if ($id !== null) {
    $del = "DELETE FROM ordenes_de_servicio WHERE id_ordenes_de_servicio = $id";

    if (mysqli_query($conexion, $del)) {
        $response = array(
            'resultado' => 'ok',
            'mensaje' => 'orden_eliminada'
        );
    } else {
        $response = array(
            'resultado' => 'error',
            'mensaje' => 'no_elimino'
        );
    }
} else {
    $response = array(
        'resultado' => 'error',
        'mensaje' => 'id_no_proveido'
    );
}

header("Content-Type: application/json");
echo json_encode($response);
?>
