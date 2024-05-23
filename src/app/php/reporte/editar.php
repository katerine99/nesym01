<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

$json = file_get_contents("php://input");

$params = json_decode($json);

require("../conexion.php");

$editar = "UPDATE reporte SET preventivo='{$params->preventivo}', correctivo='{$params->correctivo}', emergente='{$params->emergente}' WHERE id_reporte={$params->id_reporte}";

mysqli_query($conexion, $editar) or die('no edito');

class Result{}

$response = new Result();
$response->resultado = 'OK';
$response->mensaje = 'datos modificados';

header('Content-Type: application/json');
echo json_encode($response);
?>