<?php
header("Access-Control-Allow-origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

$json = file_get_contents("php://input");

$params = json_decode($json);
$id = $_GET['id'];

  require("../conexion.php");

$editar = "UPDATE  usuario  SET nombre='$params->nombre', clave='$params->clave', correo='$params->correo', cargo='$params->cargo' WHERE id_usuario=$id";


mysqli_query($conexion, $editar) or die('no edito');

class Result
{
}

$response = new Result();
$response->resultado = 'OK';
$response->mensaje = 'datos modificados';


header('content-type: application/json');
echo json_encode($response);
?>;
