<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Content-Type: application/json");

$json = file_get_contents("php://input");
$params = json_decode($json);

require("../conexion.php");

$cantidad = $params->cantidad;
$total = $params->total;
$fo_producto = $params->fo_producto;
$fo_usuarios = $params->fo_usuarios;
$fo_proveedor = $params->fo_proveedor;

$ins = "INSERT INTO compras (cantidad, total, fo_producto, fo_usuarios, fo_proveedor) VALUES ($cantidad, $total, $fo_producto, $fo_usuarios, $fo_proveedor)";

mysqli_query($conexion, $ins) or die("no inserto");

class Result {}
$response = new Result();
$response->resultado = "OK";
$response->mensaje = "Datos grabados";

echo json_encode($response);