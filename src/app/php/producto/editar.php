<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

$json = file_get_contents("php://input");

$params = json_decode($json);

require("../conexion.php");

$id = $params->id_producto;
$nombre = $params->nombre;
$marca = $params->fo_marca;

$editar = "UPDATE producto SET nombre='$nombre',marca='$fo_marca' WHERE id_producto='$id'";

mysqli_query($conexion, $editar) or die('no edito');

class Result {}

$response = new Result();
$response->resultado = 'OK';
$response->mensaje = 'datos modificados';

header('Content-Type: application/json');
echo json_encode($response);
?>
