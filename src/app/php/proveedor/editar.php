<?php
header("Access-Control-Allow-origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

$json = file_get_contents("php://input");
$params = json_decode($json);

require("../conexion.php");

$id = $_GET['id'];
$nombre = $params->nombre; 
$direccion = $params->direccion; 
$celular= $params->celular; 
$email = $params->email; 

$editar = "UPDATE proveedor SET nombre='$nombre', direccion='$direccion', celular='$celular', email='$email' WHERE id_proveedor='$id'";

mysqli_query($conexion, $editar) or die('no edito');

class Result {}
$response = new Result();
$response->resultado = 'OK';
$response->mensaje = 'datos modificados';

header('content-type: application/json');
echo json_encode($response);
