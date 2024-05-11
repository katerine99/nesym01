<?php
header('Access-Control-Allow-origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");


require ("../conexion.php");

$del = "DELETE FROM ordenes_de_servicio WHERE id_ordenes_de_servicio =".$_GET["id"];

mysqli_query ($conexion,$del) or die ("no elimino");

Class Result{}
$response = new Result ();
$response -> resultado = "ok";
$response -> mensaje = "orden eliminada";


header("content-type: application/json");
echo json_encode($response);

?>
