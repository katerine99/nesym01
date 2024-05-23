<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require ("../conexion.php");

$id = $_GET["id"]; // Corregido aquí

$del = "DELETE FROM producto WHERE id_producto=".$id; 

mysqli_query($conexion, $del) or die("no elimino");

class Result {}
$response = new Result();
$response->resultado = "ok";
$response->mensaje = "producto borrado";

header("Content-Type: application/json");
echo json_encode($response);

