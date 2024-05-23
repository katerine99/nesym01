<?php
header("Access-Control-Allow-origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

$json = file_get_contents("php://input");
$params = json_decode($json);

require("../conexion.php");

$id = $_GET['id'];
$nombre = $params->nombre; 
$editar = "UPDATE departamento SET nombre='$nombre' WHERE id_depto='$id'";

mysqli_query($conexion, $editar) or die('no edito');

class Result {}
$response = new Result();
$response->resultado = 'OK';
$response->mensaje = 'datos modificados';

header('content-type: application/json');
echo json_encode($response);

