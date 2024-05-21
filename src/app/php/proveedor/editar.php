<?php
header("Access-Control-Allow-origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

$json = file_get_contents ("php://input");

$params = json_decode($json);

require ("../conexion.php");

 //$editar = "UPDATE  proveedor SET nombre='SIEMENS', direccion='carrera 24 #85-34', celular='6023457645', email='siemens@gmail.com' WHERE id_proveedor=6";
 $editar = "UPDATE  proveedor  SET nombre='$params->nombre',  direccion='$params->direccion', celular='$params->celular', email='$params->email' WHERE id_proveedor='$id'";


 mysqli_query($conexion, $editar) or die('no edito');

Class Result{}

$response = new Result ();
$response -> resultado = 'OK';
$response -> mensaje = 'datos modificados';


header ('content-type: application/json');
echo json_encode ($response);
?>
