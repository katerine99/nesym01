<?php
header("Access-Control-Allow-origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");


require ("../conexion.php");

 $del =  'DELETE FROM usuario WHERE id_usuario=' .$_GET ["id"];

Class Result{}


mysqli_query ($conexion,$del) or die ("no elimino");


$response = new Result ();
$response -> resultado = "ok";
$response -> mensaje = "usuario borrado";


header("content-type: application/json");
echo json_encode($response);
?>