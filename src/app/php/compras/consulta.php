<?php
header ('Access-Control-Allow-Origin: *');
header ("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require("../conexion.php");
$con= "SELECT c.*, p.nombre AS nproducto, u.nombre AS nusuarios, pr.nombre AS nproveedor 
FROM compras AS c
INNER JOIN producto AS p ON c.fo_producto = p.id_producto
INNER JOIN usuarios AS u ON c.fo_usuarios= u.id_usuario
INNER JOIN proveedor AS pr ON c.fo_proveedor= pr.id_proveedor";

$res=mysqli_query( $conexion,$con) or die ('no consulto compras');

$vec= [];
while ($reg=mysqli_fetch_array($res))
{
  $vec[]=$reg;

}
$cad= json_encode($vec);
echo $cad;
header ('content-type: application/json');

