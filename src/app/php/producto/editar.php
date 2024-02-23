<?php
header("Access-Control-Allow-origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

$json = file_get_contents ("php://input");

$params = json_decode($json);

require ("../conexion.php");

 $editar = "UPDATE  producto SET nombre='PINZA AMPERIMETRICA' WHERE id_producto=5";


 mysqli_query($conexion, $editar) or die('no edito');

Class Result{}

$response = new Result ();
$response -> resultado = 'OK';
$response -> mensaje = 'datos modificados';


header ('content-type: application/json');
echo json_encode ($response);
?>
