<?php
header ('Access-Control-Allow-Origin: *');
header ("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require("../conexion.php");

$con = "SELECT * from intervencion_de_urgencia ORDER BY  area";
$res=mysqli_query( $conexion,$con) or die ('no consulto intervencion');

$vec= [];
while ($reg=mysqli_fetch_array($res))
{
  $vec[]=$reg;

}
$cad= json_encode($vec);
echo $cad;
header ('content-type: application/json');

