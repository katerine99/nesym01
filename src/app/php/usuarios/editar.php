<?php
header('Access-Control-Allow-origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

$json = file_get_contents("php://input");

$params = json_decode($json);


require("../conexion.php");

//$editar = "UPDATE  usuarios SET nombre='katherine Melendez', clave='123456', usuario='katherine14@gmail.com',cargo='administradora' WHERE id_usuario=7";

$id= $_GET['id'];

$editar = "UPDATE  usuarios  SET nombre='$params->nombre',  usuario='$params->usuario',clave=SHA1('$params->clave'), cargo='$params->cargo' WHERE id_usuario='$id'";


mysqli_query($conexion, $editar) or die('no edito');

class Result {}

$response = new Result();
$response->resultado = "OK";
$response->mensaje = "datos modificados";


header("content-type: application/json");
echo json_encode($response);

