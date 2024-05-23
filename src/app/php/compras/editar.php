<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

$json = file_get_contents("php://input");
$params = json_decode($json);

if (isset($_GET['id']) && !empty($_GET['id'])) {
    require("../conexion.php");
    
    $id = mysqli_real_escape_string($conexion, $_GET['id']);

    $editar = $conexion->prepare("UPDATE compras SET cantidad=?, total=?, fo_producto=?, fo_usuarios=?, fo_proveedor=? WHERE id_compras=?");
    $editar->bind_param("ddiiii", $params->cantidad, $params->total, $params->fo_producto, $params->fo_usuarios, $params->fo_proveedor, $id);
    $editar->execute();

    if ($editar->affected_rows > 0) {
        class Result {}
        $response = new Result();
        $response->resultado = "OK";
        $response->mensaje = "datos modificados";
        header("Content-Type: application/json");
        echo json_encode($response);
    } else {
        header("HTTP/1.1 500 Internal Server Error");
        echo json_encode(array("message" => "Error al actualizar los datos."));
    }
} else {
    header("HTTP/1.1 400 Bad Request");
    echo json_encode(array("message" => "El parámetro 'id' es requerido y no puede estar vacío."));
}
?>