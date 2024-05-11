<?php
header ('Access-Control-Allow-Origin: *');
header ("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require("../conexion.php");

$con = "SELECT c.*, d.nombre AS ndepto FROM ciudad c
INNER JOIN departamento d  ON c.fo_depto = d.id_depto
ORDER BY c.nombre";
$res=mysqli_query( $conexion,$con) or die ('no consulto ciudad');

$vec= [];
while ($reg=mysqli_fetch_array($res))
{
  $vec[]=$reg;

}
$cad= json_encode($vec);
echo $cad;
header ('content-type: application/json');
?>
