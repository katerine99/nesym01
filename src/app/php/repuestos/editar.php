<?php
header("Access-Control-Allow-origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

$json = file_get_contents ("php://input");

$params = json_decode($json);

require ("../conexion.php");

 //$editar = "UPDATE  repuestos SET cantidad='30', total='300'WHERE id_repuestos=10";
 $editar = "UPDATE  repuestos SET cantidad='$params->cantidad',  total='$params->total' WHERE id_repuestos='$id'";

 mysqli_query($conexion, $editar) or die('no edito');

Class Result{}

$response = new Result ();
$response -> resultado = 'OK';
$response -> mensaje = 'datos modificados';


header ('content-type: application/json');
echo json_encode ($response);
?>
