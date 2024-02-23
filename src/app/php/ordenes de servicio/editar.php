<?php
header("Access-Control-Allow-origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

$json = file_get_contents ("php://input");

$params = json_decode($json);

require ("../conexion.php");

 $editar = "UPDATE  ordenes_de_servicio SET ELECTROMECANICA='arranque de pozos de produccion de PETROLEO', METALMECANICA='automatizacion de procesos', ASISTENCIA_TECNICA ='asistencia especializada en RADIADORES' WHERE id_ordenes_de_servicio=3";


 mysqli_query($conexion, $editar) or die('no edito');

Class Result{}

$response = new Result ();
$response -> resultado = 'OK';
$response -> mensaje = 'datos modificados';


header ('content-type: application/json');
echo json_encode ($response);
?>
