<?php
header("Access-Control-Allow-origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

$json = file_get_contents ("php://input");

$params = json_decode($json);

require ("../conexion.php");

 //$editar = "UPDATE  cliente SET nombre='FERROFRUAS S.A', celular='6017865423' WHERE id_cliente=27";
 $editar = "UPDATE  cliente  SET nombre='$params->nombre',  celular='$params->celular WHERE id_cliente='$id'";


 mysqli_query($conexion, $editar) or die('no edito');

Class Result{}

$response = new Result ();
$response -> resultado = 'OK';
$response -> mensaje = 'datos modificados';


header ('content-type: application/json');
echo json_encode ($response);
?>
